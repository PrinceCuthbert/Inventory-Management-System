// src/pages/Sales.jsx
import { useState, useEffect, useMemo } from "react";
import { notification, Button, Space } from "antd";
import { useOutletContext } from "react-router-dom";
import AddSaleDialog from "./AddingPages/AddSaleDialog";
import { salesData } from "@/data/sales";
import { useProfit } from "@/hooks/useProfit";
import "../css/users.css";

function Sales() {
  const { products, setProducts, sales, setSales } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [editSale, setEditSale] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const { profitLabel, displayAmount } = useProfit(sales, products);

  // Load sales from localStorage or fallback to salesData
  useEffect(() => {
    if (!products || products.length === 0) return;

    const storedSales = JSON.parse(localStorage.getItem("sales") || "null");
    const sourceSales = storedSales?.length ? storedSales : salesData;

    const updatedSales = sourceSales.map((s) => {
      const product = products.find((p) => p.id === s.productId);
      const totalPrice = s.totalPrice ?? s.actualPrice * s.quantity;
      const amountPaid = s.amountPaid ?? 0;
      const balance = totalPrice - amountPaid;
      const isFullyPaid = balance <= 0;

      return {
        ...s,
        productName: product?.name || "Unknown Product",
        totalPrice,
        amountPaid,
        balance,
        isFullyPaid,
      };
    });

    setSales(updatedSales);
    if (!storedSales?.length)
      localStorage.setItem("sales", JSON.stringify(updatedSales));
  }, [products, setSales]);

  // Filter sales based on search
  const filteredSales = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return sales.filter(
      (s) =>
        s.productName?.toLowerCase().includes(term) ||
        s.clientName?.toLowerCase().includes(term) ||
        s.paymentType?.toLowerCase().includes(term)
    );
  }, [sales, searchTerm]);

  // Add/Edit sale handler
  const handleSaveSale = (sale) => {
    const product = products.find((p) => p.id === sale.productId);
    if (!product) return;

    // Check stock availability
    const availableStock = editSale
      ? product.stock + editSale.quantity
      : product.stock;

    if (sale.quantity > availableStock) {
      api.error({
        message: "Insufficient Stock",
        description: `Only ${availableStock} units available for ${product.name}`,
      });
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? { ...p, stock: p.stock - (sale.quantity - (editSale?.quantity || 0)) }
        : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    let updatedSales;
    if (editSale) {
      updatedSales = sales.map((s) => (s.id === editSale.id ? sale : s));
      setEditSale(null);
    } else {
      updatedSales = [...sales, sale];
    }

    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
    setIsAddSaleOpen(false);
  };

  const openDetails = (sale) => {
    setSelectedSale(sale);
    setDetailsModal(true);
  };
  const closeDetails = () => setDetailsModal(false);

  const handleDeleteSale = (saleId) => {
    const key = `delete${saleId}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy(key)}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            const saleToDelete = sales.find((s) => s.id === saleId);
            if (!saleToDelete) return;

            // Restore stock
            const updatedProducts = products.map((p) =>
              p.id === saleToDelete.productId
                ? { ...p, stock: p.stock + saleToDelete.quantity }
                : p
            );
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));

            const updatedSales = sales.filter((s) => s.id !== saleId);
            setSales(updatedSales);
            localStorage.setItem("sales", JSON.stringify(updatedSales));

            api.destroy(key);
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: "Are you sure you want to delete this sale?",
      btn,
      key,
      duration: 0,
    });
  };
  const handleAddPayment = (saleId, paymentAmount) => {
    const updatedSales = sales.map((s) => {
      if (s.id !== saleId) return s;

      if (paymentAmount > s.balance) {
        alert(`Cannot pay more than remaining balance: ${s.balance}`);
        return s;
      }

      const newPayment = {
        amount: paymentAmount,
        date: new Date().toLocaleDateString(),
      };

      const allPayments = [...s.payments, newPayment];
      const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
      const balance = s.totalPrice - totalPaid;

      return {
        ...s,
        payments: allPayments,
        balance,
        amountPaid: totalPaid,
        isFullyPaid: balance <= 0,
        updatedAt: new Date().toLocaleDateString(),
      };
    });

    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  return (
    <>
      {contextHolder}
      <div className="profit-card">
        <h2>
          {profitLabel}: ${displayAmount}
        </h2>
      </div>

      <div className="products-container">
        <div className="products-header">
          <div>
            <h1>Sales</h1>
            <p>Manage your sales records</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsAddSaleOpen(true)}>
            <i className="fa fa-plus"></i> Add Sale
          </button>
        </div>

        <div className="products-search">
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSales.length === 0 ? (
          <p className="no-data">
            {sales.length === 0 ? "No sales yet" : "No sales found"}
          </p>
        ) : (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Client</th>
                  <th>Price</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={`${sale.id}-${sale.productId}`}>
                    <td data-label="Product">{sale.productName}</td>
                    <td data-label="Quantity">{sale.quantity}</td>
                    <td data-label="Client">{sale.clientName}</td>
                    <td data-label="Price">{sale.totalPrice}</td>
                    <td data-label="Paid">{sale.amountPaid}</td>
                    <td data-label="Balance">{sale.balance}</td>
                    <td data-label="Status">
                      {sale.isFullyPaid ? "Paid" : "Pending"}
                    </td>
                    <td data-label="Payment">{sale.paymentType}</td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(sale)}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() =>
                            setEditSale(sale) || setIsAddSaleOpen(true)
                          }>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => {
                            const amount = parseFloat(
                              prompt("Enter payment amount:")
                            );
                            if (!isNaN(amount))
                              handleAddPayment(sale.id, amount);
                          }}>
                          <i className="fa fa-hand-holding-usd"></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteSale(sale.id)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {detailsModal && selectedSale && (
          <div className="dialog-overlay" onClick={closeDetails}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <h3>Sale Details</h3>
              <div className="dialog-content">
                {Object.entries(selectedSale).map(([key, value]) => (
                  <div key={key}>
                    <label>{key.replace(/([A-Z])/g, " $1")}:</label>
                    {Array.isArray(value) ? (
                      <ul>
                        {value.map((item, i) => (
                          <li key={i}>
                            {typeof item === "object"
                              ? JSON.stringify(item)
                              : item}
                          </li>
                        ))}
                      </ul>
                    ) : typeof value === "object" && value !== null ? (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    ) : (
                      <p>{value?.toString()}</p>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn-close" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        )}

        <AddSaleDialog
          isOpen={isAddSaleOpen}
          onClose={() => setIsAddSaleOpen(false)}
          onAddSale={handleSaveSale}
          dataToEdit={editSale}
          mode={editSale ? "edit" : "add"}
        />
      </div>
    </>
  );
}

export default Sales;
