import { Link } from "react-router-dom";
import "../pages/CheckoutSuccess.css";

export default function CheckoutSuccess() {
  return (
    <div className="checkout-success">
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/products" className="continue-shopping-btn">
        Continue Shopping
      </Link>
    </div>
  );
}
