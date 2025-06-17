'use client';

import { useEffect, useRef, useState } from 'react';
import JobCard from '@/components/jobs/JobCard';
import Button from '@/components/ui/Button';

const FeaturedJobsSection = () => {
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

  // Sample job listings - in a real app, these would come from an API
  const featuredJobs = [
    {
      id: 1,
      title: 'Head Karate Instructor',
      company: 'Dragon Martial Arts Academy',
      location: 'Los Angeles, CA',
      salary: '$40-60K',
      jobType: 'Full-time',
      postedAt: '2 days ago',
      style: 'Karate'
    },
    {
      id: 2,
      title: 'Brazilian Jiu-Jitsu Coach',
      company: 'Elite Grappling Center',
      location: 'Chicago, IL',
      salary: '$35-55K',
      jobType: 'Full-time',
      postedAt: '3 days ago',
      style: 'BJJ'
    },
    {
      id: 3,
      title: 'Youth Taekwondo Instructor',
      company: 'Champion Martial Arts',
      location: 'Remote',
      salary: '$25-35/hr',
      jobType: 'Part-time',
      postedAt: '1 week ago',
      style: 'Taekwondo'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
          <div className="h-1 w-24 bg-[#D88A22] mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover top martial arts teaching positions from leading schools across the country
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto mb-12">
          {featuredJobs.map((job, index) => (
            <div 
              key={job.id} 
              className={`
                transition-all duration-700 transform
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button href="/find-jobs" variant="secondary" className={`
            transition-all duration-700 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
