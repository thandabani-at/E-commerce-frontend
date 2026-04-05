import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="logo">
        <h2>E-Commerce</h2>
      </div>

      <nav className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/address">Address</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <div className="user-section">
        <span>Hello, {userName}</span>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;