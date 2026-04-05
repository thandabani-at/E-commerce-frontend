import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import "./Register.css";

const Register = () => {

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        data
      );

      alert("Registered Successfully");

      window.location.href = "/";

    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">

      <form
        onSubmit={handleSubmit}
        className="register-form"
      >

        <h2>Register</h2>

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

        <input
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
          Register
        </button>

        {/* 🔗 LOGIN LINK */}
        <p className="login-link">
          Already have an account?
          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;