import { Link } from "react-router-dom";
export default function DoctorCard({ doctor }) {
  return (
    <div className=" animate-fadeIn group relative bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
      {/* Doctor Image */}
      <div className="overflow-hidden">
        <img
          
            src={doctor.image}
             alt={doctor.name}
  
          className="w-full h-48 object-cover 
                     transition-transform duration-700 
                     group-hover:scale-110"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {doctor.name}
        </h3>

        <p className="text-blue-600 font-medium mt-1">
          {doctor.specialization}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {doctor.experience} Experience
        </p>

        <Link
             to={`/doctor/${doctor.id}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Appointment
        </Link>

      </div>
    </div>
  );
}
