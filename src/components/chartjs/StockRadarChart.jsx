// src/components/StockRadarChart.jsx
import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const StockRadarChart = () => {
  // State for products
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  // Update state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(JSON.parse(localStorage.getItem("products")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync state on mount
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  if (!products.length) return <p>Loading radar chart...</p>;

  const categories = [...new Set(products.map((p) => p.category))];
  const stockCounts = categories.map((cat) =>
    products
      .filter((p) => p.category === cat)
      .reduce((sum, p) => sum + p.stock, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Stock Levels",
        data: stockCounts,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Stock Levels by Category" },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default StockRadarChart;
