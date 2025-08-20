import React, { useState, useEffect } from "react";
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
    expenseTypeId: "",
    expenseType: "",
    description: "",
  });

  // ✅ Use expenseTypes from props and keep it up-to-date
  const [types, setTypes] = useState(expenseTypes);

  useEffect(() => {
    if (!expenseTypes) return;

    // Copy current expenseTypes
    const updatedTypes = [...expenseTypes];

    // Only add "Others" if not already present
    if (!updatedTypes.find((t) => t.name === "Others")) {
      const nextId = updatedTypes.length
        ? Math.max(...updatedTypes.map((t) => t.id)) + 1
        : 1;
      updatedTypes.push({
        id: nextId,
        name: "Others",
        regularAmount: 0,
        description: "Fallback for uncategorized expenses",
        createdAt: new Date().toLocaleDateString(),
      });
    }

    setTypes(updatedTypes);
  }, [expenseTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine expenseTypeId
    const selectedType = types.find((t) => t.id === formData.expenseTypeId);

    const newExpense = {
      id: Date.now(), // simple unique id
      payee: formData.payee,
      amount: parseFloat(formData.amount),
      expenseTypeId: selectedType?.id || null, // always set ID
      expenseType: selectedType?.name || "Others", // store name
      description: formData.description,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddExpense(newExpense);

    // Reset form
    setFormData({
      payee: "",
      amount: "",
      expenseTypeId: "",
      expenseType: "",
      description: "",
    });

    onClose();
  };

  useEffect(() => {
    console.log("Types:", types);
  }, [types]);

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
                name="expenseTypeId"
                value={formData.expenseTypeId || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expenseTypeId: Number(e.target.value),
                  }))
                }
                required>
                <option value="">Select Expense Type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

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
