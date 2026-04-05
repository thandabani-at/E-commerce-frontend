import React, { useEffect, useState } from "react";
import API from "../../../api/axios";
import "./AdminProducts.css";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  // 🔄 LOAD PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/all");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📝 INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🖼 IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ ADD / UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      const productData = {
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock
      };

      formData.append(
        "product",
        JSON.stringify(productData)
      );

      formData.append("image", image);

      if (editId) {

        // ✏️ UPDATE
        await API.put(
          `/products/update/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        alert("Product Updated ✏️");

      } else {

        // ➕ ADD
        await API.post(
          "/products/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        alert("Product Added ✅");
      }

      resetForm();
      fetchProducts();

    } catch (err) {
      console.error(err);
      alert("Operation Failed ❌");
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    try {

      await API.delete(`/products/delete/${id}`);

      alert("Product Deleted 🗑️");

      fetchProducts();

    } catch (err) {
      console.error(err);
      alert("Delete Failed ❌");
    }
  };

  // ✏️ EDIT LOAD
  const handleEdit = (p) => {

    setEditId(p.id);

    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock
    });

    setPreview(
      `http://localhost:8080${p.imageUrl}`
    );
  };

  // 🔄 RESET
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: ""
    });

    setImage(null);
    setPreview(null);
    setEditId(null);
  };

  return (
    <div className="admin-products-container">

      <h2>
        {editId ? "Update Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="product-form"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-img"
          />
        )}

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <h2>All Products</h2>

      <div className="product-grid">

        {products.map((p) => (

          <div
            key={p.id}
            className="product-card"
          >

            <img
              src={
                p.imageUrl
                  ? `http://localhost:8080${p.imageUrl}`
                  : "https://via.placeholder.com/150"
              }
              alt={p.name}
            />

            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>

            <div className="card-buttons">

              <button
                className="edit-btn"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(p.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminProducts;