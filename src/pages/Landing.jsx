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
    // Navigate to doctors page with search query
    window.location.href = `/doctors?search=${encodeURIComponent(query)}`;
  };

  const specializations = [
    { name: "Cardiology", icon: "https://img.icons8.com/color/96/heart-with-pulse.png", color: "bg-red-50" },
    { name: "Dermatology", icon: "https://img.icons8.com/color/96/skin.png", color: "bg-orange-50" },
    { name: "Neurology", icon: "https://img.icons8.com/color/96/brain.png", color: "bg-purple-50" },
    { name: "Pediatrics", icon: "https://img.icons8.com/color/96/baby.png", color: "bg-blue-50" },
    { name: "Gynecology", icon: "https://img.icons8.com/color/96/pregnant.png", color: "bg-pink-50" },
    { name: "Orthopedics", icon: "https://img.icons8.com/color/96/bone.png", color: "bg-amber-50" },
    { name: "Dentistry", icon: "https://img.icons8.com/color/96/tooth.png", color: "bg-cyan-50" },
    { name: "General Physician", icon: "https://img.icons8.com/color/96/stethoscope.png", color: "bg-green-50" },
  ];

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

      {/* 🔥 Classy Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50 pt-20">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 transform origin-top-right"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-[150px] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6 animate-bounce">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                24/7 Smart Healthcare Access
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                Your Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Simplified.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Connect with India's top specialists instantly. Book appointments, manage records, and get expert care from the comfort of your home.
              </p>

              {/* Premium Search Container */}
              <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-blue-200/50 border border-blue-50 max-w-xl transition-all hover:shadow-blue-300/40">
                <SearchBar onSearch={handleSearch} /> 
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex items-center gap-8 border-t border-slate-200 pt-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">1k+</div>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">1,200+</span> People booked <br /> appointments today
                </div>
              </div>
            </div>

            {/* Right Side: Glassmorphism Image Container */}
            <div className="lg:w-1/2 relative hidden lg:block">
              <div className="relative z-10 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                  style={{ backgroundImage: `url(${images[currentImage]})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Info Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <img src="https://img.icons8.com/ios-filled/50/ffffff/stethoscope.png" className="w-5 h-5" alt="Stethoscope" />
                    </div>
                    <p className="font-bold">Verified Expert Care</p>
                  </div>
                  <p className="text-sm text-blue-50 opacity-80">Our specialists are hand-picked for quality and experience.</p>
                </div>
              </div>
              
              {/* Decorative Floating Circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl rotate-12 shadow-xl flex items-center justify-center z-20 animate-float">
                 <img src="https://img.icons8.com/color/96/verified-account.png" className="w-12 h-12" alt="Verified" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-3xl -rotate-6 shadow-xl p-4 z-20 flex flex-col justify-between">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <img src="https://img.icons8.com/color/48/calendar--v1.png" className="w-5 h-5" alt="Calendar" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">Next Available: Today, 4:00 PM</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🩺 Specializations Section */}
      <section id="specializations" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
            Find by Specialization
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose from a wide range of medical specialties and find the right expert for your health needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {specializations.map((spec) => (
              <Link 
                to={`/doctors?spec=${spec.name}`} 
                key={spec.name}
                className="flex flex-col items-center group transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-32 h-32 rounded-full ${spec.color} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300 border border-transparent group-hover:border-blue-200`}>
                  <img 
                    src={spec.icon} 
                    alt={spec.name} 
                    className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {spec.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose CuraJit?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide a seamless and secure healthcare experience, connecting you with the best medical professionals at your convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <img src="https://img.icons8.com/color/96/verified-account.png" alt="Verified Doctors" className="w-10 h-10 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Verified Doctors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every doctor on our platform undergoes a rigorous verification process to ensure you receive expert care from trusted professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <img src="https://img.icons8.com/color/96/calendar--v1.png" alt="Easy Booking" className="w-10 h-10 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Easy Booking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Skip the long queues. Book your appointments instantly with our user-friendly interface, designed for your comfort and speed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <img src="https://img.icons8.com/color/96/shield.png" alt="Secure & Reliable" className="w-10 h-10 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your health data is encrypted and stored securely. We prioritize your privacy and ensure that your information is always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get medical assistance in three simple steps. Our platform is designed to be intuitive and fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src="https://img.icons8.com/color/96/enter-2.png" alt="Register" className="w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Register / Login</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your secure account or login to access your personalized health dashboard and history.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src="https://img.icons8.com/color/96/search-client.png" alt="Choose Doctor" className="w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Doctor</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through our list of verified specialists, check their profiles, and pick the one that fits your needs.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src="https://img.icons8.com/color/96/checked-checkbox.png" alt="Book Appointment" className="w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Appointment</h3>
              <p className="text-gray-600 leading-relaxed">
                Select a convenient time slot and confirm your booking. Manage your appointments effortlessly from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-24 bg-indigo-50/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
              <img 
                src="https://img.icons8.com/illustrations/social/medical-doctor.png" 
                alt="Our Story" 
                className="relative z-10 w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500 rounded-3xl"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold mb-4">Our Journey</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                The Story Behind <span className="text-blue-600">CuraJit</span>
              </h3>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  CuraJit began with a deeply personal loss. I lost my father at a time when we were trying to find the right doctor—but we didn’t know where to go or who to trust. There was information available, but not clarity. And in moments like that, <span className="text-blue-600 font-semibold">confusion can cost more than just time.</span>
                </p>
                <p>
                  That experience stayed with me. I’m <span className="font-bold text-gray-900">Nandini Singh</span>, and as a student and developer, I wanted to build something that could reduce that uncertainty for others. A platform where people can easily find the right specialist, make informed decisions, and access care without unnecessary delays.
                </p>
                <p>
                  CuraJit is my attempt to turn that experience into something meaningful—so that fewer families have to go through the same confusion when it matters the most. Because when it comes to health, <span className="italic">clarity and timely decisions can make all the difference.</span>
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl">NS</div>
                <div>
                  <p className="font-bold text-gray-900">Nandini Singh</p>
                  <p className="text-sm text-gray-500">Founder & Developer</p>
                </div>
              </div>
              
              <div className="mt-10 flex gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">5k+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Patients</p>
                </div>
                <div className="text-center border-x border-gray-200 px-8">
                  <p className="text-3xl font-bold text-blue-600">200+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Doctors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">10k+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Don't just take our word for it. Here's what our community has to say about their experience with CuraJit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <img src="https://img.icons8.com/color/96/female-profile.png" alt="Priya Sharma" className="w-20 h-20 rounded-full border-4 border-blue-50 shadow-md" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H10.017C8.91243 16 8.017 16.8954 8.017 18V21H5.017V18C5.017 15.2386 7.25557 13 10.017 13H12.017C14.7784 13 17.017 15.2386 17.017 18V21H14.017ZM11.017 11C8.80786 11 7.017 9.20914 7.017 7C7.017 4.79086 8.80786 3 11.017 3C13.2261 3 15.017 4.79086 15.017 7C15.017 9.20914 13.2261 11 11.017 11Z"></path></svg>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "The platform is incredibly easy to use. I was able to book a consultation within minutes, and the doctor was very professional."
              </p>
              <h4 className="font-bold text-gray-900 text-lg">Priya Sharma</h4>
              <span className="text-blue-600 text-sm font-medium">Happy Patient</span>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center scale-105 z-10 bg-gradient-to-b from-white to-blue-50">
              <div className="mb-6 relative">
                <img src="https://img.icons8.com/color/96/male-user.png" alt="Rahul Verma" className="w-20 h-20 rounded-full border-4 border-blue-50 shadow-md" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H10.017C8.91243 16 8.017 16.8954 8.017 18V21H5.017V18C5.017 15.2386 7.25557 13 10.017 13H12.017C14.7784 13 17.017 15.2386 17.017 18V21H14.017ZM11.017 11C8.80786 11 7.017 9.20914 7.017 7C7.017 4.79086 8.80786 3 11.017 3C13.2261 3 15.017 4.79086 15.017 7C15.017 9.20914 13.2261 11 11.017 11Z"></path></svg>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "Found the best cardiologist in Agra through CuraJit. The verified profiles helped me choose with confidence."
              </p>
              <h4 className="font-bold text-gray-900 text-lg">Rahul Verma</h4>
              <span className="text-blue-600 text-sm font-medium">Verified User</span>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <img src="https://img.icons8.com/color/96/businesswoman.png" alt="Anjali Singh" className="w-20 h-20 rounded-full border-4 border-blue-50 shadow-md" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H10.017C8.91243 16 8.017 16.8954 8.017 18V21H5.017V18C5.017 15.2386 7.25557 13 10.017 13H12.017C14.7784 13 17.017 15.2386 17.017 18V21H14.017ZM11.017 11C8.80786 11 7.017 9.20914 7.017 7C7.017 4.79086 8.80786 3 11.017 3C13.2261 3 15.017 4.79086 15.017 7C15.017 9.20914 13.2261 11 11.017 11Z"></path></svg>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "A reliable healthcare companion. I use it for my regular checkups and managing medical records."
              </p>
              <h4 className="font-bold text-gray-900 text-lg">Anjali Singh</h4>
              <span className="text-blue-600 text-sm font-medium">Regular Client</span>
            </div>
          </div>
        </div>
      </section>
     



    </div>
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Get in Touch
            </h2>
            <p className="text-blue-100 mb-10 text-lg max-w-xl mx-auto">
              Have questions or need assistance? Our support team is here to help you 24/7.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors">
                <img src="https://img.icons8.com/color/48/filled-message.png" alt="Email" className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">Email Us</p>
                  <p className="font-semibold">support@curajit.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors">
                <img src="https://img.icons8.com/color/48/phone.png" alt="Phone" className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">Call Us</p>
                  <p className="font-semibold">+91 9876543210</p>
                </div>
              </div>
            </div>
            
            <button className="mt-12 bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Contact Support Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <div>
         
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-6 tracking-tighter">CuraJit</h2>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
            Revolutionizing healthcare by connecting patients with expert doctors through a seamless digital platform. Quality care, anytime, anywhere.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/facebook-new.png" className="w-5 h-5" alt="Facebook" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/twitter--v1.png" className="w-5 h-5" alt="Twitter" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/instagram-new.png" className="w-5 h-5" alt="Instagram" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-blue-400 transition-colors">Find Doctors</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CuraJit. All rights reserved. Designed with ❤️ for better health.</p>
      </div>
    </footer>
      
        </div>
        </>
  );
}
