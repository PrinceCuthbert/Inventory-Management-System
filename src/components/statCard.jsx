import React from "react";
import "@/css/dashboard.css";

const StatCard = ({
  title,
  value,
  icon = "fa-cube",
  percentage,
  currency = "",
  color = "#3498db", // default blue color for icon
  percentageColor = "#34d399", // default green color for percentage
}) => {
  return (
    <div className="stat-card">
      <div className="card-header">
        <p>{title}</p>
        <i
          className={`fa ${icon} logo-icon`}
          aria-hidden="true"
          style={{ color }}></i>
      </div>
      <div className="card-body">
        <p>
          {title}: {currency}
          {value}
        </p>
        <span>
          <span style={{ color: percentageColor }}>{percentage}</span> from last
          month
        </span>
      </div>
    </div>
  );
};

export default StatCard;
