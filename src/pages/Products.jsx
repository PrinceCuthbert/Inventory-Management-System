import { useState, useRef, useEffect } from "react";
import "../css/products.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import local static products data
// import { products as localProducts } from "../pages/products";
import Spinner from "../components/antDesign/spin";
import { products as localProducts } from "../data/products";
import AddProductDialaog from "./AddingPages/AddProductDialog";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef(null);

  // For AddProductDialog Box
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // Simulate backend fetch with timeout
  //       const data = await new Promise((resolve) => {
  //         setTimeout(() => resolve(localProducts), 500);
  //       });
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // Filter products by search term

  // Load products from localStorage or fallback to localProducts
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(localProducts);
    }
    setIsLoading(false);
  }, []);

  // When adding a product:
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => {
      const updated = [
        ...prev,
        { ...newProduct, createdAt: new Date().toLocaleDateString() },
      ];
      localStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  // Then in JSX

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.stock.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Open user details modal
  const openDetails = (product) => {
    setSelectedProduct(product);
    setDetailsModal(true);
  };

  // Close modal
  const closeDetails = () => {
    setSelectedProduct(null);
    setDetailsModal(false);
  };

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setIsAddProductOpen(true)}>
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
        <Spinner />
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>No data found</p>
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
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td data-label="Name" className="bold">
                    {product.name}
                  </td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="Brand">{product.brand}</td>
                  <td data-label="Tags">
                    <div className="tag-container">
                      {product.tags && product.tags.length > 0 ? (
                        product.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="tag">No tags</span>
                      )}
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
                        onClick={() => openDetails(product)}
                        aria-label={`View details of ${product.name}`}>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button className="btn-icon">
                        <i
                          className="fa fa-edit"
                          aria-label={`Edit ${product.name}`}></i>
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
      )}

      {/* product details modal */}
      {detailsModal && selectedProduct && (
        <div className="dialog-overlay" onClick={closeDetails}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>User Details</h3>
            <div className="dialog-content">
              <label>Name:</label>
              <p>{selectedProduct.name}</p>

              <label>Category</label>
              <p>{selectedProduct.category}</p>

              <label>Brand</label>
              <p>{selectedProduct.brand}</p>

              <label>Tag</label>
              <p>{selectedProduct.tags.join(", ")}</p>

              <label>Supplier</label>
              <p>{selectedProduct.supplier}</p>

              <label>Price</label>
              <p>{selectedProduct.price}</p>

              <label>Stock</label>
              <p>{selectedProduct.stock}</p>

              <label>Created_at</label>
              <p>{selectedProduct.createdAt}</p>
            </div>
            <button className="btn-close" onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dialog */}

      <AddProductDialaog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default Products;
