import React, { useState, useEffect } from "react";
import "../../css/users.css";

export default function AddSaleDialog({ isOpen, onClose, onAddSale }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    actualPrice: "",
    paymentType: "CASH",
    clientName: "",
    clientContact: "",
    description: "",
  });

  const paymentMethods = ["CASH", "MOMO", "INSTALLMENTS", "LOAN"];

  useEffect(() => {
    // ✅ Load products from localStorage once
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Find selected product
    const selectedProduct = products.find(
      (p) => String(p.id) === String(formData.productId) // safer string comparison
    );

    if (!selectedProduct) {
      alert("Please select a valid product.");
      return;
    }

    // ✅ Validate quantity against stock
    const qty = parseInt(formData.quantity);
    if (qty > selectedProduct.stock) {
      alert(`Cannot sell more than available stock: ${selectedProduct.stock}`);
      return;
    }

    // ✅ SAFER sale ID generator (saleCounter in localStorage)
    // Get last used ID from localStorage
    let saleCounter = Number(localStorage.getItem("saleCounter") || "0");

    // Increment counter for new sale
    saleCounter += 1;

    // Save updated counter back to localStorage
    localStorage.setItem("saleCounter", saleCounter);

    // ✅ Build sale object
    const newSale = {
      id: saleCounter, // never reused, always increasing
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      costPrice: selectedProduct.costPrice || 0,
      quantity: qty,
      actualPrice: parseFloat(formData.actualPrice),
      paymentType: formData.paymentType,
      clientName: formData.clientName,
      clientContact: formData.clientContact,
      description: formData.description,
      createdAt: new Date().toLocaleDateString(),
    };

    // ✅ Pass newSale to parent
    onAddSale(newSale);

    // ✅ Reset form
    setFormData({
      productId: "",
      quantity: 1,
      actualPrice: "",
      paymentType: "CASH",
      clientName: "",
      clientContact: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  // ✅ Dynamically check selected product to limit quantity dropdown
  const selectedProduct = products.find(
    (p) => String(p.id) === String(formData.productId)
  );

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>Add Sale</p>
          <i className="fa fa-times fa-xs" onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Product */}
            <div>
              <label htmlFor="productId">Product</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required>
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity">Quantity</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                disabled={!selectedProduct}>
                {selectedProduct ? (
                  Array.from(
                    { length: selectedProduct.stock },
                    (_, i) => i + 1
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))
                ) : (
                  <option value="1">1</option>
                )}
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="actualPrice">Price</label>
              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                required
              />
            </div>

            {/* Payment type */}
            <div>
              <label htmlFor="paymentType">Payment Type</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                required>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method.charAt(0) + method.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Client info */}
            <div>
              <label htmlFor="clientName">Client Name</label>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="clientContact">Client Contact</label>
              <input
                name="clientContact"
                value={formData.clientContact}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Sale</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
