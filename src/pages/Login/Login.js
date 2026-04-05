import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import "./Login.css";

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res =
        await API.post("/auth/login", data);

      // 🔐 Save Session
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "userId",
        res.data.userId
      );

      localStorage.setItem(
        "email",
        res.data.email
      );

      alert("Login Success");

      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/products";
      }

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">

      <form
        onSubmit={handleSubmit}
        className="login-form"
      >

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        {/* 🔗 REGISTER LINK */}
        <p className="register-link">
          Don't have an account?
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;