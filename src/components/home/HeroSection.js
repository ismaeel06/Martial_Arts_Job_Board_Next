'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setLoaded(true);
    // Remove the particle creation functionality
  }, []);

  // Reversed order for desktop - logo on left, text on right
  return (
    <section className="hero-section relative overflow-hidden bg-black text-white">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D88A22]/20 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D88A22]/10 rounded-full blur-3xl translate-y-1/3"></div>
      
      {/* Add pre-made particles instead of creating them dynamically */}
      <div className="particles-container absolute inset-0 overflow-hidden pointer-events-none">
        {/* Create a fixed number of particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Logo/Image Section */}
          <div className={`lg:w-2/5 flex justify-center items-center transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="relative">
              {/* Logo with subtle hover effect */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-105 cursor-pointer">
                <Image
                  src="/logo-home.png"
                  alt="MartialArtsJobsBoard.com"
                  width={400}
                  height={400}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Text Content - Right on desktop */}
          <div className={`lg:w-3/5 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Rest of your text content remains the same */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="inline-block">The</span>{' '}
              <span className="inline-block text-[#D88A22] font-extrabold">#1 Job Board</span>{' '}
              <span className="inline-block">for</span>{' '}
              <span className="inline-block relative">
                Martial Arts Instructors
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D88A22] rounded-full transform origin-left scale-x-100"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
              Where Schools Hire & Instructors Find Work
            </p>
            
            {/* Button group */}
            <div className="flex flex-col sm:flex-row gap-5">
<Link 
  href="/post-job"
  className="group relative overflow-hidden px-5 py-2.5 bg-[#D88A22] text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#D88A22]/20 active:scale-95 hover:bg-[#c07a1b]"
>
  <span className="relative z-10 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Post a Job
  </span>
  <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
</Link>
              
              <Button 
                href="/find-jobs" 
                variant="secondary"
                className="group relative px-5 py-2.5 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:border-[#D88A22] hover:text-[#D88A22] active:scale-95"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Opportunities
                </span>
              </Button>
            </div>
            
            {/* New feature badge */}
            <div className="mt-8 inline-flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="inline-block w-2 h-2 bg-[#D88A22] rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">New: Teaching demo video submissions</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for particles - optimized */}
      <style jsx>{`
        .particles-container {
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          background-color: rgba(216, 138, 34, 0.4);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          animation: float 20s infinite ease-in-out;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;