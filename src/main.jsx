import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeProvider from "./context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/hooks/useAuth"; // ✅ Import the AuthProvider
import { SidebarProvider } from "./components/ui/sidebar";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <ThemeProvider>
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           <SidebarProvider>
//             <App />
//           </SidebarProvider>
//         </AuthProvider>
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </ThemeProvider>
//   </BrowserRouter>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
