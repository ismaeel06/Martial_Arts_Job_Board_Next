"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";

export default function InstructorCTAPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardSelection = (type) => {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userType', 'instructor');

    if (type === "find-jobs") {
      router.push("/find-jobs");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#f3e8d1] px-4 py-8 flex flex-col items-center">
      {/* Logo and Site Name */}
      <div className="flex flex-col sm:flex-row items-center mb-6 mt-4 gap-3">
        <image
          src={LOGO_SRC}
          alt="Martial Arts Job Board Logo"
          className="h-14 w-14 sm:h-16 sm:w-16"
        />
        <span className={`text-2xl sm:text-3xl font-bold ${PRIMARY_COLOR} mt-2 sm:mt-0 sm:ml-3 text-center sm:text-left`}>
          {SITE_NAME}
        </span>
      </div>
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10 mb-8 space-y-6">
        {/* Title and Description */}
        <div className="mb-12 text-center">
          <div className="inline-block p-2 bg-green-50 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Welcome to Martial Arts Job Board!</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Your instructor profile has been successfully created. What would you like to do next?
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Find Jobs Card */}
          <div 
            className={`flex-1 bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
              hoveredCard === 'find-jobs' 
                ? 'border-[#D88A22] shadow-xl transform scale-[1.02]' 
                : 'border-gray-200 hover:border-[#D88A22]'
            }`}
            onMouseEnter={() => setHoveredCard('find-jobs')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardSelection('find-jobs')}
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-24 h-24 bg-[#F9E9D1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">Find Teaching Jobs</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                Browse and apply to martial arts teaching positions at schools nationwide.
              </p>
              
              {/* Features */}
              <ul className="text-left w-full mb-6 space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Filter jobs by location and style</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apply with your instructor profile</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get personalized job recommendations</span>
                </li>
              </ul>
              
              {/* Button */}
              <button 
                className={`w-full py-3 rounded-xl text-white font-semibold ${BUTTON_COLOR} transition duration-300`}
              >
                Browse Jobs Now
              </button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div 
            className={`flex-1 bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
              hoveredCard === 'dashboard' 
                ? 'border-[#D88A22] shadow-xl transform scale-[1.02]' 
                : 'border-gray-200 hover:border-[#D88A22]'
            }`}
            onMouseEnter={() => setHoveredCard('dashboard')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardSelection('dashboard')}
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-24 h-24 bg-[#F9E9D1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">Go to Dashboard</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                Manage your instructor profile, applications, and job preferences.
              </p>
              
              {/* Features */}
              <ul className="text-left w-full mb-6 space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete your instructor profile</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track your applications</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Manage account settings</span>
                </li>
              </ul>
              
              {/* Button */}
              <button 
                className={`w-full py-3 rounded-xl text-white font-semibold ${BUTTON_COLOR} transition duration-300`}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}