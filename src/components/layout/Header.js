'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 backdrop-blur-sm ${
        isScrolled 
          ? 'bg-white/95 shadow-lg py-3' 
          : 'bg-transparent py-5 md:py-6'
      }`}
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
          <span className="font-bold text-lg md:text-xl hidden md:block ml-3 transition-colors group-hover:text-[#D88A22]">
            MartialArtsJobsBoard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 hover:text-[#D88A22] ${
                pathname === item.path 
                  ? 'text-[#D88A22] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D88A22] after:rounded-full after:animate-expand-width' 
                  : 'hover:bg-black/5'
              }`}
            >
              {item.name}
            </Link>
          ))}
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
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
            <div className="flex items-center justify-between px-4 py-5 border-b">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/Logo.png"
                  alt="MartialArtsJobsBoard.com"
                  width={36}
                  height={36}
                />
                <span className="font-bold text-lg ml-3">MartialArtsJobsBoard</span>
              </Link>
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-black hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex-grow overflow-y-auto p-6">
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-[#D88A22]/10 text-[#D88A22]'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-6 border-t">
              <Link
                href="/post-job"
                className="flex items-center justify-center w-full px-6 py-3 bg-[#D88A22] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#c07a1b] active:scale-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;