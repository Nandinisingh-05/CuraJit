import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";
import DoctorCard from "../components/doctorcard";
import { doctors } from "../data/doctors";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "/images/doctor1.jpg",
    "/images/doctor2.jpg",
    "/images/doctor3.jpg",
    "/images/doctor4.jpg",
    "/images/doctor5.jpg",
  ];

  // 🔍 Search Function
  const handleSearch = (query) => {
    const result = doctors.filter((doc) =>
      doc.specialization.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(result);
  };

  // 🖼 Background Slideshow with Smooth Fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true); // fade in
      }, 500); // fade duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* 🔥 Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">

  {/* Background Image Layer */}
    <div
      key={currentImage}
      className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-60"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}  
      ></div>

  {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
       <div className="relative text-center text-black opacity-100 z-20">
          <h1 className="text-5xl font-bold mb-8">
           Smart Healthcare Anytime Anywhere
        </h1>
       <p className="mb-6">
          Book appointments, consult online, and manage your health easily.
       </p>

       <div className="">
              <SearchBar onSearch={handleSearch} /> 
         </div>
      </div>
       </section>

      {/* 🩺 Doctors Section */}
      <section id="doctors" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Top Doctors of Agra
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No doctors found.
            </p>
          )}
        </div>
      </section>
      <section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">
      Why Choose CuraJit?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-3">
          Verified Doctors
        </h3>
        <p className="text-gray-600">
          All doctors are verified and experienced professionals.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-3">
          Easy Appointment Booking
        </h3>
        <p className="text-gray-600">
          Book appointments in just a few clicks.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-3">
          Secure & Reliable
        </h3>
        <p className="text-gray-600">
          Your data is securely stored and protected.
        </p>
      </div>

    </div>
  </div>
</section>

      <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">
      How It Works
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div>
        <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
        <h3 className="font-semibold text-lg">Register / Login</h3>
        <p className="text-gray-600">
          Create your account and login to the system.
        </p>
      </div>

      <div>
        <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
        <h3 className="font-semibold text-lg">Choose Doctor</h3>
        <p className="text-gray-600">
          Select your preferred doctor and time slot.
        </p>
      </div>

      <div>
        <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
        <h3 className="font-semibold text-lg">Book Appointment</h3>
        <p className="text-gray-600">
          Confirm booking and manage it from dashboard.
        </p>
      </div>

    </div>
  </div>
</section>
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">
      What Our Patients Say
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          "Very easy booking process. Highly recommended!"
        </p>
        <h4 className="mt-4 font-semibold">- Priya Sharma</h4>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          "Found the best cardiologist in just minutes."
        </p>
        <h4 className="mt-4 font-semibold">- Rahul Verma</h4>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          "Simple and reliable healthcare platform."
        </p>
        <h4 className="mt-4 font-semibold">- Anjali Singh</h4>
      </div>

    </div>
  </div>
</section>
     


{/* About Section */}
      <section
         id="about" 
       className="mt-16 bg-gradient-to-r from-gray-600 via-black-600 to-gray-600 py-16 px-6 text-black">
  
     <div className="max-w-5xl mx-auto text-center">
    
       <h2 className="text-5xl font-bold">
          About CuraJit
       </h2>

    <p className="mt-6 text-lg text-blue-100 leading-relaxed">
      CuraJit is a modern healthcare platform built to connect patients 
      with trusted doctors quickly and easily. We aim to simplify 
      healthcare access and make booking appointments smooth and stress-free.
    </p>

    {/* Feature Cards */}
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
        <h3 className="text-xl font-semibold">Verified Doctors</h3>
        <p className="text-sm mt-3 text-blue-100">
          All doctors are verified and experienced professionals.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
        <h3 className="text-xl font-semibold">Easy Booking</h3>
        <p className="text-sm mt-3 text-blue-100">
          Book appointments in just a few clicks.
        </p>
       </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold">24/7 Support</h3>
          <p className="text-sm mt-3 text-blue-100">
             We are here to assist you anytime.
          </p>
            </div>

           </div>

         </div>

      </section>     


    </div>
    <section className="py-16 bg-white">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-6">
      Contact Us
    </h2>

    <p className="text-gray-600 mb-4">
      Have questions? Reach out to us.
    </p>

    <p>Email: support@curajit.com</p>
    <p>Phone: +91 9876543210</p>
  </div>
</section>

    <div>
         
        <footer className="bg-gray-800 text-white text-center py-4 mt-14">
          &copy;
          {new Date().getFullYear()} CuraJit. All rights reserved.
        </footer>
      
        </div>
        </>
  );
}
