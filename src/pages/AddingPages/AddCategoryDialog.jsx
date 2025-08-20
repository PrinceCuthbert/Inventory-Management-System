import { React, useState } from "react";
import "../../css/users.css";

function AddCategoryDialog({ isOpen, onClose, onAddCategory }) {
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
    console.log(formData);

    // call the function from Products.jsx
    onAddCategory({
      ...formData,
    });

    // reset form
    setFormData({
      name: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-user">
          <div className="title">
            <p>Add Category</p>
            <i
              className="fa fa-times fa-xs"
              aria-hidden="true"
              onClick={onClose}></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Category Name</label>
              <input
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="username">Description</label>
              <textarea
                name="description"
                style={{
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  width: "100%",
                  height: "100px",
                  border: "1px solid var(--btn-border)",
                  overflowY: "hidden", // hides vertical overflow
                }}
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit">Add Category </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategoryDialog;
