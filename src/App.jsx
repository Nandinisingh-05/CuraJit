import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DoctorDetails from "./pages/DoctorDetails";
import Auth from "./pages/Auth";
import DoctorRegistration from "./pages/DoctorRegistration";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Doctors from "./pages/Doctors";


import { AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AdminProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/doctor-register" element={<DoctorRegistration />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctors />} />


      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
