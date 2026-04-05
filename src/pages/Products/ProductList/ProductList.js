import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header"; // add pannunga
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("userId");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/all");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const addToCart = async (productId) => {
    if (!userId) return alert("Login first");
    try {
      await API.post("/cart/add", { userId, productId, quantity: 1 });
      alert("Added to Cart ✅");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Add to cart failed ❌");
    }
  };

  return (
    <>
      <Header /> {/* 🔹 Include header */}
      <div className="productlist-container">
        <h2 className="title">All Products</h2>
        <div className="product-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img
                src={p.imageUrl ? `http://localhost:8080${p.imageUrl}` : "https://via.placeholder.com/150"}
                alt={p.name}
                onError={e => e.target.src = "https://via.placeholder.com/150"}
              />
              <h3>{p.name}</h3>
              <p className="price">₹ {p.price}</p>
              <p className="desc">{p.description}</p>
              <button className="cart-btn" onClick={() => addToCart(p.id)}>Buy now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;