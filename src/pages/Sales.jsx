// src/pages/Sales.jsx
import { useState } from "react";
import { notification, Button, Space } from "antd";
import { useOutletContext } from "react-router-dom";
import Spinner from "@/components/antDesign/spin";
import AddSaleDialog from "./AddingPages/AddSaleDialog";
// import { calculateProfit } from "@/utils/profitUtils";
import { useProfit } from "@/hooks/useProfit"; // ✅ import hook

import "../css/users.css";

function Sales() {
  const { products, setProducts, sales, setSales } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  // if (!products || !sales) return <Spinner />;

  // ✅ no rounding, use exact values
  // const totalProfit = sales.reduce((acc, sale) => {
  //   const product = products.find((p) => p.id === sale.productId);
  //   const costPrice = product?.costPrice || 0;
  //   const quantity = sale.quantity || 1;
  //   return acc + (sale.actualPrice - costPrice) * quantity;
  // }, 0);

  // const profitLabel = totalProfit >= 0 ? "Gross Profit" : " Gross Loss";
  // const displayAmount = Math.abs(totalProfit);
  // ✅ removed .toFixed(2)

  // Use utility
  // const { profitLabel, displayAmount } = calculateProfit(sales, products);

  const { profitLabel, displayAmount } = useProfit(sales, products);

  const term = searchTerm.toLowerCase().trim();
  const filteredSales = sales.filter(
    (s) =>
      (s.productName?.toLowerCase() || "").includes(term) ||
      (s.clientName?.toLowerCase() || "").includes(term) ||
      (s.paymentType?.toLowerCase() || "").includes(term)
  );

  const handleAddSale = (sale) => {
    const product = products.find((p) => p.id === sale.productId);
    if (!product) return;

    if (sale.quantity > product.stock) {
      api.error({
        message: "Insufficient Stock",
        description: `Only ${product.stock} units available for ${product.name}`,
      });
      return;
    }

    const newSale = { ...sale };

    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: p.stock - sale.quantity } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    const updatedSales = [...sales, newSale];
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));

    setIsAddSaleOpen(false);
  };

  const openDetails = (sale) => {
    setSelectedSale(sale);
    setDetailsModal(true);
  };
  const closeDetails = () => {
    setSelectedSale(null);
    setDetailsModal(false);
  };
  const handleDeleteSale = (saleId) => {
    const key = `delete${saleId}`;

    const btn = (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => api.destroy(key)} // ✅ use api instance
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            setSales((prevSales) => {
              const updatedSales = prevSales.filter((s) => s.id !== saleId);
              localStorage.setItem("sales", JSON.stringify(updatedSales));
              return updatedSales;
            });
            api.destroy(key); // ✅ use api instance
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

  console.log("Sales:", sales);
  console.log("Products:", products);

  return (
    <>
      {contextHolder}

      {/* Profit Card */}
      <div
        className="profit-card"
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "var(--bg-color)",
          borderRadius: "8px",
          border: "2px solid var(--primary-color)",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 6px var(--btn-hover-color)",
          textAlign: "center",
        }}>
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
          <p style={{ textAlign: "center", padding: "20px" }}>
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
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td data-label="Product" className="bold">
                      {sale.productName}
                    </td>
                    <td data-label="Quantity" className="bold">
                      {sale.quantity}
                    </td>
                    <td data-label="Client" className="bold">
                      {sale.clientName}
                    </td>
                    <td data-label="Price" className="bold">
                      ${sale.actualPrice * (sale.quantity || 1)}{" "}
                      {/* ✅ no .toFixed */}
                    </td>
                    <td data-label="Payment" className="bold">
                      {sale.paymentType}
                    </td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(sale)}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn-icon">
                          <i className="fa fa-edit"></i>
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
                <label>Product:</label>
                <p>{selectedSale.productName}</p>
                <label>Quantity:</label>
                <p>{selectedSale.quantity}</p>
                <label>Price:</label>
                <p>
                  ${selectedSale.actualPrice * (selectedSale.quantity || 1)}{" "}
                  {/* ✅ no .toFixed */}
                </p>
                <label>Payment:</label>
                <p>{selectedSale.paymentType}</p>
                <label>Client Name:</label>
                <p>{selectedSale.clientName}</p>
                <label>Client Contact:</label>
                <p>{selectedSale.clientContact}</p>
                <label>Description:</label>
                <p>{selectedSale.description || "No description"}</p>
                <label>Created At:</label>
                <p>{selectedSale.createdAt}</p>
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
          onAddSale={handleAddSale}
        />
      </div>
    </>
  );
}

export default Sales;
