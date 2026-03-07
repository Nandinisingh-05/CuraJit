import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = () => {
      const stored =
        JSON.parse(localStorage.getItem("appointments")) || [];
      setAppointments(stored);
    };

    loadAppointments();

    // Listen for changes
    window.addEventListener("storage", loadAppointments);

    return () => {
      window.removeEventListener("storage", loadAppointments);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          My Appointments
        </h1>

        {appointments.length === 0 ? (
          <p className="text-gray-600">
            No appointments booked yet.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white p-4 rounded-xl shadow-md"
              >
                <h2 className="font-semibold text-lg">
                  {appt.doctorName}
                </h2>
                <p>Date: {appt.date}</p>
                <p>Time: {appt.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
