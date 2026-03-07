import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔥 Doctors scroll function
  const handleDoctorsClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("doctors")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("doctors")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      <div className="text-2xl font-bold text-blue-600">
        Cura<span className="text-gray-800">Jit</span>
      </div>

      <div className="flex items-center space-x-4">

        {user && (
          <>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            {/* 🔥 Doctors Button */}
            <button
              onClick={handleDoctorsClick}
              className="text-gray-700 hover:text-blue-600"
            >
              Doctors
            </button>

            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </a>

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
           <button
           onClick={handleDoctorsClick}
           className="text-gray-700 hover:text-blue-600"
           >
           Doctors
          </button>

            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </a>

            <Link
              to="/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
