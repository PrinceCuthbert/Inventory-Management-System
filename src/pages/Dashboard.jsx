// src/pages/Dashboard.jsx
import React from "react";
import StockChart from "../components/chartjs/StockChart";
import CategoryChart from "../components/chartjs//CategoryChart";
import StockRadarChart from "../components/chartjs/StockRadarChart";
import StockDoughnutChart from "../components/chartjs/StockDoughnutChart";

import { products } from "../data/products";
import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>📊 Inventory Analytics</h2>

      <div className="chart-grid">
        <div className="chart-card">
          <StockChart products={products} />
        </div>
        <div className="chart-card">
          <CategoryChart products={products} />
        </div>
        {/* <div className="chart-card">
          <StockRadarChart products={products} />
        </div> */}
        <div className="chart-card">
          <StockDoughnutChart products={products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
