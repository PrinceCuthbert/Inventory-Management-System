import React, { useState, useEffect } from "react";
import "../../css/users.css";
import FormInput from "@/forms/FormInput";
import FormSelect from "@/forms/FormSelect";

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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    // const nextId =
    //   dataToEdit?.id || Number(localStorage.getItem("saleCounter") || 0) + 1;

    // const saleCounter = Number(localStorage.getItem("saleCounter") || 0) + 1;

    const saleCounter = Number(localStorage.getItem("saleCounter") || 0) + 1;

    const salePayload = {
      id: dataToEdit?.id || Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      costPrice: selectedProduct.costPrice || 0,
      quantity: qty,
      actualPrice: parseFloat(formData.actualPrice),
      totalPrice,
      payments: [{ amount: amountPaid, date: new Date().toLocaleDateString() }],
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

    if (!dataToEdit) localStorage.setItem("saleCounter", saleCounter);

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
            <FormSelect
              label="Product"
              value={formData.productId}
              onChange={(val) => handleChange("productId", val)}
              options={products.map((p) => ({
                label: `${p.name} (Stock: ${p.stock})`,
                // value: String(p.id),
                value: p.id,
              }))}
            />

            <FormSelect
              label="Quantity"
              value={formData.quantity}
              onChange={(val) => handleChange("quantity", val)}
              options={
                currentAvailableStock > 0
                  ? Array.from({ length: currentAvailableStock }, (_, i) => ({
                      key: `qty-${i + 1}`, // ✅ unique key
                      label: i + 1,
                      value: i + 1,
                    }))
                  : [{ key: "qty-1", label: 1, value: 1 }]
              }
            />

            <FormInput
              label="Price per Unit"
              type="number"
              value={formData.actualPrice}
              onChange={(val) => handleChange("actualPrice", val)}
            />

            <FormInput
              label="Amount Paid"
              type="number"
              value={formData.amountPaid}
              onChange={(val) => handleChange("amountPaid", val)}
            />

            <FormSelect
              label="Payment Type"
              value={formData.paymentType}
              onChange={(val) => handleChange("paymentType", val)}
              options={paymentMethods.map((m) => ({ label: m, value: m }))}
            />

            <FormInput
              label="Client Name"
              value={formData.clientName}
              onChange={(val) => handleChange("clientName", val)}
            />

            <FormInput
              label="Client Contact"
              value={formData.clientContact}
              onChange={(val) => handleChange("clientContact", val)}
            />

            <FormInput
              label="Description"
              value={formData.description}
              onChange={(val) => handleChange("description", val)}
            />
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
