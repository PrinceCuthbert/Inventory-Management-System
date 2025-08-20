import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import "../css/header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Header({ toggleSidebar, isSidebarCollapsed }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverColor, setHoverColor] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // for detecting outside clicks

  const toggleDropdown = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const colorVar = computedStyle.getPropertyValue("--btn-hover-bg").trim();
    setHoverColor(colorVar);
  }, [isHovered]);

  // 🔐 Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="layout">
      <div className="main-area">
        <header className="topbar">
          <div className="header-links">
            <button
              style={{ background: "none", border: "none" }}
              onClick={toggleSidebar}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <i
                className="fa fa-cube"
                aria-hidden="true"
                style={{
                  fontSize: "1.5rem",
                  color: isHovered ? hoverColor : "inherit",
                  transition: "transform 0.7s ease, color 0.3s ease",
                  transform: isSidebarCollapsed
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}></i>
            </button>
            <p className="brand">Welcome to InvenFlow</p>
          </div>

          {/* Desktop header-right */}
          <div className="header-right desktop-only">
            <i className="fa fa-language" aria-hidden="true"></i>
            <ThemeToggle />
            <i className="fa fa-sign-in" aria-hidden="true"></i>
          </div>

          {/* Hamburger toggle for mobile */}
          <div className="mobile-only">
            <button
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-label="Toggle Menu">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            {menuOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                {/* // 👈 reference to detect outside clicks */}
                <i className="fa fa-language" aria-hidden="true"></i>
                <ThemeToggle />
                <i className="fa fa-sign-in" aria-hidden="true"></i>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
