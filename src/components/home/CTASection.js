'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

const CTASection = () => {
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

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#D88A22] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#D88A22] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`
            max-w-3xl mx-auto text-center transition-all duration-1000
            ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Next Martial Arts Instructor?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of schools that have found their perfect match on MartialArtsJobsBoard.com
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              href="/post-job" 
              className="px-8 py-4 text-lg animate-pulse-subtle"
            >
              Post a Job Now
            </Button>
            <Button 
              href="/find-jobs" 
              variant="secondary" 
              className="px-8 py-4 text-lg"
            >
              Browse Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
