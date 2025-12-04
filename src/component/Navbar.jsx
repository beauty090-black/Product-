import { Link } from "react-router-dom";
import "../component/Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="nav-logo">FakeStore</h1>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="nav-search"
            />
          </li>
          <li>
            <button className="dark-btn" onClick={() => setDark(!dark)}>
              {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </li>
          <li>
            <Link to="/cart" className="cart-btn">
              🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
