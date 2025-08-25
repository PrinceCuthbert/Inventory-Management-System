// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import "./settings.css";

import { Select } from "antd";
import "antd/dist/reset.css";

// const { Option } = Select;

// export default function Settings() {
//   // Load saved settings or defaults
//   const [language, setLanguage] = useState(
//     localStorage.getItem("language") || "English"
//   );
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");

//   const user = {
//     name: "Admin User",
//     username: "admin",
//     role: "ADMIN",
//   };

//   // Save language whenever it changes
//   useEffect(() => {
//     localStorage.setItem("language", language);
//   }, [language]);

//   // Apply theme dynamically like ThemeToggle
//   useEffect(() => {
//     // Remove existing theme classes
//     document.body.classList.remove("light", "dark");
//     // Apply new theme class
//     document.body.classList.add(theme.toLowerCase());
//     // Persist theme
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleLogout = () => {
//     console.log("Logged out!");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="settings-page">
//       <h2>Settings</h2>
//       <p className="subtitle">General Settings</p>

//       <section className="setting-section">
//         <h3>Language</h3>
//         <p>Choose your preferred language</p>
//         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//           <option>English</option>
//           <option>Kinyarwanda</option>
//         </select>
//       </section>

//       <section className="setting-section">
//         <h3>Theme</h3>
//         <p>Select Light or Dark mode</p>
//         <select value={theme} onChange={(e) => setTheme(e.target.value)}>
//           <option>Light</option>
//           <option>Dark</option>
//         </select>
//       </section>

//       <section className="setting-section">
//         <h3>Account</h3>
//         <p>Manage your account settings</p>
//         <p>
//           <strong>Name:</strong> {user.name}
//         </p>
//         <p>
//           <strong>Username:</strong> {user.username}
//         </p>
//         <p>
//           <strong>Role:</strong> {user.role}
//         </p>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </section>
//     </div>
//   );
// }

const { Option } = Select;

export default function Settings() {
  // Load saved settings or defaults
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");

  const user = {
    name: "Admin User",
    username: "admin",
    role: "ADMIN",
  };

  // Save language whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Apply theme dynamically like ThemeToggle
  useEffect(() => {
    // Remove existing theme classes
    document.body.classList.remove("light", "dark");
    // Apply new theme class
    document.body.classList.add(theme.toLowerCase());
    // Persist theme
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    console.log("Logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p className="subtitle">General Settings</p>

      <section className="setting-section">
        <h3>Language</h3>
        <p>Choose your preferred language</p>
        <Select
          value={language}
          onChange={(value) => setLanguage(value)}
          style={{ width: 200 }}>
          <Option value="English">English</Option>
          <Option value="Kinyarwanda">Kinyarwanda</Option>
        </Select>
      </section>

      <section className="setting-section">
        <h3>Theme</h3>
        <p>Select Light or Dark mode</p>
        <Select
          value={theme}
          onChange={(value) => setTheme(value)}
          style={{ width: 200 }}>
          <Option value="Light">Light</Option>
          <Option value="Dark">Dark</Option>
        </Select>
      </section>

      <section className="setting-section account-settings">
        <h3>Account</h3>
        <p>Manage your account settings</p>
        <p>
          <strong style={{ color: "#ffff" }}>Name:</strong> {user.name}
        </p>
        <p>
          <strong style={{ color: "#ffff" }}>Username:</strong> {user.username}
        </p>
        <p>
          <strong style={{ color: "#ffff" }}>Role:</strong> {user.role}
        </p>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          Logout
        </button>
      </section>
    </div>
  );
}
