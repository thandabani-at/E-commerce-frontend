import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const initPayment = async () => {
      try {
        // 1️⃣ Fetch order details
        const resOrder = await API.get(`/orders/${orderId}`);
        const order = resOrder.data;
        setOrderData(order);

        if (!order || !order.totalAmount) {
          alert("Order details missing ❌");
          return;
        }

        // 2️⃣ Create Razorpay order
        const resPayment = await API.post(`/payment/create/${orderId}`);
        const paymentData = resPayment.data;

        if (!paymentData?.id || !paymentData?.amount) {
          alert("Payment data missing ❌");
          return;
        }

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: paymentData.amount, // in paise
          currency: paymentData.currency || "INR",
          name: "E-Commerce Shop",
          description: `Payment for Order #${orderId}`,
          order_id: paymentData.id,
          handler: async function (response) {
            try {
              await API.put(
                `/payment/success/${orderId}?paymentId=${response.razorpay_payment_id}`
              );
              alert("Payment Successful ✅");
              window.location.href = "/my-orders";
            } catch (err) {
              console.error(err);
              alert("Payment verification failed ❌");
            }
          },
          prefill: {
            name: order.userName || "",
            email: order.userEmail || "",
            contact: order.userMobile || "",
          },
          theme: { color: "#007bff" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (err) {
        console.error(err);
        alert("Failed to initiate payment ❌");
      }
    };

    initPayment();
  }, [orderId]);

  return (
    <div className="payment-container">
      {orderData ? (
        <>
          <h2>Order <span className="highlight">#{orderData.id}</span></h2>
          <p>Total Amount: <span className="highlight">₹ {orderData.totalAmount}</span></p>
          <p>Deliver To: <span className="highlight">{orderData.address?.fullName}, {orderData.address?.city}</span></p>
          <p className="processing">Processing Payment... Please do not refresh the page</p>
        </>
      ) : (
        <h2 className="processing">Loading Order Details...</h2>
      )}
    </div>
  );
};

export default PaymentPage;