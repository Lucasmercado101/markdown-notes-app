import React, { useState } from "react";
import { registerNewUser } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    registerEmail: "",
    registerPassword: "",
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerNewUser({
      email: formData.registerEmail,
      password: formData.registerPassword,
    }).then(() => console.log("Registered user"));
  };

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
        <h1 className="text-center text-3xl">Register</h1>
        <label htmlFor="registerEmail">Email</label>
        <input
          onChange={handleInput}
          value={formData.registerEmail}
          type="text"
          name="registerEmail"
          id="registerEmail"
        />
        <label htmlFor="registerPassword">Password</label>
        <input
          onChange={handleInput}
          value={formData.registerPassword}
          type="password"
          name="registerPassword"
          id="registerPassword"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
