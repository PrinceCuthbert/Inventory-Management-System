import { useState, useRef, useEffect } from "react";
import "../css/products.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import local static products data
// import { products as localProducts } from "../pages/products";
import { products as localProducts } from "../data/products";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef(null);

  useEffect(() => {
    // Simulate backend fetch with timeout for now
    const fetchProducts = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(localProducts), 500);
      });
    };

    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter products by search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dialog if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setDialogOpen(false);
      }
    };
    if (dialogOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dialogOpen]);

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <button className="btn-primary">
          <i className="fa fa-plus"></i> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="products-search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading state */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Tags</th>
                <th>Supplier</th>
                <th>Price(RWF)</th>
                <th>Stock(Quantity)</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}>
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td data-label="Name" className="bold">
                      {product.name}
                    </td>
                    <td data-label="Category">{product.category}</td>
                    <td data-label="Brand">{product.brand}</td>
                    <td data-label="Tags">
                      <div className="tag-container">
                        {product.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td data-label="Supplier">{product.supplier}</td>
                    <td data-label="Price">{product.price}</td>
                    <td data-label="Stock">{product.stock}</td>
                    <td data-label="Created">{product.createdAt}</td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => {
                            setSelectedProduct(product);
                            setDialogOpen(true);
                          }}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn-icon delete">
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog */}
      {dialogOpen && selectedProduct && (
        <div className="dialog-overlay">
          <div className="dialog-box" ref={dialogRef}>
            <h3>Product Details</h3>
            <div className="dialog-content">
              <label>Name:</label>
              <p>{selectedProduct.name}</p>

              <label>Description:</label>
              <p>{selectedProduct.description}</p>

              <label>Category:</label>
              <p>{selectedProduct.category}</p>

              <label>Brand:</label>
              <p>{selectedProduct.brand}</p>

              <label>Supplier:</label>
              <p>{selectedProduct.supplier}</p>

              <label>Stock:</label>
              <p>{selectedProduct.stock}</p>

              <label>Price:</label>
              <p>{selectedProduct.price}</p>
            </div>
            <button className="btn-close" onClick={() => setDialogOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
