import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api/axios";
import "./OrderItems.css";

const OrderItems = () => {

  const { orderId } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  // 📦 Fetch Order Items
  const fetchItems = async () => {
    try {
      const res =
        await API.get(`/orders/items/${orderId}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("No items found");
    }
  };

  return (
    <div className="items-container">

      <h2>Order Items — #{orderId}</h2>

      {items.length === 0 ? (
        <p>No Items Found</p>
      ) : (

        <table className="items-table">

          <thead>
            <tr>
              <th>Product ID</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id}>

                <td>{item.productId}</td>

                <td>₹ {item.price}</td>

                <td>{item.quantity}</td>

                <td>
                  ₹ {item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default OrderItems;