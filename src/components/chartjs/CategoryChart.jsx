// src/components/CategoryChart.jsx
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CategoryChart = () => {
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

  if (!products.length) return <p>Loading category chart...</p>;

  const categories = [...new Set(products.map((p) => p.category))];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Number of Products",
        data: categories.map(
          (cat) => products.filter((p) => p.category === cat).length
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
          "#FF9800",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Products by Category" },
    },
  };

  return <Pie data={data} options={options} />;
};

export default CategoryChart;
