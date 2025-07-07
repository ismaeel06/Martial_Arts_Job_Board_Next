"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";

export default function SignUpTypePage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardSelection = (type) => {
    if (type === "instructor") {
      router.push("/instructor-signup");
    } else {
      router.push("/employer-signup");
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
          <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Choose Your Path</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select how you&apos;d like to use the Martial Arts Job Board
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Instructor Card */}
          <div 
            className={`flex-1 bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
              hoveredCard === 'instructor' 
                ? 'border-[#D88A22] shadow-xl transform scale-[1.02]' 
                : 'border-gray-200 hover:border-[#D88A22]'
            }`}
            onMouseEnter={() => setHoveredCard('instructor')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardSelection('instructor')}
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-24 h-24 bg-[#F9E9D1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">I&apos;m an Instructor</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                Create your instructor profile to find teaching positions at martial arts schools and connect with students.
              </p>
              
              {/* Features */}
              <ul className="text-left w-full mb-6 space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Showcase your martial arts experience</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apply to teaching positions</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get discovered by martial arts schools</span>
                </li>
              </ul>
              
              {/* Button */}
              <button 
                className={`w-full py-3 rounded-xl text-white font-semibold ${BUTTON_COLOR} transition duration-300`}
              >
                Find a Teaching Position
              </button>
            </div>
          </div>

          {/* Employer Card */}
          <div 
            className={`flex-1 bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
              hoveredCard === 'employer' 
                ? 'border-[#D88A22] shadow-xl transform scale-[1.02]' 
                : 'border-gray-200 hover:border-[#D88A22]'
            }`}
            onMouseEnter={() => setHoveredCard('employer')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardSelection('employer')}
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-24 h-24 bg-[#F9E9D1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">I&apos;m an Employer</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                Register your martial arts school to post job openings and find qualified instructors for your classes.
              </p>
              
              {/* Features */}
              <ul className="text-left w-full mb-6 space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Post teaching opportunities</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Search for qualified instructors</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Grow your martial arts school</span>
                </li>
              </ul>
              
              {/* Button */}
              <button 
                className={`w-full py-3 rounded-xl text-white font-semibold ${BUTTON_COLOR} transition duration-300`}
              >
                Hire an Instructor
              </button>
            </div>
          </div>
        </div>
        

        
        {/* Already have an account link */}
        <div className="flex justify-center items-center mt-6">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#D88A22] hover:underline cursor-pointer transition">
              <span>Log in</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}