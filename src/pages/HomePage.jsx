import Header from "../pages/Header";
import Sidebar from "../components/Sidebar"; // your actual sidebar
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // 👈 TO Allow content to render in page-content
import "../css/homepage.css";

function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Lifted up stated to be able to pass them in ChartJS
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products") || "[]")
  );
  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem("sales") || "[]")
  );

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses") || "[]")
  );

  const [expenseTypes, setExpenseTypes] = useState(
    JSON.parse(localStorage.getItem("expenseTypes") || "[]")
  );

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };
  return (
    <div className="homepage-layout">
      <Sidebar
        collapsed={isSidebarCollapsed}
        visible={isSidebarVisible}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-content">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <div className="page-content">
          {/* <h2>Main content goes here</h2> */}
          <Outlet
            context={{
              products,
              setProducts,
              sales,
              setSales,
              users,
              setUsers,
              expenses,
              setExpenses,
              expenseTypes,
              setExpenseTypes,
            }}
          />
          {/* 👈 This is where each page will load */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
