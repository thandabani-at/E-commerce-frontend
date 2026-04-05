import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./AddAddress.css";

const AddAddress = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/address/add", { ...form, userId });
      alert("Address Added Successfully ✅");
      navigate("/select-address"); // back to address select
    } catch (err) {
      console.error(err);
      alert("Failed to add address ❌");
    }
  };

  return (
    <div className="add-address-container">
      <h2>Add New Address</h2>
      <form className="add-address-form" onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="street" placeholder="Street" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="country" placeholder="Country" onChange={handleChange} value={form.country} required />
        <button type="submit">Save Address</button>
        <button type="button" onClick={() => navigate("/select-address")}>Cancel</button>
      </form>
    </div>
  );
};

export default AddAddress;