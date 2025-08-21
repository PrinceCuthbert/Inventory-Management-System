// src/utils/formHelpers.js
export function validateSaleForm(formData) {
  if (!formData.productId) return "Please select a product";
  if (!formData.quantity || formData.quantity <= 0)
    return "Quantity must be greater than 0";
  if (!formData.customerName) return "Customer name is required";
  return null;
}
