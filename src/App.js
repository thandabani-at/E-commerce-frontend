import React from "react";
import { BrowserRouter, Routes, Route }
  from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductList
  from "./pages/Products/ProductList/ProductList";

import Cart from "./pages/Cart/CartPage";

import Address from "./pages/Address/Address";
import AddAddress from "./pages/Address/AddAddress";
import AddressSelect
  from "./pages/Address/AddressSelect";

import MyOrders
  from "./pages/Orders/MyOrders/MyOrders";
import OrderItems
  from "./pages/Orders/OrderItems/OrderItems";

import PaymentPage
  from "./pages/Payment/PaymentPage";

import AdminDashboard
  from "./pages/Admin/Dashboard/AdminDashboard";
import AdminProducts
  from "./pages/Admin/Products/AdminProducts";
import AdminOrders
  from "./pages/Admin/Orders/AdminOrders";
  

// 🔒 Protected Route Import
import ProtectedRoute
  from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 CUSTOMER */}
        <Route
          path="/products"
          element={
            <ProtectedRoute role="CUSTOMER">
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Address />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-address"
          element={
            <ProtectedRoute role="CUSTOMER">
              <AddAddress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-address"
          element={
            <ProtectedRoute role="CUSTOMER">
              <AddressSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute role="CUSTOMER">
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-items/:orderId"
          element={
            <ProtectedRoute role="CUSTOMER">
              <OrderItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:orderId"
          element={
            <ProtectedRoute role="CUSTOMER">
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        {/* 🔒 ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;