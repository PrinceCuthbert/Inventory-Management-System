// src/components/AddingPages/AddBrandDialog.jsx
import { useState } from "react";
import "../../css/users.css";

function AddBrandDialog({ isOpen, onClose, onAddBrand }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

    // Call the function from Brands.jsx
    onAddBrand({
      ...formData,
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Brand</p>
          <i className="fa fa-times fa-xs" onClick={onClose}></i>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Brand Name</label>
            <input
              name="name"
              placeholder="Enter brand name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
                width: "100%",
                height: "100px",
                border: "1px solid var(--btn-border)",
                overflowY: "hidden",
              }}
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Add Brand</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBrandDialog;
