import React, { useState } from "react";
import "../../css/users.css";

// AddUserDialog.jsx
export default function AddUserDialog({ isOpen, onClose, onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    contact: "",
    password: "",
    role: "Staff",
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

    // Call the function from Users.jsx
    onAddUser(formData);

    // Reset form
    setFormData({
      name: "",
      username: "",
      contact: "",
      password: "",
      role: "Staff",
    });

    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add User</p>
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
              <label htmlFor="username">Username</label>
              <input
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="contact">Contact</label>
              <input
                name="contact"
                placeholder="Enter contact information"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required>
                <option value="">Select Role</option>
                <option>Admin</option>
                <option>Staff</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Create User</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
