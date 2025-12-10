import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (id, qty) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/checkout-success");
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="cart-empty">
        <h1>Your Cart is Empty</h1>
        <Link to="/products" className="cart-continue-btn">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={item.id || index}>
            <img src={item?.image} alt={item?.title} />
            <div className="cart-details">
              <h2>{item?.title}</h2>
              <p className="cart-price">${item?.price}</p>

              <div className="cart-quantity">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item?.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                />
              </div>

              {/* Seller Info */}
              {item.seller && (
                <div className="cart-seller">
                  <h3>Seller Info</h3>
                  <p>
                    <strong>Name:</strong> {item.seller?.name?.firstname}{" "}
                    {item.seller?.name?.lastname}
                  </p>
                  <p>
                    <strong>Username:</strong> {item.seller?.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.seller?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {item.seller?.phone}
                  </p>
                  {item.seller?.address && (
                    <p>
                      <strong>Address:</strong> {item.seller.address?.number}{" "}
                      {item.seller.address?.street}, {item.seller.address?.city},{" "}
                      {item.seller.address?.zipcode}
                    </p>
                  )}
                </div>
              )}

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
