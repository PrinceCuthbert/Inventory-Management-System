// src/components/LineCharts.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineCharts = () => {
  // State for monthly data
  const [monthlyData, setMonthlyData] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Initialize 12 months with 0
    const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      revenue: 0,
      expenses: 0,
    }));

    // Aggregate sales revenue
    savedSales.forEach((sale) => {
      const date = new Date(sale.createdAt);
      const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
      monthlyTotals[monthIndex].revenue +=
        sale.actualPrice * (sale.quantity || 1);
    });

    // Aggregate expenses
    savedExpenses.forEach((expense) => {
      const date = new Date(expense.createdAt || expense.date);
      const monthIndex = date.getMonth();
      monthlyTotals[monthIndex].expenses += expense.amount || 0;
    });

    setMonthlyData(monthlyTotals);
  }, []);

  if (!monthlyData.length) return <p>Loading line chart...</p>;

  const labels = monthlyData.map((d) => d.month);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyData.map((d) => d.revenue),
        borderColor: "#60A5FA", // Blue color similar to the reference
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        borderWidth: 3,
        tension: 0.4, // smooth curve
        fill: false,
        pointBackgroundColor: "#60A5FA",
        pointBorderColor: "#60A5FA",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Monthly Expenses",
        data: monthlyData.map((d) => d.expenses),
        borderColor: "#EF4444", // Red color similar to the reference
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        tension: 0.4, // smooth curve
        fill: false,
        pointBackgroundColor: "#EF4444",
        pointBorderColor: "#EF4444",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          color: "#E5E7EB", // Light gray for dark theme
          font: {
            size: 12,
            weight: "500",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue & Expenses",
        color: "#F9FAFB", // White for dark theme
        font: {
          size: 18,
          weight: "600",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#F9FAFB",
        bodyColor: "#E5E7EB",
        borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${
              context.dataset.label
            }: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(75, 85, 99, 0.1)",
          drawBorder: false,
          borderDash: [6, 4], // 👈 dashed gridlines
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(75, 85, 99, 0.1)",
          drawBorder: false,
          borderDash: [6, 4], // 👈 dashed gridlines
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div
      style={{
        height: "400px",
        backgroundColor: "var(--bg-color)",
        padding: "20px",
        borderRadius: "2px",
        border: "1px solid var(--bg-border)",
        // boxShadow: "0 4px 6px var(--btn-hover-color)",
      }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineCharts;
