import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center border-b border-gray-100">
      
      <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
        Cura<span className="text-slate-800">Jit</span>
      </Link>

      <div className="flex items-center space-x-8">
        <Link to="/" className={`text-sm font-bold transition-colors ${location.pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
          Home
        </Link>

        <Link to="/doctors" className={`text-sm font-bold transition-colors ${location.pathname === "/doctors" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
          Doctors
        </Link>

        <Link 
          to="/#about" 
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          About
        </Link>

        {user && (
          <Link to="/dashboard" className={`text-sm font-bold transition-colors ${location.pathname === "/dashboard" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
            Dashboard
          </Link>
        )}

        {user ? (
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              {user.name?.[0]}
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition shadow-lg shadow-slate-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
