// src/components/StockChart.jsx
import React from "react";
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

const StockChart = ({ products }) => {
  const data = {
    labels: products.map((p) => p.name), // Product names
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map((p) => p.stock), // Stock levels
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
