import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  FaUser,
  FaTint,
  FaExclamationCircle,
  FaPhoneAlt,
  FaHistory,
  FaPills,
  FaFileMedical,
  FaMicroscope,
  FaUserMd,
  FaPlus,
  FaDownload,
  FaCalendarCheck,
  FaClock
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function MedicalHistory() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Dummy data for demo
  const [medicalRecords] = useState({
    patientInfo: {
      bloodGroup: "O+",
      allergies: ["Peanuts", "Penicillin"],
      emergencyContact: {
        name: "Rahul Singh",
        relation: "Brother",
        phone: "+91 98765 43210"
      }
    },
    appointments: [], // Empty state demo
    medications: [
      { name: "Metformin", dosage: "500mg", duration: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", duration: "Once daily" }
    ],
    testReports: [
      { name: "Blood Glucose Test", date: "2024-03-15" },
      { name: "Liver Function Test", date: "2024-02-10" }
    ],
    diagnoses: ["Type 2 Diabetes", "Hypertension"],
    doctorsConsulted: [
      { name: "Dr. Rajesh Sharma", specialty: "Cardiologist" },
      { name: "Dr. Priya Verma", specialty: "General Physician" }
    ]
  });

  const sidebarItems = [
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row font-['Inter',sans-serif]">
      <Sidebar activePage="medical-history" />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <Navbar variant="dashboard" />

        <div className="p-8 md:p-12 pt-28 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-12 flex justify-between items-center margin-top:80px">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight ">Medical History</h1>
              <p className="text-slate-500 font-medium mt-1">Manage and track your long-term health records.</p>
            </div>
            <button className="flex items-center gap-3 bg-teal-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-95">
              <FaPlus /> Add Record
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Patient Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <FaUser className="text-teal-500" /> Patient Profile
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blood Group</p>
                  <div className="flex items-center gap-2 text-red-500 font-bold">
                    <FaTint /> {medicalRecords.patientInfo.bloodGroup}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</p>
                  <p className="font-bold text-slate-700">28 Yrs / Male</p>
                </div>
                <div className="col-span-2 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Allergies</p>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecords.patientInfo.allergies.map(allergy => (
                      <span key={allergy} className="px-3 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-full border border-red-100 flex items-center gap-1.5">
                        <FaExclamationCircle /> {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-1 pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Emergency Contact</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{medicalRecords.patientInfo.emergencyContact.name}</p>
                      <p className="text-xs text-slate-400">{medicalRecords.patientInfo.emergencyContact.relation}</p>
                    </div>
                    <a href={`tel:${medicalRecords.patientInfo.emergencyContact.phone}`} className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                      <FaPhoneAlt fontSize="small" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 6. Doctors Consulted (Moved up for layout balance) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <FaUserMd className="text-teal-500" /> Consulted Doctors
              </h2>
              <div className="space-y-4">
                {medicalRecords.doctorsConsulted.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-50 group hover:border-teal-100 hover:bg-white transition-all">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-500 font-bold group-hover:bg-teal-600 group-hover:text-white transition-all">
                      {doc.name.split(' ')[1].charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{doc.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Past Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm lg:col-span-2"
            >
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <FaHistory className="text-teal-500" /> Past Appointments
              </h2>
              {medicalRecords.appointments.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                    <FaCalendarCheck className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">No appointments recorded yet</p>
                    <p className="text-slate-400 text-sm font-medium">Your medical journey will appear here.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Map through appointments if any */}
                </div>
              )}
            </motion.div>

            {/* 3. Medications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <FaPills className="text-teal-500" /> Current Medications
              </h2>
              <div className="space-y-4">
                {medicalRecords.medications.map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/30 border border-teal-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-sm">
                        <FaPills />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{med.name}</p>
                        <p className="text-xs text-slate-500">{med.dosage} • {med.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Diagnoses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <FaFileMedical className="text-teal-500" /> Diagnoses & Conditions
              </h2>
              <div className="flex flex-wrap gap-3">
                {medicalRecords.diagnoses.map((cond, i) => (
                  <div key={i} className="px-5 py-3 bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-100 flex items-center gap-3 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-100 transition-all cursor-default">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    {cond}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Test Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm lg:col-span-2"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <FaMicroscope className="text-teal-500" /> Laboratory Reports
                </h2>
                <span className="text-xs font-bold text-slate-400 border border-slate-100 px-3 py-1 rounded-full bg-slate-50">
                  Total: {medicalRecords.testReports.length}
                </span>
              </div>

              {medicalRecords.testReports.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No reports available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicalRecords.testReports.map((report, i) => (
                    <div key={i} className="p-6 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-between group hover:border-teal-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-teal-600 group-hover:text-white transition-all">
                          <FaFileMedical />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{report.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-teal-600 transition-all shadow-md group-hover:scale-105">
                        <FaDownload size={10} /> View / Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
