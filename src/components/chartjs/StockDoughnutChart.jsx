// src/components/StockDoughnutChart.jsx
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StockDoughnutChart = () => {
  // State for products and sales
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem("sales")) || []
  );

  // Update state when localStorage changes (other tabs or manual updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(JSON.parse(localStorage.getItem("products")) || []);
      setSales(JSON.parse(localStorage.getItem("sales")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Also sync on mount in case localStorage changed inside app
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
  }, []);

  if (!products.length) return <p>Loading doughnut chart...</p>;

  const totalSold = sales.reduce((sum, sale) => sum + (sale.quantity || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const inStock = totalStock - totalSold;

  const data = {
    labels: ["In Stock", "Sold"],
    datasets: [
      {
        data: [inStock, totalSold],
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Stock vs Sold" },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default StockDoughnutChart;
