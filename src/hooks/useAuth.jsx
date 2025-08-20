import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define inline if no TypeScript
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === "admin" && password === "admin123") {
      const authUser = { id: 1, name: "Admin User", username, role: "ADMIN" };
      setUser(authUser);
      localStorage.setItem("auth-user", JSON.stringify(authUser));
      toast.success("Successfully logged in!");
    } else if (username === "staff" && password === "staff123") {
      const authUser = { id: 2, name: "Staff Member", username, role: "STAFF" };
      setUser(authUser);
      localStorage.setItem("auth-user", JSON.stringify(authUser));
      toast.success("Successfully logged in!");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
