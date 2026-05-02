import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin-login");
        return;
      }

      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // Fetch Stats
      const statsRes = await fetch("http://localhost:5000/api/admin/stats", { headers });
      if (statsRes.ok) setStats(await statsRes.json());

      // Fetch Doctors
      const docsRes = await fetch("http://localhost:5000/api/admin/doctors", { headers });
      if (docsRes.ok) setDoctors(await docsRes.json());

      // Fetch Users
      const usersRes = await fetch("http://localhost:5000/api/admin/users", { headers });
      if (usersRes.ok) setUsers(await usersRes.json());

    } catch (err) {
      setError("Failed to load dashboard data. Ensure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/admin-login");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-teal-600 font-bold text-xl">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Admin Portal</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'overview' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab("doctors")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'doctors' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            Manage Doctors
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'users' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            Manage Patients
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold transition-all">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight capitalize">
              {activeTab.replace("-", " ")}
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage your platform and view statistics.</p>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold">
            {error}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 font-semibold text-sm">Total Patients</p>
                <h3 className="text-3xl font-extrabold text-slate-800">{stats.patients}</h3>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 font-semibold text-sm">Total Doctors</p>
                <h3 className="text-3xl font-extrabold text-slate-800">{stats.doctors}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 font-semibold text-sm">Appointments</p>
                <h3 className="text-3xl font-extrabold text-slate-800">{stats.appointments}</h3>
              </div>
            </div>
          </div>
        )}

        {/* DOCTORS TAB */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-5 font-bold">Name</th>
                    <th className="p-5 font-bold">Specialization</th>
                    <th className="p-5 font-bold">Location</th>
                    <th className="p-5 font-bold">Experience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {doctors.length === 0 ? (
                    <tr><td colSpan="4" className="p-5 text-center text-slate-400">No doctors registered yet.</td></tr>
                  ) : (
                    doctors.map((doc, idx) => (
                      <tr key={doc._id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 font-semibold text-slate-900">{doc.name}</td>
                        <td className="p-5">{doc.specialization}</td>
                        <td className="p-5">{doc.location}</td>
                        <td className="p-5">{doc.experience} years</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-5 font-bold">Name</th>
                    <th className="p-5 font-bold">Email</th>
                    <th className="p-5 font-bold">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {users.length === 0 ? (
                    <tr><td colSpan="3" className="p-5 text-center text-slate-400">No patients registered yet.</td></tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user._id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 font-semibold text-slate-900">{user.name}</td>
                        <td className="p-5">{user.email}</td>
                        <td className="p-5 capitalize">
                          <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold">{user.role}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
