'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false); 
  const [hasPlan, setHasPlan] = useState(false);
  const pathname = usePathname();

  // Add this new useEffect to check login status
  useEffect(() => {
    // Simple implementation for now
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userType = localStorage.getItem('userType'); // 'employer' or 'instructor'
    const selectedPlan = localStorage.getItem('selectedPlan'); // 'starter', 'featured', or 'unlimited'
    
    setIsLoggedIn(userLoggedIn === 'true');
    setIsEmployer(userType === 'employer');
    setHasPlan(!!selectedPlan); // Convert to boolean
    
    // JWT and Redux implementation (commented out for now)
    /*
    // This will be replaced with Redux state management
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity here
      // Get user data from Redux store
      const userData = store.getState().auth.user;
      setIsLoggedIn(true);
      setIsEmployer(userData.type === 'employer');
      setHasPlan(!!userData.subscription.plan);
    } else {
      setIsLoggedIn(false);
      setIsEmployer(false);
      setHasPlan(false);
    }
    */
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [mobileMenuOpen]);

    const handleLogout = () => {
    localStorage.setItem('userLoggedIn', 'false');
    setIsLoggedIn(false);
    
    // JWT implementation (commented out for now)
    /*
    localStorage.removeItem('token');
    // Any other logout logic (clear user data, etc.)
    */
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Find Instructors', path: '/instructors' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

    // Determine if Post Job button should be shown
  const canPostJob = isLoggedIn && isEmployer && hasPlan;

  return (
    <header
      className="fixed w-full z-30 transition-all duration-300 bg-white/95 shadow-sm py-3"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center group"
          aria-label="MartialArtsJobsBoard.com"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/Logo.png"
              alt="MartialArtsJobsBoard.com"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <span className="font-bold text-lg md:text-xl hidden md:block ml-3 transition-colors group-hover:text-[#D88A22] text-gray-800">
            MartialArtsJobsBoard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 ${
                pathname === item.path 
                  ? 'text-[#D88A22] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D88A22] after:rounded-full after:animate-expand-width' 
                  : 'text-gray-700 hover:text-[#D88A22] hover:bg-black/5'
              }`}
            >
              {item.name}
            </Link>
          ))}

                    {/* Dashboard button - only shows when logged in */}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 ${
                pathname.startsWith('/dashboard')
                  ? 'text-[#D88A22] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D88A22] after:rounded-full after:animate-expand-width'
                  : 'text-gray-700 hover:text-[#D88A22] hover:bg-black/5'
              }`}
            >
              Dashboard
            </Link>
          )}

<Link
  href="/post-job"
  className="ml-2 px-5 py-2.5 bg-[#D88A22] text-white font-medium rounded-full transition-all duration-300 hover:bg-[#c07a1b] hover:shadow-lg hover:shadow-[#D88A22]/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:ring-offset-2"
>
  <span className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Post a Job
  </span>
</Link>

                    {/* Add Sign In/Log Out button here */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-5 py-2.5 bg-white text-[#D88A22] border border-[#D88A22] font-medium rounded-full transition-all duration-300 hover:bg-[#D88A22]/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:ring-offset-2"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-2 px-5 py-2.5 bg-white text-[#D88A22] border border-[#D88A22] font-medium rounded-full transition-all duration-300 hover:bg-[#D88A22]/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:ring-offset-2"
            >
              Sign In
            </Link>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 text-gray-800 hover:bg-black/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative w-6 h-6">
            <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
            <span className={`absolute w-6 h-0.5 bg-current transform transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
          </div>
        </button>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-5 border-b bg-gradient-to-r from-[#D88A22]/10 to-white">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/Logo.png"
                  alt="MartialArtsJobsBoard.com"
                  width={36}
                  height={36}
                />
                <span className="font-bold text-lg ml-3 text-gray-800">MartialArtsJobsBoard</span>
              </Link>
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex-grow overflow-y-auto p-6 bg-gray-50">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-[#D88A22]/10 text-[#D88A22] border-l-4 border-[#D88A22]'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name === 'Home' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      {item.name === 'Find Jobs' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.name === 'Find Instructors' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      {item.name === 'Pricing' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.name === 'About' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.name === 'Contact' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.name}
                    </Link>
                  </li>
                ))}
                    {isLoggedIn && (
      <li>
        <Link
          href="/dashboard"
          className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            pathname.startsWith('/dashboard')
              ? 'bg-[#D88A22]/10 text-[#D88A22] border-l-4 border-[#D88A22]'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>
      </li>
    )}
              </ul>
            </nav>
            
            <div className="p-6 border-t bg-gray-50">
            {/* Update mobile Post Job button with the same logic */}
<Link
  href="/post-job"
  className="flex items-center justify-center w-full px-6 py-3.5 bg-[#D88A22] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#c07a1b] active:scale-95 shadow-md"
  onClick={() => setMobileMenuOpen(false)}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Post a Job
</Link>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-[#D88A22]" aria-label="Facebook">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#D88A22]" aria-label="Instagram">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#D88A22]" aria-label="Twitter">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
{isLoggedIn ? (
  <button 
    onClick={handleLogout}
    className="text-sm text-[#D88A22] font-medium hover:underline"
  >
    Log Out
  </button>
) : (
  <Link href="/login" className="text-sm text-[#D88A22] font-medium hover:underline">
    Sign In
  </Link>
)}
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;