import React, { useState, useEffect } from "react";
import "../../css/users.css";

export default function AddSaleDialog({
  isOpen,
  onClose,
  onAddSale,
  dataToEdit = null,
  mode = "add",
}) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    actualPrice: "",
    amountPaid: 0,
    paymentType: "CASH",
    clientName: "",
    clientContact: "",
    description: "",
  });
  const [originalSaleId, setOriginalSaleId] = useState(null);
  const paymentMethods = ["CASH", "MOMO", "INSTALLMENTS", "LOAN"];

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (dataToEdit) {
      setFormData({
        productId: dataToEdit.productId,
        quantity: dataToEdit.quantity,
        actualPrice: dataToEdit.actualPrice,
        amountPaid: dataToEdit.amountPaid,
        paymentType: dataToEdit.paymentType,
        clientName: dataToEdit.clientName,
        clientContact: dataToEdit.clientContact,
        description: dataToEdit.description,
      });
      setOriginalSaleId(dataToEdit.originalSaleId || dataToEdit.id);
    } else {
      setOriginalSaleId(null);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProduct = products.find(
      (p) => String(p.id) === String(formData.productId)
    );
    if (!selectedProduct) return alert("Select a valid product");

    const qty = parseInt(formData.quantity);
    const availableStock = dataToEdit
      ? selectedProduct.stock + dataToEdit.quantity
      : selectedProduct.stock;
    if (qty > availableStock)
      return alert(`Cannot sell more than stock: ${availableStock}`);

    const totalPrice = parseFloat(formData.actualPrice) * qty;
    const amountPaid = parseFloat(formData.amountPaid || 0);
    const balance = totalPrice - amountPaid;
    const isFullyPaid = balance <= 0;

    const salePayload = {
      id:
        dataToEdit?.id || Number(localStorage.getItem("saleCounter") || 0) + 1,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      costPrice: selectedProduct.costPrice || 0,
      quantity: qty,
      actualPrice: parseFloat(formData.actualPrice),
      totalPrice,
      amountPaid,
      originalSaleId:
        originalSaleId ||
        dataToEdit?.id ||
        Number(localStorage.getItem("saleCounter") || 0) + 1,
      balance,
      isFullyPaid,
      paymentType: formData.paymentType,
      clientName: formData.clientName,
      clientContact: formData.clientContact,
      description: formData.description,
      createdAt: dataToEdit?.createdAt || new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };

    if (!dataToEdit) localStorage.setItem("saleCounter", salePayload.id);

    onAddSale(salePayload, mode);

    setFormData({
      productId: "",
      quantity: 1,
      actualPrice: "",
      amountPaid: 0,
      paymentType: "CASH",
      clientName: "",
      clientContact: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  const selectedProduct = products.find(
    (p) => String(p.id) === String(formData.productId)
  );
  const currentAvailableStock = selectedProduct
    ? dataToEdit
      ? selectedProduct.stock + dataToEdit.quantity
      : selectedProduct.stock
    : 0;

  return (
    <div className="popup-overlay">
      <div className="add-user">
        <div className="title">
          <p>{mode === "edit" ? "Edit Sale" : "Add Sale"}</p>
          <i className="fa fa-times fa-xs" onClick={onClose}></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Product */}
            <div>
              <label>Product</label>
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
              <label>Quantity</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                disabled={!selectedProduct}>
                {currentAvailableStock > 0 ? (
                  Array.from(
                    { length: currentAvailableStock },
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
              <label>Price per Unit</label>
              <input
                type="number"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label>Amount Paid</label>
              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                min="0"
                placeholder="0 if unpaid"
              />
            </div>

            {/* Payment Type */}
            <div>
              <label>Payment Type</label>
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

            {/* Client Info */}
            <div>
              <label>Client Name</label>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Client Contact</label>
              <input
                name="clientContact"
                value={formData.clientContact}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={currentAvailableStock === 0}>
              {mode === "edit" ? "Update Sale" : "Add Sale"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
