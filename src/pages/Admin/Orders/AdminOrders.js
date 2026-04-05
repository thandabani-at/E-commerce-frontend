import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import "./AdminOrders.css";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res =
      await API.get("/orders/all");
    setOrders(res.data);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await API.put(
      `/orders/status/${id}?status=${status}`
    );

    fetchOrders();
  };

  return (
    <div className="admin-orders">

      <h2>All Orders</h2>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((o) => (

            <tr key={o.id}>

              <td>{o.id}</td>
              <td>{o.userId}</td>
              <td>₹ {o.totalAmount}</td>
              <td>{o.status}</td>

              <td>

                <button
                  onClick={() =>
                    updateStatus(
                      o.id,
                      "SHIPPED"
                    )
                  }
                >
                  Ship
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      o.id,
                      "DELIVERED"
                    )
                  }
                >
                  Deliver
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AdminOrders;