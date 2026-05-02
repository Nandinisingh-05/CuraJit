import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay for smooth UI transition and spinner visibility
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password);
    setIsLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800 relative overflow-hidden bg-rose-50 font-sans selection:bg-rose-200">
      
      {/* Pastel Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-300/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse z-0" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-yellow-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse z-0" style={{ animationDelay: '3s' }}></div>

      {/* Center Section: Single Login Card */}
      <div className="w-full flex items-center justify-center relative z-10 p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 animate-fadeIn">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-300 to-purple-400 flex items-center justify-center shadow-lg shadow-pink-200 mb-5 transform hover:scale-105 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-800">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-medium text-sm">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-pink-500 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all placeholder-slate-400 shadow-sm" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-pink-500 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-2xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all placeholder-slate-400 shadow-sm" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-pink-500 transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password & Error Msg */}
            <div className="flex items-center justify-between mt-2">
              <div className="text-red-500 text-xs font-medium h-4">
                {error && <span className="animate-pulse">{error}</span>}
              </div>
              <a href="#" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 hover:from-pink-500 hover:via-rose-500 hover:to-orange-400 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-4 text-slate-400 text-xs font-bold tracking-wider">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl transition-all hover:border-slate-300 group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-slate-600 transition-colors">Google</span>
            </button>
            <button className="flex items-center justify-center py-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl transition-all hover:border-slate-300 group">
              <svg className="w-5 h-5 mr-2 text-[#333] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-sm font-semibold text-slate-600 transition-colors">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:text-pink-600 font-bold transition-colors hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
