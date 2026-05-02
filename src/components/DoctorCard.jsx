import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div className="animate-fadeIn group relative bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xl transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
      {/* Doctor Image with Gradient Overlay */}
      <div className="relative overflow-hidden h-56">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white text-sm font-medium">Available Today</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-blue-500 font-semibold text-sm uppercase tracking-wider">
              {doctor.specialization}
            </p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            {doctor.fees}
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mt-3 space-x-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {doctor.experience} Exp.
          </div>
        </div>

        <Link
          to={`/doctor/${doctor.id}`}
          className="block w-full text-center mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:from-blue-500 hover:to-indigo-500 transform transition-all active:scale-95"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
