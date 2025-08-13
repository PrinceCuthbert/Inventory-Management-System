// src/components/StockDoughnutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StockDoughnutChart = ({ products = [] }) => {
  if (!products.length) return <p>Loading doughnut chart...</p>;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  // Our real product total is 445. Let's simulated sales are 35% of total

  const sold = Math.floor(totalStock * 0.35);

  const data = {
    labels: ["In Stock", "Sold"],
    datasets: [
      {
        data: [totalStock - sold, sold],
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
