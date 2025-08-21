import React, { useState } from "react";
import "../../css/users.css";
// import { expenseTypes } from "@/data/expenseTypes";

export default function AddExpenseTypeDialog({
  isOpen,
  onClose,
  onAddExpenseType,
}) {
  const [formData, setFormData] = useState({
    name: "",
    regularAmount: "",
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

    // Prepare expense type object
    // const newExpenseType = {
    //   ...formData,
    //   regularAmount: `$${parseFloat(formData.regularAmount).toFixed(2)}`,
    //   createdAt: new Date().toLocaleDateString(),
    // };
    const newExpenseType = {
      // id: Date.now(),  It will be handled in ExpenseTypes.jsx
      name: formData.name,
      regularAmount: parseFloat(formData.regularAmount),
      description: formData.description,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddExpenseType(newExpenseType);

    // Reset form
    setFormData({
      name: "",
      regularAmount: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Expense Type</p>
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
              <label>Regular Amount</label>
              <input
                type="number"
                step="0.01"
                name="regularAmount"
                value={formData.regularAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Expense Type</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
