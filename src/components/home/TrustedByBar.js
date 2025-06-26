'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TrustedByBar = () => {
  const barRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (barRef.current) {
      observer.observe(barRef.current);
    }
    
    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={barRef} 
      className="py-10 bg-white relative overflow-hidden"
    >
      {/* Background Elements - similar to HowItWorksSection */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D88A22]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D88A22]/5 rounded-full blur-3xl"></div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-[#D88A22]/5">
          <path fill="currentColor" fillOpacity="1" d="M0,32L48,42.7C96,53,192,75,288,69.3C384,64,480,32,576,32C672,32,768,64,864,69.3C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>

<div className="container mx-auto px-4 relative z-10">
  <div 
    className={`flex items-center justify-center transition-all duration-700 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
    style={{ overflow: 'visible' }} // Allow logo to overflow
  >
    <div className="flex items-center mr-8">
      <h3 className="text-xl font-semibold text-gray-700 whitespace-nowrap">Trusted By</h3>
      <div className="h-8 w-px bg-gray-300 mx-6"></div>
    </div>
    
    <div className="flex items-center relative" style={{ overflow: 'visible' }}>
      {/* Logo container: fixed width/height, relative */}
      <div className="relative h-32 w-32 flex items-center justify-center" style={{ overflow: 'visible' }}>
        {/* Logo expands to the right, absolutely positioned */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500`}
          style={{
            width: isVisible ? '20rem' : '8rem', // Example: expand width on visible
            height: '8rem',
            zIndex: 1,
            overflow: 'visible',
          }}
        >
          <Image 
            src="/businessKombatLogo.webp" 
            alt="Business Kombat logo" 
            fill
            className="object-contain"
            priority
            style={{
              left: 0,
              right: 'auto',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Process Timeline at bottom - similar to HowItWorksSection */}
      <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto relative z-10">
        <div className={`h-1 bg-gradient-to-r from-[#D88A22] to-[#D88A22]/30 flex-grow transform transition-all duration-1500 ${isVisible ? 'scale-x-100' : 'scale-x-0'} origin-left`}></div>
        <div className="mx-4 w-3 h-3 rounded-full bg-[#D88A22] animate-pulse"></div>
        <div className={`h-1 bg-gradient-to-r from-[#D88A22]/30 to-[#D88A22] flex-grow transform transition-all duration-1500 ${isVisible ? 'scale-x-100' : 'scale-x-0'} origin-right`}></div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.8;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedByBar;