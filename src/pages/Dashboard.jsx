import { React } from "react";

import StockChart from "@/components/chartjs/StockChart";
import CategoryChart from "@/components/chartjs/CategoryChart";
import { products } from "../data/products";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "400px" }}>
          <StockChart products={products} />
        </div>
        <div style={{ flex: 1, minWidth: "400px" }}>
          <CategoryChart products={products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
