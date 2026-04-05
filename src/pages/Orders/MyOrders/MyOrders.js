import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import "./MyOrders.css";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId")// 🔥 login connect later

  useEffect(() => {
    fetchOrders();
  }, []);

  // 📦 Get My Orders
  const fetchOrders = async () => {
    try {
      const res =
        await API.get(`/orders/my/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("No orders found");
    }
  };

  // 👁 View Items
  const viewItems = (orderId) => {
    navigate(`/order-items/${orderId}`);
  };

  return (
    <div className="orders-container">

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>₹ {order.totalAmount}</td>

                <td>
                  <span
                    className={`status ${order.status}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {order.orderDate?.slice(0, 10)}
                </td>

                <td>
                  <button
                    onClick={() =>
                      viewItems(order.id)
                    }
                    className="view-btn"
                  >
                    View Items
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default MyOrders;