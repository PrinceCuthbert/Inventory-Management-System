// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Product/Products";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/brands";
import Sales from "./pages/Sales";
import ExpenseTypes from "./pages/ExpenseTypes";
import Expenses from "./pages/Expenses";
import "./App.css";
import {QueryProvider} from "@/utils/QueryClientSetup.jsx";
import AddProduct from "@/pages/Product/AddProduct";

function App() {
  return (
      <QueryProvider>
          <Routes>
              {/* Redirect root `/` to `/HomePage` */}
              <Route path="/" element={<Navigate to="/HomePage" />} />

              {/* Layout route */}
              <Route path="/HomePage" element={<HomePage />}>
                  {/* Default page in Outlet */}
                  <Route path="dashboard" element={<Dashboard />} />

                  {/* This will render inside <Outlet /> */}
                  <Route path="users" element={<Users />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="brands" element={<Brands />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="expenseTypes" element={<ExpenseTypes />} />
                  <Route path="expenses" element={<Expenses />} />
              </Route>
          </Routes>
      </QueryProvider>

  );
}

export default App;
