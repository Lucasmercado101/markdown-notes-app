import React, { useState } from "react";
import axios from "axios";
import { login } from "../api";

const Login = () => {
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email: formData.loginEmail,
      password: formData.loginPassword,
    })
      .then(() => console.log("Logged in"))
      .catch((i) => console.log("failed login"));
  };
  //username & password: asd
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <form
        className="bg-gray-100 flex flex-col p-10"
        onSubmit={handleRegister}
      >
        <h1 className="text-center text-3xl">Login</h1>
        <label htmlFor="loginEmail">Email</label>
        <input
          required
          onChange={handleInput}
          value={formData.loginEmail}
          type="text"
          name="loginEmail"
          id="loginEmail"
        />
        <label htmlFor="loginPassword">Password</label>
        <input
          required
          onChange={handleInput}
          value={formData.loginPassword}
          type="password"
          name="loginPassword"
          id="loginPassword"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
