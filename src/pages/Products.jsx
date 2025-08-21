import { useState, useRef, useEffect } from "react";
import "../css/products.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useOutletContext } from "react-router-dom";
import Spinner from "../components/antDesign/spin";
import { Space, Button, notification } from "antd";
import AddProductDialaog from "./AddingPages/AddProductDialog";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const dialogRef = useRef(null);

  const { products, setProducts, sales } = useOutletContext();

  const [api, contextHolder] = notification.useNotification();
  // Persist products in localStorage on first load

  // useEffect(() => {
  //   console.log("Products state at useEffect:", products);
  // }, [products]);
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      const parsed = JSON.parse(stored).map((p, index) => ({
        ...p,
        id: p.id || index + 1,
      }));
      setProducts(parsed);
    } else {
      import("../data/products").then(({ products }) => {
        const normalized = products.map((p, index) => ({
          ...p,
          id: p.id || index + 1,
        }));
        setProducts(normalized);
        localStorage.setItem("products", JSON.stringify(normalized));
      });
    }
  }, []);

  if (!products) return <Spinner />; // Show spinner until products are loaded

  // Filter products by search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.costPrice.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.stock.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open product details modal
  const openDetails = (product) => {
    setSelectedProduct(product);
    setDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
    setDetailsModal(false);
  };

  const handleAddProduct = (newProduct) => {
    const nextId = products.length
      ? Math.max(...products.map((p) => p.id || 0)) + 1
      : 1;

    // const productWithId = { ...newProduct, id: nextId };
    const productWithId = {
      id: nextId,
      name: newProduct.name,
      category: newProduct.category.trim(),
      brand: newProduct.brand.trim(),
      tags: newProduct.tags || [],
      supplier: newProduct.supplier.trim(),
      costPrice: Number(newProduct.costPrice),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      createdAt: new Date().toISOString().split("T")[0], // format: YYYY-MM-DD
    };

    setProducts((prev) => {
      const updated = [...prev, productWithId];
      localStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteProduct = (productId) => {
    const key = `delete${productId}`;

    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy(key)}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            setProducts((prev) => {
              const updated = prev.filter((p) => p.id !== productId);
              localStorage.setItem("products", JSON.stringify(updated));
              return updated;
            });
            api.destroy(key); // ✅ correct spelling
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: "Are you sure you want to delete this product?",
      btn,
      key,
      duration: 0, // stays until user confirms/cancels
    });
  };

  // console.log("Products:", products);
  // console.log("Sales:", sales);

  // console.log("Products:", products);
  // console.log(
  //   "Looking for productId 3:",
  //   products.find((p) => p.id === 3)
  // );

  return (
    <>
      {contextHolder}
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
            style={{
              outline: "none",
              border: "none",
              boxShadow: "none",
              ...(isFocused && {
                outline: "none",
                border: "none",
                boxShadow: "none",
              }),
            }}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {/* Products table */}
        {filteredProducts.length === 0 ? (
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
                  <th>CostPrice(RWF)</th>
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
                        {product.tags?.length ? (
                          product.tags.map((tag, i) => (
                            <span key={i} className="tag">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="tag">No tags</span>
                        )}
                      </div>
                    </td>
                    <td data-label="Supplier">{product.supplier}</td>
                    <td data-label="CostPrice">{product.costPrice}</td>
                    <td data-label="Price">{product.price}</td>
                    <td data-label="Stock">{product.stock}</td>
                    <td data-label="Created">{product.createdAt}</td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(product)}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteProduct(product.id)}>
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

        {/* Product details modal */}
        {detailsModal && selectedProduct && (
          <div className="dialog-overlay" onClick={closeDetails}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <h3>Product Details</h3>
              <div className="dialog-content">
                <label>Name:</label>
                <p>{selectedProduct.name}</p>
                <label>Category:</label>
                <p>{selectedProduct.category}</p>
                <label>Brand:</label>
                <p>{selectedProduct.brand}</p>
                <label>Tags:</label>
                <p>{selectedProduct.tags.join(", ")}</p>
                <label>Supplier:</label>
                <p>{selectedProduct.supplier}</p>
                <label>CostPrice:</label>
                <p>{selectedProduct.costPrice}</p>
                <label>Price:</label>
                <p>{selectedProduct.price}</p>
                <label>Stock:</label>
                <p>{selectedProduct.stock}</p>
                <label>Created At:</label>
                <p>{selectedProduct.createdAt}</p>
              </div>
              <button className="btn-close" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Product Dialog */}
        <AddProductDialaog
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddProduct}
        />
      </div>
    </>
  );
}

export default Products;
