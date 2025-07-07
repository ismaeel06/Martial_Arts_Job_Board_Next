'use client';

import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JobCard from '@/components/jobs/JobCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// API base URL - would be set from environment variables in real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.martialartsjoboard.com';

/**
 * Job listing service functions for API integration
 */
const JobService = {

  
  // Get job listings with filters and pagination
  getJobs: async (params) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add search parameters if they exist
      if (params.searchQuery) queryParams.append('search', params.searchQuery);
      if (params.location) queryParams.append('location', params.location);
      if (params.martialArtStyle) queryParams.append('style', params.martialArtStyle);
      if (params.jobType) queryParams.append('jobType', params.jobType);
      
      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 10);
      
      // Make the API request
      const response = await fetch(`${API_BASE_URL}/api/jobs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },
  
  // Get featured job listings
  getFeaturedJobs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/featured`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured jobs');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
      throw error;
    }
  }
};

const FindJobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [martialArtStyle, setMartialArtStyle] = useState('');
  const [jobType, setJobType] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterVisible, setIsFilterVisible] = useState(true);
//   const [isSticky, setIsSticky] = useState(false);

  // Add these state variables for API integration
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const filterRef = useRef(null);
  
  // Monitor scroll position for sticky filters
//   useEffect(() => {
//     const handleScroll = () => {
//       if (filterRef.current) {
//         const offset = filterRef.current.offsetTop;
//         setIsSticky(window.scrollY > offset + 100);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  /**
   * Effect for API data fetching
   */
  useEffect(() => {
    // Function to fetch jobs from the API
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // IMPORTANT: Remove this condition and use the API call when backend is ready
        if (process.env.NODE_ENV === 'production' && false) { // <-- Change this condition when ready
          const result = await JobService.getJobs({
            searchQuery,
            location,
            martialArtStyle,
            jobType,
            page: currentPage,
            limit: 10
          });
          
          setJobListings(result.jobs);
          setTotalPages(result.totalPages);
          setTotalJobs(result.totalJobs);
        } else {
          // Mock data for development - REMOVE THIS WHEN BACKEND IS READY
          // Simulate API response delay
          await new Promise(resolve => setTimeout(resolve, 500));
          setJobListings(mockJobListings);
          setTotalPages(1);
          setTotalJobs(mockJobListings.length);
        }
      } catch (err) {
        setError('Failed to load job listings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [searchQuery, location, martialArtStyle, jobType, currentPage]);
  
  // Sample job listings data - in a real app, this would come from an API
  // REMOVE THIS BLOCK WHEN IMPLEMENTING REAL API INTEGRATION
  const mockJobListings = [
    {
      id: 1,
      title: 'Head Karate Instructor',
      company: 'Dragon Martial Arts Academy',
      location: 'Los Angeles, CA',
      salary: '$40-60K',
      jobType: 'Full-time',
      postedAt: '2 days ago',
      style: 'karate',
      description: 'Experienced Karate instructor needed to lead our adult and youth programs. Black belt required with minimum 5 years teaching experience.',
      featured: true
    },
    {
      id: 2,
      title: 'Brazilian Jiu-Jitsu Coach',
      company: 'Elite Grappling Center',
      location: 'Chicago, IL',
      salary: '$35-55K',
      jobType: 'Full-time',
      postedAt: '3 days ago',
      style: 'bjj',
      description: 'Seeking BJJ coach for expanding program. Purple belt minimum with competition experience preferred.'
    },
    {
      id: 3,
      title: 'Youth Taekwondo Instructor',
      company: 'Champion Martial Arts',
      location: 'Remote',
      salary: '$25-35/hr',
      jobType: 'Part-time',
      postedAt: '1 week ago',
      style: 'taekwondo',
      description: 'Part-time instructor needed for after-school Taekwondo program. Must be great with kids!'
    },
    {
      id: 4,
      title: 'MMA Program Director',
      company: 'Fighters Academy',
      location: 'New York, NY',
      salary: '$55-75K',
      jobType: 'Full-time',
      postedAt: '5 days ago',
      style: 'mma',
      description: 'Seeking experienced MMA coach to lead our expanding program. Professional fight experience preferred.',
      featured: true
    },
    {
      id: 5,
      title: 'Judo Instructor',
      company: 'Olympic Training Center',
      location: 'Denver, CO',
      salary: '$30-45K',
      jobType: 'Full-time',
      postedAt: '1 week ago',
      style: 'judo',
      description: 'Join our Judo program teaching athletes of all levels. Olympic or national-level competition experience desired.'
    },
    {
      id: 6,
      title: 'Evening Muay Thai Coach',
      company: 'Strike Combat Academy',
      location: 'Austin, TX',
      salary: '$30-40/hr',
      jobType: 'Part-time',
      postedAt: '4 days ago',
      style: 'muaythai',
      description: 'Looking for high-energy Muay Thai coach for evening adult classes. Fighting experience required.'
    },
    {
      id: 7,
      title: 'Aikido Master Instructor',
      company: 'Traditional Martial Ways',
      location: 'San Francisco, CA',
      salary: '$50-65K',
      jobType: 'Full-time',
      postedAt: '1 week ago',
      style: 'aikido',
      description: 'Traditional Aikido dojo seeking master instructor. Minimum 15 years experience required.'
    },
    {
      id: 8,
      title: 'Children\'s Program Coordinator',
      company: 'Little Dragons Academy',
      location: 'Seattle, WA',
      salary: '$40-50K',
      jobType: 'Full-time',
      postedAt: '3 days ago',
      style: 'multiple',
      description: 'Oversee our fast-growing children\'s martial arts program. Experience teaching multiple styles preferred.'
    }
  ];

  // Then add this to your component
const router = useRouter();
  
  // Filter jobs based on search criteria
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLocation = location === '' || 
      job.location.toLowerCase().includes(location.toLowerCase());
      
    const matchesStyle = martialArtStyle === '' || 
      job.style.toLowerCase() === martialArtStyle.toLowerCase();
      
    const matchesJobType = jobType === '' || 
      job.jobType.toLowerCase() === jobType.toLowerCase();
      
    return matchesSearch && matchesLocation && matchesStyle && matchesJobType;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setMartialArtStyle('');
    setJobType('');
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // This would trigger an API call with the search parameters in a real app
    // Currently it just filters the mock data, but when connected to backend API:
    /*
    const fetchFilteredJobs = async () => {
      setIsLoading(true);
      try {
        const result = await JobService.getJobs({
          searchQuery,
          location,
          martialArtStyle,
          jobType,
          page: 1, // Reset to first page when searching
          limit: 10
        });
        
        setJobListings(result.jobs);
        setTotalPages(result.totalPages);
        setTotalJobs(result.totalJobs);
        setCurrentPage(1);
      } catch (err) {
        setError('Failed to load job listings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilteredJobs();
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
              <span className="text-sm font-medium text-[#D88A22]">Hundreds of Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up leading-tight">
              Find Your Perfect<br />
              <span className="text-[#D88A22]">Martial Arts</span> Teaching Job
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
              Browse opportunities for martial arts instructors nationwide and connect with schools looking for your expertise
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                href="#job-search"
                className="animate-fade-in"
                style={{ animationDelay: '400ms' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Jobs Now
              </Button>
<Button 
  variant="outline" 
  size="lg"
  onClick={() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');
    
    if (!userLoggedIn) {
      // Not logged in, redirect to login
      router.push('/login');
    } else if (userType !== 'instructor') {
      // Logged in but not an instructor, redirect to instructor signup
      router.push('/instructor-signup');
    } 
  }}
  className="animate-fade-in"
  style={{ animationDelay: '600ms' }}
>
  Create Instructor Profile
</Button>
            </div>
          </div>
        </div>
      </section>

{/* Search Filters - Enhanced */}
<section id="job-search" ref={filterRef} className="bg-white border-b border-gray-100 py-6 shadow-sm relative z-20">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <span className="bg-[#D88A22]/10 text-[#D88A22] p-1.5 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </span>
        <h2 className="text-xl font-bold">Search Opportunities</h2>
        {filteredJobs.length > 0 && (
          <span className="ml-2 bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">
            {filteredJobs.length} jobs
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label htmlFor="searchQuery" className="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Job Title or School
            </label>
            <div className="relative">
              <input
                id="searchQuery"
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                placeholder="e.g. Karate Instructor"
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
                placeholder="City, state, or remote"
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
                <option value="aikido">Aikido</option>
                <option value="multiple">Multiple Styles</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Job Type Select */}
          <div className="space-y-2">
            <label htmlFor="jobType" className="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Job Type
            </label>
            <div className="relative">
              <select
                id="jobType"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors appearance-none"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
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
        {(searchQuery || location || martialArtStyle || jobType) && (
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
            
            {jobType && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Job type: {jobType}
                <button 
                  type="button"
                  onClick={() => setJobType('')}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {(searchQuery || location || martialArtStyle || jobType) && (
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
          {(searchQuery || location || martialArtStyle || jobType) ? (
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
      
      {/* Job Listings */}
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
            
            {/* Job listing header */}
            {!isLoading && !error && (
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold">
                  <span className="text-[#D88A22]">{totalJobs || filteredJobs.length}</span> Job Openings
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
                    <option value="recent">Most Recent</option>
                    <option value="salary">Highest Salary</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Job Cards */}
            {!isLoading && !error && (filteredJobs.length > 0 ? (
              <div className={`grid grid-cols-1 ${viewMode === 'grid' && 'md:grid-cols-2'} gap-6 mb-8`}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No Jobs Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters to find more opportunities
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
            {!isLoading && !error && filteredJobs.length > 0 && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                <div className="text-sm text-gray-500">
                  {/* Update this to use API pagination data when connected to a backend */}
                  Showing <span className="font-medium">1-{filteredJobs.length}</span> of <span className="font-medium">{totalJobs || filteredJobs.length}</span> jobs
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
                  
                  {/* Uncomment and customize this when connecting to a backend */}
                  {/*
                    // Generate page buttons based on totalPages from API
                    Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show current page and surrounding pages
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          className={`px-3 py-2 border rounded-md ${
                            currentPage === pageNum 
                              ? 'bg-[#D88A22] text-white border-[#D88A22]' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })
                  */}
                  
                  <button 
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"                    disabled={currentPage >= totalPages} 
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
      
      {/* Email Alerts Section */}
      <section className="bg-[#f5f0e8] py-12 border-t border-[#e8d9c1]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/30 text-[#b36d19] text-sm px-4 py-1.5 rounded-full font-medium mb-5">
              Never Miss an Opportunity
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Get Job Alerts</h2>
            <p className="text-gray-600 mb-8">
              Sign up to receive personalized job notifications based on your preferences. We'll email you when new opportunities match your criteria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-grow max-w-sm">
                <input 
                  type="email" 
                  className="w-full px-5 py-3.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22]"
                  placeholder="Your email address"
                />
              </div>
              <Button variant="primary">
                Subscribe to Alerts
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FindJobsPage;