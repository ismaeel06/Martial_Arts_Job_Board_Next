'use client';

import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

// API base URL - would be set from environment variables in real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.martialartsjoboard.com';

/**
 * Instructor listing service functions for API integration
 */
const InstructorService = {
  // Get instructors with filters and pagination
  getInstructors: async (params) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add search parameters if they exist
      if (params.searchQuery) queryParams.append('search', params.searchQuery);
      if (params.location) queryParams.append('location', params.location);
      if (params.martialArtStyle) queryParams.append('style', params.martialArtStyle);
      if (params.experience) queryParams.append('experience', params.experience);
      
      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 10);
      
      // Make the API request
      const response = await fetch(`${API_BASE_URL}/api/instructors?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch instructors');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      throw error;
    }
  },
  
  // Get featured instructors
  getFeaturedInstructors: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/instructors/featured`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured instructors');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured instructors:', error);
      throw error;
    }
  }
};

// Mock data for development
const MOCK_INSTRUCTORS = [
  {
    id: 1,
    name: "Michael Chen",
    title: "Senior Karate Instructor",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["karate", "taekwondo"],
    location: "San Francisco, CA",
    yearsExperience: 15,
    rank: "5th Degree Black Belt",
    bio: "Michael Chen is a highly respected karate instructor with over 15 years of experience teaching students of all ages. He began his martial arts journey at age 7 and earned his first black belt at 16. Michael specializes in traditional Shotokan Karate and has competed internationally, winning multiple national championships.",
    availability: {
      status: "Available for new positions",
      preference: "Full-time"
    }
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    title: "Brazilian Jiu-Jitsu Black Belt",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["bjj", "mma"],
    location: "Miami, FL",
    yearsExperience: 12,
    rank: "Black Belt",
    bio: "Sophia Rodriguez is a Brazilian Jiu-Jitsu black belt with over 12 years of experience competing and teaching. She received her black belt from the renowned Gracie Barra academy and has won multiple IBJJF championships throughout her competitive career.",
    availability: {
      status: "Available for part-time positions",
      preference: "Part-time"
    }
  },
  {
    id: 3,
    name: "James Wilson",
    title: "MMA Head Coach",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["mma", "kickboxing"],
    location: "Las Vegas, NV",
    yearsExperience: 10,
    rank: "Professional Fighter & Coach",
    bio: "Former professional MMA fighter with a record of 15-3, James Wilson has transitioned into full-time coaching. With expertise in striking, wrestling, and submission grappling, he provides comprehensive MMA training for competitors and fitness enthusiasts alike.",
    availability: {
      status: "Limited availability",
      preference: "Part-time"
    }
  },
  {
    id: 4,
    name: "Sarah Johnson",
    title: "Taekwondo Master",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["taekwondo"],
    location: "Chicago, IL",
    yearsExperience: 18,
    rank: "4th Degree Black Belt",
    bio: "Sarah Johnson is a 4th degree black belt in Taekwondo with Olympic training experience. She has coached multiple national champions and specializes in competitive Olympic-style sparring and traditional poomsae forms.",
    availability: {
      status: "Available for new positions",
      preference: "Full-time"
    }
  },
  {
    id: 5,
    name: "David Kim",
    title: "Judo & BJJ Instructor",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["judo", "bjj"],
    location: "New York, NY",
    yearsExperience: 15,
    rank: "Black Belt in Judo & BJJ",
    bio: "David Kim holds black belts in both Judo and Brazilian Jiu-Jitsu. A former national Judo competitor, David has transitioned to teaching both arts with an emphasis on their complementary techniques and competition strategy.",
    availability: {
      status: "Not currently available",
      preference: "Full-time"
    }
  },
  {
    id: 6,
    name: "Lisa Nguyen",
    title: "Muay Thai Specialist",
    profileImage: "/Logo.png",
    coverImage: "/Logo.png",
    styles: ["muaythai"],
    location: "Seattle, WA",
    yearsExperience: 8,
    rank: "Professional Fighter",
    bio: "Lisa Nguyen is a professional Muay Thai fighter with multiple championship titles. Having trained extensively in Thailand, she brings authentic techniques and training methodologies to her students in both competition and self-defense contexts.",
    availability: {
      status: "Available for new positions",
      preference: "Part-time"
    }
  }
];

