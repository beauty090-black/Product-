import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        setProducts(res.data);
        setDisplay(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);


  const handleSearch = (e) => {
    setSearch(e.target.value);

    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setDisplay(filtered);
    setCurrentPage(1);
  };


  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const paginatedProducts = display.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(display.length / productsPerPage);

  if (loading)
    return (
      <div className="skeleton-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="skeleton-card" key={i}></div>
        ))}
      </div>
    );

  return (
    <div className="products-wrapper">

 
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={search}
        onChange={handleSearch}
      />

      <div className="products-container">
        {paginatedProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />

            <h3>{product.title}</h3>
            <p className="price">₦{product.price}</p>

            <Link to={`/product/${product.id}`} className="details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>

    
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Prev
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
