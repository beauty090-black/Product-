import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { getUsers } from "../api/users";
import "../pages/SingleProduct.css";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        // Fetch product
        const productRes = await axiosInstance.get(`/products/${id}`);
        setProduct(productRes.data || null);

        // Fetch users
        const usersData = await getUsers();
        if (usersData && usersData.length > 0) {
          const randomUser =
            usersData[Math.floor(Math.random() * usersData.length)];
          setSeller(randomUser);
        }
      } catch (err) {
        console.error("Error fetching product or users:", err);
        // fallback product
        setProduct({
          title: "Product not available",
          description: "This product is currently unavailable.",
          price: "0.00",
          category: "N/A",
          image: "https://via.placeholder.com/300x300?text=No+Image",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSeller();
  }, [id]);

  if (loading) {
    return (
      <div className="single-product-loading">
        <p>Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    const productWithSeller = { ...product, quantity, seller };

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push(productWithSeller);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="single-product">
      <div className="product-image">
        <img src={product?.image} alt={product?.title} />
      </div>

      <div className="product-details">
        <h1>{product?.title}</h1>
        <p className="product-category">{product?.category}</p>
        <p className="product-description">{product?.description}</p>
        <p className="product-price">${product?.price}</p>

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

        {seller && (
          <div className="product-seller">
            <h3>Seller Information</h3>
            <p>
              <strong>Name:</strong> {seller.name?.firstname}{" "}
              {seller.name?.lastname}
            </p>
            <p>
              <strong>Username:</strong> {seller.username}
            </p>
            <p>
              <strong>Email:</strong> {seller.email}
            </p>
            <p>
              <strong>Phone:</strong> {seller.phone}
            </p>
            {seller.address && (
              <p>
                <strong>Address:</strong> {seller.address.number}{" "}
                {seller.address.street}, {seller.address.city},{" "}
                {seller.address.zipcode}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
