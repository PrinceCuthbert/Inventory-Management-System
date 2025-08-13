import React, { useState } from "react";
import "../../css/users.css";

export default function AddProductDialaog({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    tags: "",
    description: "",
    supplier: "",
    price: "",
    stock: "",
    createdAt: "",
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
    console.log(FormData);

    // call the function from Products.jsx
    onAddProduct({
      ...formData,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    });

    // reset form
    setFormData({
      name: "",
      category: "",
      brand: "",
      tags: "",
      description: "",
      supplier: "",
      price: "",
      stock: "",
      createdAt: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Product</p>
          <i
            className="fa fa-times fa-xs"
            aria-hidden="true"
            onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="username">Category</label>
              <input
                name="category"
                placeholder=""
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="contact">Tag</label>
              <input
                name="tags"
                placeholder=""
                value={formData.tags}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input
                name="brand"
                placeholder=""
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Supplier</label>
              <input
                name="supplier"
                placeholder=""
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder=""
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
                placeholder=""
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Product </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
