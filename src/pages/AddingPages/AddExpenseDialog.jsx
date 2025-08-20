import React, { useState } from "react";
import "../../css/users.css";

export default function AddExpenseDialog({
  isOpen,
  onClose,
  onAddExpense,
  expenseTypes = [],
}) {
  const [formData, setFormData] = useState({
    payee: "",
    amount: "",
    expenseType: "",
    otherType: "",
    description: "",
  });

  const [types, setTypes] = useState(() => {
    // Try to get from localStorage
    const stored = JSON.parse(localStorage.getItem("expenseTypes"));
    return stored && stored.length ? stored : expenseTypes;
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

    const newExpense = {
      payee: formData.payee,
      amount: parseFloat(formData.amount),
      expenseType:
        formData.expenseType === "Other"
          ? formData.otherType
          : formData.expenseType,
      description: formData.description,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddExpense(newExpense);

    // Reset form
    setFormData({
      payee: "",
      amount: "",
      expenseType: "",
      otherType: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Expense</p>
          <i className="fa fa-times fa-xs" onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label>Payee</label>
              <input
                name="payee"
                value={formData.payee}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Expense Type</label>
              <select
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                required>
                <option value="">Select Expense Type</option>
                {types.map((type, idx) => (
                  <option key={idx} value={type.name}>
                    {type.name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.expenseType === "Other" && (
              <div>
                <label>Other Expense Type</label>
                <input
                  name="otherType"
                  value={formData.otherType}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Expense</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
