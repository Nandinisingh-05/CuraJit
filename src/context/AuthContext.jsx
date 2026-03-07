import { useState } from "react";
import { AuthContext } from "./auth-context";

function getStoredUser() {
  const rawUser = localStorage.getItem("currentUser");
  return rawUser ? JSON.parse(rawUser) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = { id: Date.now(), name, email, password };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
