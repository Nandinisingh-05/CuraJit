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

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setBookings(stored);
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <h1 className="text-center mt-10 text-2xl font-semibold">
          Doctor Not Found
        </h1>
      </div>
    );
  }

  // Check if slot is already booked
  const isSlotBooked = (time) => {
    return bookings.some(
      (b) =>
        b.doctorId === doctor.id &&
        b.date === selectedDate &&
        b.time === time
    );
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time.");
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

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedBookings)
    );

    alert("Appointment booked successfully!");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
        
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Doctor Info */}
          <div>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <h1 className="text-3xl font-bold mb-2">
              {doctor.name}
            </h1>

            <p className="text-blue-600 text-lg mb-2">
              {doctor.specialization}
            </p>

            <p className="text-gray-600 mb-2">
              {doctor.experience} Years Experience
            </p>

            <p className="text-gray-700">
              Consultation Fee: ₹500
            </p>
          </div>

          {/* Booking Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Book Appointment
            </h2>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Available Slots
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => {
                    const booked = isSlotBooked(time);

                    return (
                      <button
                        key={time}
                        disabled={booked}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-lg border transition
                          ${
                            booked
                              ? "bg-gray-300 cursor-not-allowed"
                              : selectedTime === time
                              ? "bg-blue-600 text-white"
                              : "bg-white hover:bg-blue-100"
                          }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Confirm Booking
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
