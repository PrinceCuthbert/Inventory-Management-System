import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar({ collapsed, visible, isMobile, toggleSidebar }) {
  // const sidebarClass = `sidebar
  //   ${collapsed ? "collapsed" : ""}
  //   ${isMobile ? (visible ? "open" : "hidden") : ""}`;

  const sidebarClass = `sidebar 
  ${isMobile ? (visible ? "open" : "hidden") : collapsed ? "collapsed" : ""}`;

  return (
    <div className={sidebarClass}>
      <nav className="nav">
        {/* Logo Section */}
        <div className="nav-top">
          <div className="logo-section">
            <i
              className="fa fa-cube logo-icon"
              aria-hidden="true"
              onClick={toggleSidebar}></i>
            {!collapsed && (
              <div className="names">
                <span>InvenFlow</span>
                <br />
                <span>Inventory Management</span>
              </div>
            )}
          </div>
          {/* Links section */}

          <div className="nav-links">
            {!collapsed && <p className="nav-title">Navigation</p>}
            <Link to="/HomePage/dashboard">
              <i className="fas fa-home active"></i>
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link to="/HomePage/users">
              <i className="fas fa-users"></i>
              {!collapsed && <span>Users</span>}
            </Link>

            <Link to="/HomePage/products">
              <i className="fas fa-cube"></i>
              {!collapsed && <span>Products</span>}
            </Link>

            <Link to="/HomePage/categories">
              <i className="fas fa-folder-open"></i>
              {!collapsed && <span>Categories</span>}
            </Link>

            <Link to="/HomePage/brands">
              <i className="fas fa-tag"></i>
              {!collapsed && <span>Brands</span>}
            </Link>

            {/* <Link to="#"> */}
            {/* <i className="fas fa-ruler"></i> */}
            {/* {!collapsed && <span>Sizes</span>} */}
            {/* </Link> */}

            {/* <Link to="#"> */}
            {/* <i className="fas fa-chart-bar"></i> */}
            {/* {!collapsed && <span>Product Sizes</span>} */}
            {/* </Link> */}

            <Link to="/HomePage/sales">
              <i className="fas fa-cart-shopping"></i>
              {!collapsed && <span>Sales</span>}
            </Link>

            <Link to="/HomePage/expenseTypes">
              <i className="fas fa-dollar-sign"></i>
              {!collapsed && <span>Expense Types</span>}
            </Link>

            <Link to="/HomePage/expenses">
              <i className="fas fa-wallet"></i>
              {!collapsed && <span>Expenses</span>}
            </Link>

            <Link to="/HomePage/supplies">
              <i className="fas fa-truck"></i>{" "}
              {/* Use fa-truck instead of fa-truck-field */}
              {!collapsed && <span>Supplies</span>}
            </Link>
          </div>
        </div>
        {/* Settings pushed to bottom */}
        <div className="settings-link">
          <Link to="/HomePage/settings">
            <i className="fa fa-cog"></i>
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
