import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
     fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-overlay"></div>
        <div className="home-content">
          <h1 className="home-title">Welcome to FakeStore API Project</h1>
          <p className="home-desc">
            Browse beautiful products fetched from an external API.
          </p>
          <Link to="/products" className="home-btn">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
