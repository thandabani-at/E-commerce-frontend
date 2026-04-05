import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./CartPage.css";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // 🧾 Fetch Cart
  const fetchCart = async () => {

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {

      const res = await API.get(
        `/cart/${userId}`
      );

      setCartItems(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔄 Update Quantity
  const updateQty = async (cartId, qty) => {

    if (qty < 1) return;

    try {

      await API.put(
        `/cart/update/${cartId}?quantity=${qty}`
      );

      fetchCart();

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  // ❌ Remove Item
  const removeItem = async (cartId) => {

    try {

      await API.delete(
        `/cart/remove/${cartId}`
      );

      fetchCart();

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // 💰 Grand Total
  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // 🛒 Checkout
  const checkout = () => {
    navigate("/select-address");
  };

  return (
    <div className="cart-container">

      <h2>My Cart</h2>

      {cartItems.length === 0 ? (

        <p>Cart is empty</p>

      ) : (

        <>
          <table className="cart-table">

            <thead>
              <tr>
                <th>Product ID</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {cartItems.map((item) => (

                <tr key={item.id}>

                  <td>{item.productId}</td>

                  <td>₹ {item.price}</td>

                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQty(
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    ₹ {item.price * item.quantity}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* Footer */}
          <div className="cart-footer">

            <h3>
              Grand Total : ₹ {total}
            </h3>

            <button
              className="checkout-btn"
              onClick={checkout}
            >
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default CartPage;