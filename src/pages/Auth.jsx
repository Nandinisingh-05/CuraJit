import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Register States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [isRegLoading, setIsRegLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    const result = await login(loginEmail, loginPassword);
    setIsLoading(false);
    
    if (result.success) {
        if(result.user.role === 'admin') {
             navigate("/admin-dashboard");
        } else {
             navigate("/dashboard");
        }
    } else {
        setLoginError(result.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError("");
    setIsRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setIsRegLoading(false);
    
    if (result.success) {
        alert("Registration successful! Please sign in.");
        setIsLogin(true); // Switch to login view
        setRegName("");
        setRegEmail("");
        setRegPassword("");
    } else {
        setRegError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 font-sans overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      
      <div className="relative w-full max-w-[1000px] h-[680px] bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden flex border border-slate-100 z-10">
        
        {/* SIGN IN FORM (Left Side) */}
        <div className={`absolute top-0 left-0 w-1/2 h-full bg-white p-16 transition-all duration-700 ease-in-out flex flex-col justify-center ${isLogin ? 'translate-x-0 opacity-100 z-20' : 'translate-x-[20%] opacity-0 z-10 pointer-events-none'}`}>
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Access your personalized healthcare portal</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="nandini@curajit.com" 
                value={loginEmail} 
                onChange={(e)=>setLoginEmail(e.target.value)} 
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all text-slate-800 font-bold placeholder:text-slate-300" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={loginPassword} 
                onChange={(e)=>setLoginPassword(e.target.value)} 
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all text-slate-800 font-bold placeholder:text-slate-300" 
                required 
              />
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-red-500 text-xs font-bold min-h-[1rem]">
                {loginError && <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>{loginError}</span>}
              </div>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-black uppercase tracking-wider transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] mt-6 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Authorizing...
                </>
              ) : "Sign In"}
            </button>
          </form>

          <div className="mt-12 text-center flex flex-col space-y-4">
            <Link to="/doctor-register" className="text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Register as a Specialist</Link>
            <Link to="/admin-login" className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em] hover:text-slate-500 transition-colors">Admin Access</Link>
          </div>
        </div>

        {/* SIGN UP FORM (Right Side) */}
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-white p-16 transition-all duration-700 ease-in-out flex flex-col justify-center ${isLogin ? 'translate-x-[20%] opacity-0 z-10 pointer-events-none' : 'translate-x-0 opacity-100 z-20'}`}>
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Join CuraJit</h2>
            <p className="text-slate-500 font-medium">Start your journey to smarter healthcare</p>
          </div>
          
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" placeholder="John Doe" value={regName} onChange={(e)=>setRegName(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all text-slate-800 font-bold placeholder:text-slate-300" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" placeholder="name@example.com" value={regEmail} onChange={(e)=>setRegEmail(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all text-slate-800 font-bold placeholder:text-slate-300" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
              <input type="password" placeholder="••••••••" value={regPassword} onChange={(e)=>setRegPassword(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-slate-50/50 transition-all text-slate-800 font-bold placeholder:text-slate-300" required />
            </div>
            
            <div className="min-h-[1rem]">
                <span className="text-red-500 text-xs font-bold">{regError}</span>
            </div>

            <button 
              type="submit" 
              disabled={isRegLoading} 
              className="w-full bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isRegLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/doctor-register" className="text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Apply as a Medical Professional</Link>
          </div>
        </div>

        {/* OVERLAY PANEL */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-br from-blue-600 to-indigo-800 transition-transform duration-700 ease-in-out z-50 text-white shadow-2xl ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-16 text-center">
                {/* Decorative mesh background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-6xl font-black mb-8 tracking-tighter">CuraJit</h1>
                    <h2 className="text-2xl font-bold mb-4">{isLogin ? "First time here?" : "One of us?"}</h2>
                    <p className="mb-12 text-blue-100 font-medium leading-relaxed max-w-xs opacity-90">
                      {isLogin 
                        ? "Join thousands of patients who trust CuraJit for their daily healthcare management." 
                        : "Welcome back! Sign in to continue managing your health with our expert tools."}
                    </p>
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="group relative inline-flex items-center justify-center px-12 py-4 font-black text-xs uppercase tracking-[0.3em] text-white border-2 border-white/30 rounded-full overflow-hidden transition-all hover:border-white"
                    >
                      <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative group-hover:text-blue-700">{isLogin ? "Create Account" : "Sign In Now"}</span>
                    </button>
                </div>
                
                {/* Branding footer */}
                <div className="absolute bottom-8 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
                   Smarter Healthcare
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
