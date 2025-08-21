import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import LineCharts from "@/components/Recharts/LineCharts"; // Monthly Revenue & Expenses
import StockChart from "@/components/chartjs/StockChart"; // Daily Sales Trend
import BarCharts from "@/components/Recharts/BarCharts"; // Monthly Profit Analysis
import CategoryChart from "@/components/chartjs/CategoryChart"; // Stock by Category
import StockDoughnutChart from "@/components/chartjs/StockDoughnutChart"; // Payment Methods
import "@/css/dashboard.css";
import StatCard from "@/components/statCard";
// import { calculateProfit } from "@/utils/profitUtils";
import { useProfit } from "@/hooks/useProfit";

// import { useNetProfit } from "@/hooks/useNetProfit";
import { useExpenses } from "@/hooks/useExpenses";
// // to pass expenses

const Dashboard = () => {
  // Safe defaults to prevent undefined errors
  const {
    products = [],
    sales = [],
    users = [],
    expenses = [],
  } = useOutletContext();

  // Gross Profit
  const {
    displayAmount: grossProfitDisplay,
    profitLabel,
    totalProfit: grossProfit,
  } = useProfit(sales, products);

  const { total: totalExpenses } = useExpenses(expenses || []);
  const netProfit = grossProfit - totalExpenses;

  console.log("Expenses inside Dashboard:", expenses);

  // Net Profit
  // const {
  //   netProfit,
  //   displayAmount: netProfitDisplay,
  //   label: netProfitLabel,
  // } = useNetProfit(sales, products, expenses);

  const netProfitDisplay = Math.abs(netProfit).toFixed(2);
  const netProfitLabel = netProfit >= 0 ? "Net Profit" : "Net Loss";

  // ✅ Dynamic stats
  const totalProducts = products.length;
  const totalUsers = users.length;

  // Sales for the current month
  const salesThisMonth = useMemo(() => {
    const now = new Date();
    return sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate.getMonth() === now.getMonth() &&
        saleDate.getFullYear() === now.getFullYear()
      );
    });
  }, [sales]);

  // Total revenue from all sales (taking quantity into account)
  const totalRevenue = useMemo(() => {
    return sales.reduce(
      (sum, sale) => sum + Number(sale.actualPrice || 0) * (sale.quantity || 1),
      0
    );
  }, [sales]);

  // Revenue for this month
  const monthlyRevenue = useMemo(() => {
    return salesThisMonth.reduce(
      (sum, sale) => sum + Number(sale.actualPrice || 0) * (sale.quantity || 1),
      0
    );
  }, [salesThisMonth]);

  // Monthly profit = revenue - cost (taking quantity into account)
  const monthlyProfit = useMemo(() => {
    return salesThisMonth.reduce((sum, sale) => {
      const product = products.find((p) => p.id === sale.productId);
      if (!product) return sum;
      return (
        sum +
        (Number(sale.actualPrice || 0) - Number(product.costPrice || 0)) *
          (sale.quantity || 1)
      );
    }, 0);
  }, [salesThisMonth, products]);

  // Stock value = sum(costPrice * stock)
  const stockValue = useMemo(() => {
    return products.reduce(
      (sum, p) => sum + Number(p.costPrice || 0) * Number(p.stock || 0),
      0
    );
  }, [products]);

  // const { total: grossProfit } = useProfit(sales, products);
  // const { total: totalExpenses } = useExpenses(expenses || []);

  console.log("Gross Profit:", grossProfit);
  console.log("Total Expenses:", totalExpenses);
  console.log("Net Profit:", grossProfit - totalExpenses);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">
        Complete overview of your business operations
      </p>

      {/* === TOP STATS CARDS === */}
      <div className="stats-grid">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon="fa-cube"
          percentage="+12%"
          color="#60a5fa"
          percentageColor="#10b981"
        />

        <StatCard
          title="Total Users"
          value={totalUsers}
          icon="fa-user"
          percentage="+3%"
          color="#4ade80"
          percentageColor="#10b981"
        />
        {/* <StatCard
          title="Total Sales"
          value={salesThisMonth.length}
          icon="fa-shopping-cart"
          percentage="+3%"
          color="#c084fc"
          percentageColor="#10b981"
        /> */}
        <StatCard
          title="Total Sales"
          value={sales.length}
          icon="fa-shopping-cart"
          percentage="+3%"
          color="#c084fc"
          percentageColor="#10b981"
        />
        <StatCard
          title="Total Revenue"
          value={totalRevenue}
          currency="RWF "
          icon="fa-line-chart"
          percentage="+3%"
          color="#fb923c"
          percentageColor="#10b981"
        />
        <StatCard
          title="Monthly Profit"
          value={monthlyProfit}
          currency="RWF "
          icon="fa-dollar-sign"
          percentage="+3%"
          color="#34d399"
          percentageColor="#10b981"
        />
        <StatCard
          title="Stock Value"
          value={stockValue}
          currency="RWF "
          icon="fa-warehouse"
          percentage="+3%"
          color="#818cf8"
          percentageColor="#10b981"
        />
        <StatCard
          title={profitLabel}
          value={grossProfitDisplay}
          currency="RWF "
          icon="fa-dollar-sign"
          color="#34d399"
        />
        {/* ✅ Net Profit Card */}
        <StatCard
          title={netProfitLabel} // "Net Profit" or "Net Loss"
          value={netProfitDisplay} // already formatted string
          currency="RWF "
          icon="fa-money-bill-wave"
          color={netProfit >= 0 ? "#34d399" : "#f87171"} // green if profit, red if loss
        />
      </div>

      {/* === CHARTS GRID === */}
      <div className="charts-grid">
        <div className="chart-card wide">
          <LineCharts /> {/* Monthly Revenue & Expenses */}
        </div>
        <div className="chart-card">
          <StockChart /> {/* Daily Sales Trend */}
        </div>
        {/* Uncomment if you want Monthly Profit chart */}
        {/* <div className="chart-card">
          <BarCharts /> Monthly Profit Analysis
        </div> */}
        <div className="chart-card">
          <CategoryChart /> {/* Stock by Category */}
        </div>
        <div className="chart-card">
          {/* Placeholder for Expense Categories Breakdown */}
          <p>Expense Categories Breakdown (to be implemented)</p>
        </div>
        <div className="chart-card">
          <StockDoughnutChart /> {/* Payment Methods */}
        </div>
      </div>

      {/* === RECENT SALES & LOW STOCK === */}
      <div className="bottom-grid">
        <div className="list-card">
          {/* Placeholder for Recent Sales */}
          <p>Recent Sales (to be implemented)</p>
        </div>
        <div className="list-card">
          {/* Placeholder for Low Stock Alerts */}
          <p>Low Stock Alerts (to be implemented)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
