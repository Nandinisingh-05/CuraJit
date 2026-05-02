import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
        if(result.user.role === 'admin') {
             navigate("/admin-dashboard");
        } else {
             setError("Access denied. You are not an administrator.");
        }
    } else {
        setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 font-sans">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900 to-slate-900"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/20">
          
        <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-900 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white">
              Admin Portal
            </h1>
            <p className="text-slate-300 font-medium text-sm">Restricted access area.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-300 ml-1">Admin Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 bg-slate-800/50 text-white transition-all placeholder-slate-500" placeholder="admin@curajit.com" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-300 ml-1">Admin Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 bg-slate-800/50 text-white transition-all placeholder-slate-500" placeholder="••••••••" required />
            </div>
            
            <div className="h-4 mt-2">
                {error && <span className="text-red-400 text-xs font-bold animate-pulse">{error}</span>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-2xl hover:bg-teal-500 transition-all shadow-lg shadow-teal-900 active:scale-[0.98] mt-4 flex items-center justify-center">
              {isLoading ? "Authenticating..." : "Login"}
            </button>
        </form>

        <div className="mt-8 text-center text-sm">
            <Link to="/login" className="text-slate-400 hover:text-white transition-colors font-medium">Return to User Login</Link>
        </div>

      </div>
    </div>
  );
}
