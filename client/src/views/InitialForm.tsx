import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import birdImage from "../assets/img/birds.jpg";
import { login, registerNewUser, loginWithGoogle } from "../api";
import googleLogo from "../assets/img/Google_G_Logo.svg";
import { FaTimesCircle as ErrorIcon } from "react-icons/fa";
import { AxiosError } from "axios";

const StartingForm: React.FC<{
  onLoggedIn: () => void;
  onUseAsGuest: () => void;
}> = ({ onLoggedIn, onUseAsGuest }) => {
  useEffect(() => {
    document.title = "Log In";
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    if (isLogin) {
      login({
        email: formData.email,
        password: formData.password,
      })
        .then(onLoggedIn)
        .catch((i: AxiosError) => {
          const errorCode = i.response?.status;
          setIsLoggingIn(false);

          if (errorCode === 401) {
            setFormData({ ...formData, password: "" });
            setError("Incorrect username or password.");
          } else {
            setError("An unexpected error ocurred.");
          }
        });
    } else {
      registerNewUser({
        email: formData.email,
        password: formData.password,
      })
        .then(() => {
          login({
            email: formData.email,
            password: formData.password,
          }).then(onLoggedIn);
        })
        .catch((i: AxiosError) => {
          setIsLoggingIn(false);
          const errorCode = i.response?.status;
          if (errorCode === 409) {
            setFormData({ ...formData, password: "" });
            setError("An account with that email already exists.");
          } else {
            setError("An unexpected error ocurred.");
          }
        });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-full flex flex-row bg-gray-800 overflow-auto">
      <form
        className="bg-white flex w-full xl:w-4/6 justify-center flex-col p-10 md:p-16 xl:p-32"
        onSubmit={handleLogin}
        style={{ boxShadow: "0 0 15px rgba(0,0,0,.05)", zIndex: 1 }}
      >
        <h1 className="text-3xl mb-3">Welcome</h1>
        {error ? (
          <div className="rounded flex flex-row items-center bg-red-200 text-red-800 p-5 mb-3">
            <ErrorIcon className="w-5 h-auto" />
            <p className="ml-3">{error}</p>
          </div>
        ) : (
          ""
        )}
        <label
          htmlFor="email"
          className="text-md tracking-wide select-none w-full text-gray-700 font-semibold uppercase"
        >
          Email
        </label>
        <input
          required
          className="w-full text-xl p-2 bg-gray-200 rounded outline-none focus:shadow-outline mb-4"
          onChange={handleInput}
          value={formData.email}
          type="email"
          name="email"
          id="email"
        />
        <label
          htmlFor="password"
          className="text-md tracking-wide w-full select-none  text-gray-700 font-semibold uppercase"
        >
          Password
        </label>
        <input
          required
          onChange={handleInput}
          className="w-full text-xl p-2 bg-gray-200 rounded outline-none focus:shadow-outline mb-4"
          value={formData.password}
          type="password"
          name="password"
          id="password"
        />
        <input
          type="submit"
          name="logIn"
          disabled={isLoggingIn}
          className={`${
            isLoggingIn
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-800"
          } w-full py-2 my-3 text-xl rounded-md text-white cursor-pointer`}
          value="Log In"
        />
        <input
          type="submit"
          name="register"
          disabled={isLoggingIn}
          onClick={() => setIsLogin(false)}
          className={`${
            isLoggingIn
              ? " bg-gray-600 cursor-not-allowed"
              : "bg-gray-900 hover:bg-gray-700"
          } w-full py-2 my-3 text-xl rounded-md text-white cursor-pointer`}
          value="Create an account"
        />
        <p className="text-line-through my-2 text-gray-600">or</p>
        <input
          onClick={() => onUseAsGuest()}
          type="button"
          name="guest"
          disabled={isLoggingIn}
          className={`${
            isLoggingIn
              ? " text-gray-600 cursor-not-allowed"
              : "text-gray-900 w-full "
          }  bg-white border-2 border-gray-500 text-xl rounded-md py-2 my-3 text-md cursor-pointer`}
          value="Use as guest"
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          buttonText="Login"
          onSuccess={(response: any) =>
            loginWithGoogle(response.tokenId)
              .then(onLoggedIn)
              .catch(() => {
                setIsLoggingIn(false);
                setError("An unexpected error ocurred.");
              })
          }
          render={(renderProps) => (
            <button
              type="button"
              onClick={() => {
                setIsLoggingIn(true);
                renderProps.onClick();
              }}
              disabled={isLoggingIn || renderProps.disabled}
              className={`${
                isLoggingIn
                  ? " text-gray-600 cursor-not-allowed"
                  : "text-gray-900 "
              } flex flex-row font-sans justify-center items-center h-12 my-3 text-xl py-2 border-2 border-gray-500 bg-white rounded-md`}
            >
              <img src={googleLogo} className="h-full mr-2" alt="Google logo" />
              <p>Sign in with Google</p>
            </button>
          )}
          onFailure={() => {
            setIsLoggingIn(false);
            setError("An unexpected error ocurred.");
          }}
          cookiePolicy={"single_host_origin"}
        />
      </form>
      <div
        style={{ background: "#fffff4" }}
        className="relative w-full h-full hidden md:block"
      >
        <img
          src={birdImage}
          style={{ filter: "saturate(125%)" }}
          alt="birds"
          className="object-cover h-full w-full object-center"
        />
        <span className="absolute bottom-0 right-0 m-2">
          Photo by{" "}
          <a
            className="text-blue-600 hover:text-blue-800 underline inline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://unsplash.com/@bostonpubliclibrary?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >
            Boston Public Library
          </a>{" "}
          on{" "}
          <a
            className="text-blue-600 hover:text-blue-800 underline inline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://unsplash.com/s/photos/illustration?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </span>
      </div>
    </div>
  );
};

export default StartingForm;