// Helper functions
const getStyleBadgeColor = (style) => {
  const styleBadgeColors = {
    karate: 'bg-amber-50 text-amber-700 border-amber-200',
    judo: 'bg-blue-50 text-blue-700 border-blue-200',
    bjj: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    muaythai: 'bg-red-50 text-red-700 border-red-200',
    kickboxing: 'bg-orange-50 text-orange-700 border-orange-200',
    taekwondo: 'bg-purple-50 text-purple-700 border-purple-200',
    kungfu: 'bg-green-50 text-green-700 border-green-200',
    mma: 'bg-gray-800 text-gray-100 border-gray-700',
  };
  return styleBadgeColors[style?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
};

const getStyleIcon = (style) => {
  const styleIcons = {
    karate: '🥋',
    judo: '🥋',
    bjj: '🥋',
    muaythai: '🥊',
    kickboxing: '🥊',
    taekwondo: '🥋',
    kungfu: '🥋',
    mma: '🥊',
  };
  return styleIcons[style?.toLowerCase()] || '🥋';
};

// Instructor Card Component
const InstructorCard = ({ id, name, title, profileImage, styles, location, yearsExperience, rank, availability, viewMode = 'grid' }) => {
  return (
    <Link href={`/instructors/${id}`} className="block transition-transform hover:scale-[1.02]">
      <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${viewMode === 'grid' ? '' : 'flex'}`}>
        {/* Image container */}
        <div className={`${viewMode === 'grid' ? 'h-52' : 'w-48 h-48'} relative bg-[#f8f2e8] ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
          {profileImage ? (
            <Image
              src={profileImage}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              {styles && styles.length > 0 ? getStyleIcon(styles[0]) : '🥋'}
            </div>
          )}
          
          {/* Availability badge */}
          <div className={`absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-medium text-white 
            ${availability.status.includes('Available') ? 'bg-green-600' : 
              availability.status.includes('Limited') ? 'bg-yellow-600' : 'bg-gray-600'}`}>
            {availability.status}
          </div>
        </div>
        
        {/* Content */}
        <div className={`p-5 ${viewMode === 'list' ? 'flex-grow' : ''}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-[#D88A22] font-medium mb-2">{title}</p>
          
          <div className="flex items-center text-gray-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{location}</span>
          </div>
          
          {viewMode === 'list' && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {/* Show condensed bio in list view */}
              {rank} • {yearsExperience} years experience
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {styles?.map((style) => (
              <span 
                key={style}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:shadow-md hover:scale-105 transition-all ${getStyleBadgeColor(style)}`}
              >
                {getStyleIcon(style)} {style.charAt(0).toUpperCase() + style.slice(1)}
              </span>
            ))}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all">
              {yearsExperience} Years
            </span>
          </div>
          
          {viewMode === 'list' && (
            <div className="mt-4 flex justify-end">
              <Button 
                variant="secondary" 
                size="sm" 
                className="text-[#D88A22] border-[#D88A22] hover:bg-[#D88A22] hover:text-white"
              >
                View Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const InstructorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [martialArtStyle, setMartialArtStyle] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // Add these state variables for API integration
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstructors, setTotalInstructors] = useState(0);
  
  const filterRef = useRef(null);

  /**
   * Effect for API data fetching
   */
  useEffect(() => {
    // Function to fetch instructors from the API
    const fetchInstructors = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // IMPORTANT: Remove this condition and use the API call when backend is ready
        if (process.env.NODE_ENV === 'production' && false) { // <-- Change this condition when ready
          const result = await InstructorService.getInstructors({
            searchQuery,
            location,
            martialArtStyle,
            experience,
            availability,
            page: currentPage,
            limit: 10
          });
          
          setInstructors(result.instructors);
          setTotalPages(result.totalPages);
          setTotalInstructors(result.totalInstructors);
        } else {
          // Mock data for development - REMOVE THIS WHEN BACKEND IS READY
          // Simulate API response delay
          await new Promise(resolve => setTimeout(resolve, 500));
          setInstructors(MOCK_INSTRUCTORS);
          setTotalPages(1);
          setTotalInstructors(MOCK_INSTRUCTORS.length);
        }
      } catch (err) {
        setError('Failed to load instructors. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInstructors();
  }, [searchQuery, location, martialArtStyle, experience, availability, currentPage]);
  
  // Filter instructors based on search criteria
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = searchQuery === '' || 
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      instructor.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLocation = location === '' || 
      instructor.location.toLowerCase().includes(location.toLowerCase());
      
    const matchesStyle = martialArtStyle === '' || 
      instructor.styles.some(style => style.toLowerCase() === martialArtStyle.toLowerCase());
      
    const matchesExperience = experience === '' || 
      (experience === 'less-5' && instructor.yearsExperience < 5) || 
      (experience === '5-10' && instructor.yearsExperience >= 5 && instructor.yearsExperience <= 10) || 
      (experience === 'more-10' && instructor.yearsExperience > 10);

    const matchesAvailability = availability === '' || 
      (availability === 'available' && instructor.availability.status.toLowerCase().includes('available')) ||
      (availability === 'limited' && instructor.availability.status.toLowerCase().includes('limited')) ||
      (availability === 'unavailable' && instructor.availability.status.toLowerCase().includes('not'));
      
    return matchesSearch && matchesLocation && matchesStyle && matchesExperience && matchesAvailability;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setMartialArtStyle('');
    setExperience('');
    setAvailability('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // This would trigger an API call with the search parameters in a real app
    // Currently it just filters the mock data, but when connected to backend API:
    /*
    const fetchFilteredInstructors = async () => {
      setIsLoading(true);
      try {
        const result = await InstructorService.getInstructors({
          searchQuery,
          location,
          martialArtStyle,
          experience,
          availability,
          page: 1, // Reset to first page when searching
          limit: 10
        });
        
        setInstructors(result.instructors);
        setTotalPages(result.totalPages);
        setTotalInstructors(result.totalInstructors);
        setCurrentPage(1);
      } catch (err) {
        setError('Failed to load instructors. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilteredInstructors();
    */
  };

  return (
    <MainLayout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url("/images/pattern-martial-arts.svg")', 
            backgroundSize: '300px',
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D88A22] to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#D88A22] to-transparent"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 mb-5">
              <span className="text-sm font-medium text-[#D88A22]">Expert Martial Arts Professionals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up leading-tight">
              Find Top Martial Arts<br />
              <span className="text-[#D88A22]">Instructors</span> for Your School
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
              Browse qualified martial arts teachers with proven experience and connect with the perfect instructor for your needs
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                href="#instructor-search"
                className="animate-fade-in"
                style={{ animationDelay: '400ms' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Instructors
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                href="/post-job"
                className="animate-fade-in"
                style={{ animationDelay: '600ms' }}
              >
                Post a Job Opening
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters - Enhanced */}
      <section id="instructor-search" ref={filterRef} className="bg-white border-b border-gray-100 py-6 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[#D88A22]/10 text-[#D88A22] p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
              <h2 className="text-xl font-bold">Find Instructors</h2>
              {filteredInstructors.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">
                  {filteredInstructors.length} instructors
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="text-sm flex items-center px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 transition-transform ${isFilterVisible ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="flex items-center space-x-1 border border-gray-200 rounded-md overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#D88A22] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  title="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#D88A22] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  title="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        
          <div className={`transition-all duration-300 overflow-hidden ${isFilterVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <form 
              onSubmit={handleSearch} 
              className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Search Input */}
                <div className="space-y-2">
                  <label htmlFor="searchQuery" className="text-sm font-medium text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Name or Title
                  </label>
                  <div className="relative">
                    <input
                      id="searchQuery"
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                      placeholder="e.g. Karate Master"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Location Input */}
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                      placeholder="City or state"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    {location && (
                      <button 
                        type="button"
                        onClick={() => setLocation('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Martial Arts Style Select */}
                <div className="space-y-2">
                  <label htmlFor="martialArtStyle" className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-1.5 text-gray-500 text-base">🥋</span>
                    Martial Art Style
                  </label>
                  <div className="relative">
                    <select
                      id="martialArtStyle"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors appearance-none"
                      value={martialArtStyle}
                      onChange={(e) => setMartialArtStyle(e.target.value)}
                    >
                      <option value="">All Styles</option>
                      <option value="karate">Karate</option>
                      <option value="bjj">Brazilian Jiu-Jitsu</option>
                      <option value="taekwondo">Taekwondo</option>
                      <option value="mma">MMA</option>
                      <option value="judo">Judo</option>
                      <option value="muaythai">Muay Thai</option>
                      <option value="kickboxing">Kickboxing</option>
                      <option value="kungfu">Kung Fu</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Experience Level Select */}
                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-medium text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Experience
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors appearance-none"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="">Any Experience</option>
                      <option value="less-5">Less than 5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="more-10">10+ years</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Availability Select */}
                <div className="space-y-2">
                  <label htmlFor="availability" className="text-sm font-medium text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Availability
                  </label>
                  <div className="relative">
                    <select
                      id="availability"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors appearance-none"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                    >
                      <option value="">Any Status</option>
                      <option value="available">Available</option>
                      <option value="limited">Limited Availability</option>
                      <option value="unavailable">Not Available</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {(searchQuery || location || martialArtStyle || experience || availability) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Active filters:</span>
                  
                  {searchQuery && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Search: {searchQuery}
                      <button 
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {location && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Location: {location}
                      <button 
                        type="button"
                        onClick={() => setLocation('')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {martialArtStyle && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Style: {martialArtStyle}
                      <button 
                        type="button"
                        onClick={() => setMartialArtStyle('')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {experience && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Experience: {experience === 'less-5' ? 'Less than 5 years' : experience === '5-10' ? '5-10 years' : 'More than 10 years'}
                      <button 
                        type="button"
                        onClick={() => setExperience('')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}

                  {availability && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Availability: {availability.charAt(0).toUpperCase() + availability.slice(1)}
                      <button 
                        type="button"
                        onClick={() => setAvailability('')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {(searchQuery || location || martialArtStyle || experience || availability) && (
                    <button 
                      type="button"
                      onClick={clearFilters}
                      className="text-xs text-[#D88A22] hover:text-[#c47a1c] hover:underline ml-1 flex items-center"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap gap-3 justify-end border-t border-gray-100 pt-4">
                {(searchQuery || location || martialArtStyle || experience || availability) ? (
                  <Button 
                    type="button" 
                    variant="text"
                    onClick={clearFilters}
                    className="flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reset
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="text"
                    onClick={() => setIsFilterVisible(false)}
                    className="flex items-center"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit" 
                  variant="primary"
                  className="flex items-center px-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
        
      {/* Instructor Listings */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D88A22]"></div>
              </div>
            )}
            
            {/* Error state */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Instructor listing header */}
            {!isLoading && !error && (
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold">
                  <span className="text-[#D88A22]">{totalInstructors || filteredInstructors.length}</span> Instructors Available
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Sort by:
                  </span>
                  <select 
                    className="text-sm border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-700 font-medium"
                    // When using API, uncomment:
                    // onChange={(e) => {
                    //   // Set sorting parameter and refetch data
                    //   setSorting(e.target.value);
                    // }}
                  >
                    <option value="experience-desc">Most Experienced</option>
                    <option value="experience-asc">Newly Qualified</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Instructor Cards */}
            {!isLoading && !error && (filteredInstructors.length > 0 ? (
              <div className={`grid grid-cols-1 ${viewMode === 'grid' && 'md:grid-cols-2'} gap-6 mb-8`}>
                {filteredInstructors.map((instructor) => (
                  <InstructorCard 
                    key={instructor.id}
                    viewMode={viewMode}
                    {...instructor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No Instructors Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters to find more martial arts instructors
                </p>
                <Button 
                  onClick={clearFilters} 
                  variant="secondary"
                >
                  Clear All Filters
                </Button>
              </div>
            ))}
            
            {/* Pagination */}
            {!isLoading && !error && filteredInstructors.length > 0 && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                <div className="text-sm text-gray-500">
                  {/* Update this to use API pagination data when connected to a backend */}
                  Showing <span className="font-medium">1-{filteredInstructors.length}</span> of <span className="font-medium">{totalInstructors || filteredInstructors.length}</span> instructors
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" 
                    disabled={currentPage <= 1}
                    // When using API, uncomment:
                    // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                  
                  {/* When using API, replace this with dynamic page buttons */}
                  <button className="px-3 py-2 bg-[#D88A22] text-white border border-[#D88A22] rounded-md">
                    1
                  </button>
                  
                  <button 
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    disabled={currentPage >= totalPages} 
                    // When using API, uncomment:
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* School CTA Section */}
      <section className="bg-[#f5f0e8] py-12 border-t border-[#e8d9c1]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/30 text-[#b36d19] text-sm px-4 py-1.5 rounded-full font-medium mb-5">
              For Martial Arts Schools
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Can&apos;t Find the Right Instructor?</h2>
            <p className="text-gray-600 mb-8">
              Post your job opening on our board and let qualified instructors find you. It&apos;s the fastest way to connect with martial arts teaching talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary"
                href="/post-job"
                className="px-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Post a Job
              </Button>
              <Button 
                variant='contact'
                href="/contact"
                // className="bg-transparent text-[#D88A22] border border-[#D88A22] hover:bg-[#D88A22] hover:text-white transition-colors"
              >
                Contact Support
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Average time to receive qualified applications is just 3 days!
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default InstructorsPage;