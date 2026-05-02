import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import DoctorCard from "../components/doctorcard";
import { doctors } from "../data/doctors";

const specializations = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Gynecologist",
  "Orthopedic"
];

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const spec = params.get("spec");

    if (search) setSearchQuery(search);
    if (spec) setSelectedSpecialization(spec);
  }, []);

  useEffect(() => {
    let result = doctors;

    if (searchQuery) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecialization !== "All") {
      // Map specialization names if needed (e.g., Cardiology -> Cardiologist)
      const mappedSpec = selectedSpecialization.endsWith('y') ? selectedSpecialization.replace(/y$/, 'ist') : selectedSpecialization;
      
      result = result.filter((doc) => 
        doc.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(mappedSpec.toLowerCase())
      );
    }

    setFilteredDoctors(result);
  }, [searchQuery, selectedSpecialization]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Find Your Specialist
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Search for top-rated doctors across various specialties and book your appointment instantly.
          </p>

          {/* Search & Filter Container */}
          <div className="max-w-4xl mx-auto bg-white p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or specialization..."
                className="w-full pl-14 pr-6 py-4 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative min-w-[200px]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 rounded-[2rem] text-slate-700 font-bold hover:bg-slate-100 transition-all border-none outline-none"
              >
                <span>{selectedSpecialization}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fadeInUp">
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      className={`w-full text-left px-6 py-3 hover:bg-blue-50 transition-colors text-sm font-semibold ${selectedSpecialization === spec ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
                      onClick={() => {
                        setSelectedSpecialization(spec);
                        setIsMenuOpen(false);
                      }}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] shadow-sm border border-white/60">
          <div className="flex items-center justify-between mb-10 px-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {selectedSpecialization === "All" ? "All Doctors" : `${selectedSpecialization} Specialists`}
              <span className="ml-3 text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                {filteredDoctors.length} Result{filteredDoctors.length !== 1 && 's'}
              </span>
            </h2>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No doctors found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {setSearchQuery(""); setSelectedSpecialization("All")}}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
