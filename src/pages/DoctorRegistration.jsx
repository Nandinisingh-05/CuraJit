import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DoctorRegistration() {
  const { registerDoctor } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    location: "",
    experience: ""
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await registerDoctor(formData);
    
    setIsLoading(false);
    
    if (result.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
    } else {
        setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 p-6 font-sans">
      <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* INFO PANEL */}
        <div className="md:w-5/12 bg-gradient-to-br from-teal-500 to-teal-700 text-white p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight relative z-10">Join CuraJit</h1>
            <p className="text-teal-50 mb-8 relative z-10 leading-relaxed">
              Expand your practice and reach more patients. CuraJit provides you with the tools to manage appointments and access medical records securely.
            </p>
            <div className="mt-auto relative z-10">
              <p className="text-sm text-teal-100">Already part of our network?</p>
              <Link to="/login" className="inline-block mt-2 border-2 border-white rounded-full px-8 py-2 hover:bg-white hover:text-teal-700 transition-colors font-bold tracking-wide">
                Sign In
              </Link>
            </div>
        </div>

        {/* REGISTRATION FORM */}
        <div className="md:w-7/12 p-10 md:p-12">
          <h2 className="text-3xl font-extrabold text-teal-800 mb-2">Doctor Registration</h2>
          <p className="text-slate-500 mb-8 font-medium">Please fill in your professional details.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Specialization</label>
                <input type="text" name="specialization" placeholder="e.g. Cardiologist" value={formData.specialization} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Experience (Years)</label>
                <input type="number" name="experience" min="0" placeholder="e.g. 5" value={formData.experience} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 ml-1">Location / Clinic Address</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 bg-slate-50 transition-all text-slate-800" required />
            </div>
            
            <div className="h-4">
                {error && <span className="text-red-500 text-xs font-bold animate-pulse">{error}</span>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 active:scale-[0.98] mt-2 flex items-center justify-center">
              {isLoading ? "Submitting..." : "Apply as Doctor"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
