import React, { useEffect, useState } from "react";
import API from "./../../api/axios";
import { useNavigate } from "react-router-dom";
import "./AddressSelect.css";

const AddressSelect = () => {
  const [addresses, setAddresses] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get(`/address/my/${userId}`);
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async (addressId) => {
    try {
      const res = await API.post(`/orders/place/${userId}/${addressId}`);
      const orderId = res.data.orderId || 1;
      alert("Order Placed Successfully");
      navigate("/payment", { state: { orderId } });
    } catch (err) {
      alert("Order Failed");
    }
  };

  return (
    <div className="select-container">
      <h2>Select Delivery Address</h2>

      <a href="/add-address" className="add-address-btn">
        + Add New Address
      </a>

      {addresses.length === 0 ? (
        <p className="no-address">No addresses found. Please add one.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} className="select-card">
            <p><b>{addr.fullName}</b></p>
            <p>{addr.street}</p>
            <p>{addr.city} - {addr.pincode}</p>
            <p>{addr.state}</p>
            <p>📞 {addr.mobile}</p>
            <button onClick={() => placeOrder(addr.id)}>Deliver Here 🚚</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressSelect;