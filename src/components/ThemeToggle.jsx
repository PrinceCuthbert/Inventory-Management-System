import React, { useEffect, useState } from "react";
import "../css/Theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = ""; // clear existing classes
    document.body.classList.add(theme); // apply new class
    localStorage.setItem("theme", theme); // save in localStorage
  }, [theme]); // ✅ fix here

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // <button onClick={toggleTheme} className="theme-toggle-btn">
    //   {theme === "light" ? (
    //     <i className="fa fa-moon-o" aria-hidden="true"></i>
    //   ) : (
    //     <i className="fa fa-sun-o" aria-hidden="true"></i>
    //   )}
    // </button>
    // <button onClick={toggleTheme}>{theme === "light" ? "🌙 " : "☀️ "}</button>
    <button onClick={toggleTheme}>{theme === "light" ? "⏾ " : "☀︎ "}</button>
  );
};

export default ThemeToggle;
