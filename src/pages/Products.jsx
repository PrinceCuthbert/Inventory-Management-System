import { useState, useRef, useEffect } from "react";
import "../css/products.css"; // create this for styles
import "@fortawesome/fontawesome-free/css/all.min.css";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      slug: "iphone-14-pro",
      category: "Electronics",
      brand: "Apple",
      description: "Latest iPhone with Pro camera system",
      tags: ["smartphone", "apple", "premium"],
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      slug: "samsung-galaxy-s23",
      category: "Electronics",
      brand: "Samsung",
      description: "Flagship Android smartphone",
      tags: ["smartphone", "android", "samsung"],
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "MacBook Pro M2",
      slug: "macbook-pro-m2",
      category: "Computers",
      brand: "Apple",
      description: "Professional laptop with M2 chip",
      tags: ["laptop", "apple", "professional"],
      createdAt: "2024-01-13",
    },
  ];

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

      {/* Table */}
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Tags</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
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
            ))}
          </tbody>
        </table>
      </div>

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
