import React, { useState } from "react";
import "../../css/users.css";

export default function AddProductDialog({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    tags: "",
    supplier: "",
    costPrice: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare product object
    const newProduct = {
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      createdAt: new Date().toLocaleDateString(),
    };

    onAddProduct(newProduct);

    // Reset form
    setFormData({
      name: "",
      category: "",
      brand: "",
      tags: "",
      supplier: "",
      costPrice: "",
      price: "",
      stock: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Product</p>
          <i className="fa fa-times fa-xs" onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Supplier</label>
              <input
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Cost Price</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Product</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
