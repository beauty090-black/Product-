import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/SingleProduct.css";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null); // fallback UI
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="single-product-loading">
        <p>Loading product...</p>
      </div>
    );

  // Fallback UI with placeholder image
  if (!product)
    return (
      <div className="single-product-fallback">
        <img
          src="https://via.placeholder.com/300x300?text=Product+Not+Available"
          alt="Product not available"
        />
        <h2>Oops! Product not available.</h2>
        <button onClick={() => navigate("/products")} className="back-btn">
          Back to Products
        </button>
      </div>
    );

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    navigate("/cart");
  };

  return (
    <div className="single-product">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <h1>{product.title}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>

        <div className="product-quantity">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
