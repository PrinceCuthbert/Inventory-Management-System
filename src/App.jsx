// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      {/* Redirect root `/` to `/HomePage` */}
      <Route path="/" element={<Navigate to="/HomePage" />} />

      {/* Layout route */}
      <Route path="/HomePage" element={<HomePage />}>
        {/* Default page in Outlet */}
        <Route index element={<h2>Welcome Dashboard</h2>} />

        {/* This will render inside <Outlet /> */}
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
