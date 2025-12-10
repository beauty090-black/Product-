import { Link } from "react-router-dom";
import "../component/Navbar.css";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setDropdownOpen(false);
    alert("User logged out!");
  };

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
            <Link to="/users">Users</Link>
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

          {currentUser ? (
            <li className="nav-user" ref={dropdownRef}>
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {currentUser?.name?.firstname} {currentUser?.name?.lastname} ▼
              </button>
              {dropdownOpen && (
                <ul className="user-dropdown">
                  <li>
                    <Link to="/user-profile" onClick={() => setDropdownOpen(false)}>
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

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
