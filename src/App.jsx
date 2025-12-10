import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  // Handle login from Login.jsx
  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      {currentUser && <Navbar currentUser={currentUser} onLogout={handleLogout} />}
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <SingleProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={currentUser ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout-success"
          element={currentUser ? <CheckoutSuccess /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={currentUser ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-profile"
          element={currentUser ? <UserProfile /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
