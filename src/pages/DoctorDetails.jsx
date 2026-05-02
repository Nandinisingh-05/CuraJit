import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../data/doctors";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((doc) => doc.id === Number(id));

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setBookings(stored);
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-xl mx-auto mt-20 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Doctor Not Found</h1>
          <p className="text-slate-600 mb-8">We couldn't find the specialist you're looking for.</p>
          <button onClick={() => navigate("/doctors")} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Return to Doctors</button>
        </div>
      </div>
    );
  }

  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const isSlotBooked = (time) => {
    return bookings.some(
      (b) => b.doctorId === doctor.id && b.date === selectedDate && b.time === time
    );
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time slot.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDate,
      time: selectedTime,
    };

    const updatedBookings = [...bookings, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedBookings));
    
    // Redirect to dashboard with success state could be better, but alert for now
    alert("Appointment confirmed! Redirecting to your dashboard.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <Navbar />

      {/* Hero Header Background */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 h-64 w-full"></div>

      <div className="max-w-6xl mx-auto px-6 -mt-32">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left Column: Doctor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 sticky top-28">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white transition-all group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Verified Expert
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">{doctor.name}</h1>
                <p className="text-blue-600 font-bold text-lg mb-6">{doctor.specialization}</p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Experience</p>
                    <p className="text-slate-900 font-bold">{doctor.experience}+ Years</p>
                  </div>
                  <div className="text-center border-l border-slate-100">
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Consultation</p>
                    <p className="text-slate-900 font-bold">₹{doctor.fees || "500"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Professional Summary */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </span>
                Professional Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {doctor.name} is a highly regarded {doctor.specialization.toLowerCase()} known for exceptional clinical judgment and a patient-centric approach. With over {doctor.experience} years of experience in leading medical institutions, they specialize in complex diagnostic procedures and personalized treatment plans tailored to individual needs.
              </p>
            </div>

            {/* Booking Interface */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-40"></div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 relative z-10 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </span>
                Select Your Schedule
              </h2>

              {/* Enhanced Date Picker */}
              <div className="mb-10 relative z-10">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 block">1. Choose Date</label>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {dates.map((d) => {
                    const dateStr = d.toISOString().split("T")[0];
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime("");
                        }}
                        className={`flex flex-col items-center min-w-[85px] py-4 rounded-2xl transition-all duration-300 border-2
                          ${isSelected 
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                            : "bg-slate-50 border-transparent text-slate-600 hover:border-blue-200"}`}
                      >
                        <span className={`text-[10px] font-bold uppercase mb-1 ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                          {d.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-xl font-black">{d.getDate()}</span>
                        <span className={`text-[10px] font-bold ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                          {d.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Time Slots */}
              {selectedDate && (
                <div className="mb-10 animate-fadeInUp">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 block">2. Select Time Slot</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((time) => {
                      const booked = isSlotBooked(time);
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          disabled={booked}
                          onClick={() => setSelectedTime(time)}
                          className={`py-4 rounded-xl font-bold transition-all duration-300 border-2 text-sm
                            ${booked
                              ? "bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed opacity-50"
                              : isSelected
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                              : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Booking Summary & Action */}
              <div className={`mt-12 p-8 rounded-3xl transition-all duration-500 border-2 
                ${selectedTime ? "bg-slate-900 border-slate-900 text-white translate-y-0 opacity-100" : "bg-slate-50 border-slate-100 text-slate-400 translate-y-4 opacity-50"}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Booking Summary</h4>
                    {selectedDate && selectedTime ? (
                      <p className="text-xl font-bold">
                        {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                      </p>
                    ) : (
                      <p className="text-xl font-bold">Please select a schedule</p>
                    )}
                  </div>
                  <button
                    disabled={!selectedTime}
                    onClick={handleBooking}
                    className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300
                      ${selectedTime 
                        ? "bg-blue-500 text-white hover:bg-blue-400 shadow-xl shadow-blue-500/20 active:scale-95" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>

            </div>

            {/* Safety Guidelines */}
            <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100 flex gap-6 items-start">
               <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <div>
                  <h4 className="font-bold text-amber-900 mb-1">Safety Guidelines</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Please arrive 15 minutes prior to your scheduled appointment. All consultation data is encrypted and handled with the highest medical confidentiality standards.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
