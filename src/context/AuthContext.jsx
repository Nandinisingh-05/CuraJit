import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || "Login failed" };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  const register = async (name, email, password, role = "patient") => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message || data.error || "Registration failed" };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  const registerDoctor = async (doctorData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData)
      });
      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message || data.error || "Registration failed" };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, registerDoctor, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
