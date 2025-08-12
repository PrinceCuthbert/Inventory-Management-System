import React, { useState } from "react";
import "../../css/users.css";

export default function AddUserDialog({ isOpen, onClose }) {
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
    console.log("User Data:", formData);
    onClose(); // close modal after save
  };

  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add User</p>
          <i
            class="fa fa-times fa-xs"
            aria-hidden="true"
            size="1x"
            onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label for="name">Name</label>
              <input
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label for="username">Username</label>
              <input
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label for="contact">Contact</label>
              <input
                name="contact"
                placeholder="Enter contact information"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label for="password">Password</label>
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
              <select name="role" value={formData.role} onChange={handleChange}>
                <option>Select Role</option>
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
