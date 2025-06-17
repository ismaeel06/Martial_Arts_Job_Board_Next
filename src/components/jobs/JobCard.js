'use client';

import { useState } from 'react';
import Image from 'next/image';

const JobCard = ({ 
  title, 
  company, 
  location, 
  salary, 
  jobType, 
  postedAt, 
  logo,
  style = 'karate' // karate, judo, bjj, muaythai, etc.
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map martial art style to icon/color
  const styleIcons = {
    karate: '🥋',
    judo: '🥋',
    bjj: '🥋',
    muaythai: '🥊',
    kickboxing: '🥊',
    taekwondo: '🥋',
    kungfu: '🥋',
  };
  
  // Style badge colors
  const styleBadgeColors = {
    karate: 'bg-amber-50 text-amber-700 border-amber-200',
    judo: 'bg-blue-50 text-blue-700 border-blue-200',
    bjj: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    muaythai: 'bg-red-50 text-red-700 border-red-200',
    kickboxing: 'bg-orange-50 text-orange-700 border-orange-200',
    taekwondo: 'bg-purple-50 text-purple-700 border-purple-200',
    kungfu: 'bg-green-50 text-green-700 border-green-200',
  };
  
  const icon = styleIcons[style.toLowerCase()] || '🥋';
  const badgeColor = styleBadgeColors[style.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
  
  return (
    <div 
      className={`
        bg-white rounded-xl border border-gray-100 transition-all duration-300
        ${isHovered ? 'shadow-lg shadow-[#D88A22]/10 transform -translate-y-1' : 'shadow-md shadow-gray-100/60'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D88A22] to-[#D88A22]/10 rounded-t-xl"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`
              mr-4 flex-shrink-0 rounded-lg p-2 transition-all duration-300
              ${isHovered ? 'bg-black/5' : 'bg-gray-100'}
            `}>
              {logo ? (
                <Image 
                  src={logo} 
                  alt={`${company} logo`} 
                  width={48} 
                  height={48} 
                  className="rounded-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-[#D88A22] flex items-center justify-center text-2xl shadow-inner">
                  {icon}
                </div>
              )}
            </div>
            
            <div>
              <h3 className={`
                text-xl font-bold mb-1 transition-all duration-300
                ${isHovered ? 'text-[#D88A22]' : 'text-gray-900'}
              `}>
                {title}
              </h3>
              <p className="text-gray-700 mb-1 font-medium">{company}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="mr-3">{location}</span>
                <span className="mr-3 text-gray-300">•</span>
                <span>{jobType}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[#D88A22] font-bold mb-1">{salary}</div>
            <div className="text-gray-500 text-sm flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {postedAt}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className={`
            text-sm px-3 py-1 rounded-full border ${badgeColor}
          `}>
            {style}
          </div>
          <button
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isHovered 
                ? 'bg-black text-white shadow-md' 
                : 'bg-transparent text-black border border-gray-200 hover:bg-gray-50'}
            `}
          >
            <span className="flex items-center">
              View Details
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1.5 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;