'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const steps = [
    {
      title: "Post",
      description: "Create and publish your job listing in minutes. Our streamlined process helps you craft the perfect job description.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      image: "/images/post-job.jpg",
    },
    {
      title: "Promote",
      description: "Your job gets promoted to qualified martial arts instructors nationwide. Reach our targeted community of skilled teachers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
        </svg>
      ),
      image: "/images/promote-job.jpg",
    },
    {
      title: "Hire",
      description: "Review applicants and find your perfect instructor match. Watch teaching demos and select the ideal candidate for your dojo.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
        </svg>
      ),
      image: "/images/hire-instructor.jpg",
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#D88A22]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#D88A22]/5 rounded-full blur-3xl"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-[#D88A22]/5">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,122.7C672,128,768,160,864,160C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
            How It Works
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-[#D88A22] rounded-full"></span>
            <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1.5 bg-[#D88A22] rounded-full transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`}></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">Our simple three-step process connects martial arts schools with qualified instructors quickly and effectively</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`
                group relative bg-white rounded-2xl transition-all duration-700 transform
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
                }
              `}
              style={{ 
                transitionDelay: isVisible ? `${index * 300}ms` : '0ms',
              }}
            >
              {/* Card Content */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg shadow-gray-100/40 hover:shadow-xl hover:shadow-[#D88A22]/10 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col">
                {/* Icon Container */}
                <div className="flex items-center mb-6 relative">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="absolute inset-0 rounded-full bg-[#D88A22]/20 animate-ping-slow opacity-75"></span>
                    <span className="text-white relative z-10">{step.icon}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-[#D88A22]/40 text-5xl font-bold leading-none">0{index + 1}</span>
                  </div>
                  <div className={`absolute h-0.5 bg-gradient-to-r from-[#D88A22] to-transparent top-10 -right-6 w-12 transition-opacity duration-300 ${index === steps.length - 1 ? 'opacity-0' : 'opacity-100'}`}></div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 relative inline-block">
                    {step.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D88A22] group-hover:w-full transition-all duration-300 delay-150"></span>
                  </h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                </div>
                
                {/* Martial Arts Icon */}
                <div className="flex justify-end mt-auto">
                  <div className="text-[#D88A22]/30 group-hover:text-[#D88A22]/50 transition-colors duration-300">
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                        <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 1 5.337 15c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25S8.335 11.25 7.3 11.25a1.647 1.647 0 0 0-1.003.349c-.283.215-.604.401-.959.401a.656.656 0 0 1-.659-.663 47.703 47.703 0 0 1 .1-4.735.75.75 0 0 1 .75-.751c2.35.001 4.665.15 6.975.442.164.02.417.075.417.364Z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        
        {/* Process Timeline - Desktop Only */}
        <div className="hidden lg:flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <div className={`h-1 bg-gradient-to-r from-[#D88A22] to-[#D88A22]/30 flex-grow transform transition-all duration-1500 ${isVisible ? 'scale-x-100' : 'scale-x-0'} origin-left`}></div>
          <div className="mx-4 w-3 h-3 rounded-full bg-[#D88A22] animate-pulse"></div>
          <div className={`h-1 bg-gradient-to-r from-[#D88A22]/30 to-[#D88A22] flex-grow transform transition-all duration-1500 ${isVisible ? 'scale-x-100' : 'scale-x-0'} origin-right`}></div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.8);
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

export default HowItWorksSection;