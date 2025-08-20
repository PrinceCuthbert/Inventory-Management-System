// src/components/StockChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  // State to hold products from localStorage
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  // Update products state whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      setProducts(updatedProducts);
    };

    // Listen for storage events (for multiple tabs)
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Also re-read localStorage when component mounts (in case state changed in-app)
  useEffect(() => {
    const updatedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(updatedProducts);
  }, []);

  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map((p) => p.stock),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stock Levels by Product" },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StockChart;
