import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">

      <h2>Admin Dashboard</h2>

      <div className="admin-cards">

        <div
          className="card"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          Manage Products
        </div>

        <div
          className="card"
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          Manage Orders
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;