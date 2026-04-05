import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../api/axios";
import "./AddressSelect.css";

const AddressSelect = () => {
  const [addresses, setAddresses] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAddresses();
  }, [location]); // refresh addresses when navigated back

  const fetchAddresses = async () => {
    try {
      const res = await API.get(`/address/my/${userId}`);
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const goAddAddress = () => {
    navigate("/add-address");
  };

  const placeOrder = async (addressId) => {
    try {
      const res = await API.post(`/orders/place/${userId}/${addressId}`);
      const orderId = res.data.orderId;
      if (!orderId) {
        alert("Order failed: orderId missing ❌");
        return;
      }
      alert("Order Placed Successfully ✅");
      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Order Failed ❌");
    }
  };

  return (
    <div className="select-container">
      <h2>Select Delivery Address</h2>

      
      {addresses.length === 0 ? (
        <p>No addresses found. Please add one.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} className="select-card">
            <p><b>{addr.fullName}</b></p>
            <p>{addr.street}</p>
            <p>{addr.city} - {addr.pincode}</p>
            <p>{addr.state}, {addr.country}</p>
            <p>📞 {addr.mobile}</p>
            <button onClick={() => placeOrder(addr.id)}>Confirm Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressSelect;