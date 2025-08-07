import React, { useState } from "react";
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
            <a href="#">
              <i className="fas fa-home active"></i>
              {!collapsed && <span>Dashboard</span>}
            </a>

            <a href="#">
              <i className="fas fa-users"></i>
              {!collapsed && <span>Users</span>}
            </a>

            <a href="#">
              <i className="fas fa-cube"></i>
              {!collapsed && <span>Products</span>}
            </a>

            <a href="#">
              <i className="fas fa-folder-open"></i>
              {!collapsed && <span>Categories</span>}
            </a>

            <a href="#">
              <i className="fas fa-tag"></i>
              {!collapsed && <span>Brands</span>}
            </a>

            <a href="#">
              <i className="fas fa-ruler"></i>
              {!collapsed && <span>Sizes</span>}
            </a>

            <a href="#">
              <i className="fas fa-chart-bar"></i>
              {!collapsed && <span>Product Sizes</span>}
            </a>

            <a href="#">
              <i className="fas fa-cart-shopping"></i>
              {!collapsed && <span>Sales</span>}
            </a>

            <a href="#">
              <i className="fas fa-dollar-sign"></i>
              {!collapsed && <span>Expense Types</span>}
            </a>

            <a href="#">
              <i className="fas fa-wallet"></i>
              {!collapsed && <span>Expenses</span>}
            </a>

            <a href="#">
              <i className="fas fa-truck"></i>{" "}
              {/* Use fa-truck instead of fa-truck-field */}
              {!collapsed && <span>Supplies</span>}
            </a>
          </div>
        </div>
        {/* Settings pushed to bottom */}
        <div className="settings-link">
          <a href="#">
            <i className="fa fa-cog"></i>
            {!collapsed && <span>Settings</span>}
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
