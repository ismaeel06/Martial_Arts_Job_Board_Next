'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

// API base URL - would be set from environment variables in real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.martialartsjoboard.com';

/**
 * Job details service functions for API integration
 */
const JobService = {
  // Get job details by ID
  getJobById: async (jobId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Job not found
        }
        throw new Error('Failed to fetch job details');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  },
  
  // Submit job application
  applyForJob: async (jobId, applicationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
  
  // Get related jobs
  getRelatedJobs: async (jobId, style) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/related?id=${jobId}&style=${style}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch related jobs');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching related jobs:', error);
      throw error;
    }
  }
};

// This would come from your API or database in a real application
// REMOVE THIS WHEN IMPLEMENTING REAL API INTEGRATION
const MOCK_JOBS = [
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
    responsibilities: [
      'Develop and implement structured martial arts curriculum for all age groups and skill levels',
      'Conduct group classes and private lessons for students of various ages',
      'Prepare students for belt promotions and tournaments',
      'Foster a positive and motivating learning environment',
      'Assist with student retention and recruitment efforts',
      'Maintain a clean and safe training environment'
    ],
    requirements: [
      'Black Belt in Karate, minimum 5 years experience teaching',
      'Excellent communication and interpersonal skills',
      'Ability to work evenings and weekends',
      'Experience with children\'s programs preferred',
      'First Aid and CPR certification required',
      'Background check required'
    ],
    benefits: [
      'Competitive salary based on experience',
      'Performance-based bonuses',
      'Flexible schedule options',
      'Opportunities for advancement',
      'Free training at our facility',
      'Professional development support'
    ],
    companyDescription: 'Dragon Martial Arts Academy has been serving the Los Angeles community for over 15 years. Our school focuses on traditional karate while incorporating modern teaching methods. We have a thriving student base of over 200 active members ranging from 4 years old to seniors.',
    logoUrl: '/Logo.png',
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
    description: 'Seeking BJJ coach for expanding program. Purple belt minimum with competition experience preferred.',
    responsibilities: [
      'Teach gi and no-gi classes for all levels of students',
      'Develop competition training programs',
      'Create and implement curriculum for kids and adult programs',
      'Assist with seminars and special events',
      'Participate in local tournaments to represent the school'
    ],
    requirements: [
      'Purple belt or higher in BJJ from a recognized lineage',
      'At least 2 years of teaching experience',
      'Competition experience preferred',
      'Excellent communication skills',
      'Reliable transportation',
      'Willingness to work evenings and weekends'
    ],
    benefits: [
      'Competitive hourly pay',
      'Free training at our facility',
      'Competition sponsorship opportunities',
      'Flexible scheduling',
      'Growth opportunities as our school expands'
    ],
    companyDescription: 'Elite Grappling Center is Chicago\'s premier Brazilian Jiu-Jitsu school. Founded by black belt competitors, we focus on both competitive and recreational training in a safe, supportive environment. Our 5,000 sq ft facility features state-of-the-art mats, strength training equipment, and recovery amenities.',
    logoUrl: '/Logo.png'
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
    description: 'Part-time instructor needed for after-school Taekwondo program. Must be great with kids!',
    responsibilities: [
      'Teach after-school Taekwondo classes for children ages 5-12',
      'Develop age-appropriate curriculum and activities',
      'Track student progress and prepare for belt testing',
      'Communicate effectively with parents',
      'Assist with student recruitment and retention'
    ],
    requirements: [
      'Black belt in Taekwondo or related martial art',
      'Previous experience teaching children',
      'Excellent classroom management skills',
      'Reliable transportation',
      'Background check required',
      'CPR and First Aid certification preferred'
    ],
    benefits: [
      'Competitive hourly rate',
      'Flexible schedule options',
      'Training and certification support',
      'Potential for additional hours during summer camps',
      'Growth opportunities as program expands'
    ],
    companyDescription: 'Champion Martial Arts is dedicated to building confidence, discipline, and character in students of all ages through traditional martial arts training. Our remote teaching program brings martial arts instruction to schools and community centers nationwide.',
    logoUrl: '/Logo.png'
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
    responsibilities: [
      'Direct and oversee all MMA programs and curriculum',
      'Teach advanced classes and train competition team',
      'Develop and mentor other coaches',
      'Coordinate fight team schedules and competition strategy',
      'Help grow the MMA program through marketing initiatives',
      'Maintain relationships with fight promotions and sponsors'
    ],
    requirements: [
      'Minimum 5 years coaching MMA at a high level',
      'Professional fighting experience preferred',
      'Experience in multiple disciplines (striking, grappling)',
      'Strong leadership and team management skills',
      'Business acumen and marketing aptitude',
      'Excellent communication and interpersonal skills'
    ],
    benefits: [
      'Competitive salary plus performance bonuses',
      'Health insurance and paid time off',
      'Profit sharing opportunities',
      'Relocation assistance available',
      'Professional development budget',
      'Free training and facility access for family members'
    ],
    companyDescription: 'Fighters Academy is New York\'s premier MMA training facility, featuring world-class coaches and state-of-the-art equipment. Our 10,000 sq ft facility includes full size cages, competition-quality rings, and comprehensive strength and conditioning areas. We train fighters at all levels from hobbyists to UFC competitors.',
    logoUrl: '/Logo.png',
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
    description: 'Join our Judo program teaching athletes of all levels. Olympic or national-level competition experience desired.',
    responsibilities: [
      'Coach Judo classes for youth and adult competitive athletes',
      'Develop training programs for national and international competitors',
      'Prepare athletes for tournaments and Olympic qualifiers',
      'Travel with competition team to major events',
      'Collaborate with strength and conditioning staff',
      'Assist with talent identification and recruitment'
    ],
    requirements: [
      'Black belt in Judo (2nd dan or higher preferred)',
      'National or international competitive experience',
      'USA Judo coaching certification',
      'Experience in developing elite competitors',
      'Knowledge of modern training methodologies',
      'Willingness to travel for competitions'
    ],
    benefits: [
      'Competitive salary based on experience',
      'Comprehensive health insurance',
      'Retirement plan with employer matching',
      'Housing allowance available',
      'Travel expenses covered for competitions',
      'Professional development opportunities'
    ],
    companyDescription: 'The Olympic Training Center in Denver is dedicated to developing world-class Judo athletes. Our state-of-the-art facility supports Olympic hopefuls and national team members with comprehensive resources including sports science, nutrition, physical therapy, and mental performance coaching.',
    logoUrl: '/Logo.png'
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
    description: 'Looking for high-energy Muay Thai coach for evening adult classes. Fighting experience required.',
    responsibilities: [
      'Teach beginner to advanced Muay Thai classes',
      'Develop striking curriculum for fitness and fight training',
      'Lead pad holding and technical drills',
      'Provide individualized feedback to students',
      'Prepare fighters for amateur and professional bouts',
      'Maintain a safe and motivating training environment'
    ],
    requirements: [
      'Minimum 5 years Muay Thai training experience',
      'Previous fighting experience (amateur or professional)',
      'Excellent pad holding skills',
      'Strong communication and motivational skills',
      'Availability for evening classes (5-10pm)',
      'First Aid and CPR certification'
    ],
    benefits: [
      'Competitive hourly pay',
      'Performance bonuses based on class attendance',
      'Free personal training sessions',
      'Pro shop discounts',
      'Opportunity to corner fights and receive compensation',
      'Potential for full-time position as gym expands'
    ],
    companyDescription: 'Strike Combat Academy is Austin\'s fastest-growing Muay Thai and striking gym. We offer classes for all levels from beginners to professional fighters. Our 5,000 sq ft facility includes a full-size ring, heavy bag area, and comprehensive conditioning equipment.',
    logoUrl: '/Logo.png'
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
    description: 'Traditional Aikido dojo seeking master instructor. Minimum 15 years experience required.',
    responsibilities: [
      'Lead all levels of Aikido instruction from beginner to advanced',
      'Preserve and transmit traditional Aikido philosophy and techniques',
      'Conduct seminars and special training events',
      'Mentor assistant instructors in teaching methodology',
      'Oversee dan rank testing and certification',
      'Maintain relationships with affiliated dojos nationally and in Japan'
    ],
    requirements: [
      'Minimum 4th dan in Aikido (Aikikai or recognized organization)',
      'At least 15 years of Aikido training experience',
      'Previous chief instructor experience preferred',
      'Deep understanding of Aikido philosophy and history',
      'Japanese language skills a plus',
      'Ability to demonstrate and teach advanced techniques'
    ],
    benefits: [
      'Competitive salary based on rank and experience',
      'Health insurance coverage',
      'Housing assistance available',
      'Annual trip to Japan for training',
      'Sabbatical options for research and development',
      'Ownership opportunity after proven tenure'
    ],
    companyDescription: 'Traditional Martial Ways is San Francisco\'s oldest Aikido dojo, founded in 1970 with direct lineage to the Hombu Dojo in Japan. Our beautiful dojo features traditional architecture, 2,500 sq ft of tatami training space, and a dedicated student community committed to preserving authentic Aikido practice.',
    logoUrl: '/Logo.png'
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
    description: 'Oversee our fast-growing children\'s martial arts program. Experience teaching multiple styles preferred.',
    responsibilities: [
      'Develop and implement age-appropriate martial arts curriculum',
      'Coordinate schedule and staffing for all children\'s classes',
      'Train and mentor junior instructors',
      'Communicate regularly with parents about student progress',
      'Organize special events, camps, and tournaments',
      'Implement retention strategies for young students'
    ],
    requirements: [
      'Black belt or equivalent in at least one martial art',
      'Minimum 3 years experience teaching children',
      'Knowledge of developmental psychology and learning styles',
      'Excellent classroom management skills',
      'Strong organizational and leadership abilities',
      'Background check and child safety certification'
    ],
    benefits: [
      'Competitive salary plus enrollment bonuses',
      'Health insurance and retirement plan',
      'Paid vacation and personal days',
      'Continuing education allowance',
      'Employee discount for family members',
      'Career advancement opportunities'
    ],
    companyDescription: 'Little Dragons Academy specializes exclusively in martial arts programs for children ages 3-12. Our innovative approach combines elements from multiple martial arts styles in an age-appropriate curriculum designed to build physical skills, focus, confidence, and character. With three locations across Seattle, we\'re the city\'s largest children\'s martial arts program.',
    logoUrl: '/Logo.png'
  }
];

// Helper functions for formatting
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function JobDetails() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);  // State for related jobs
  const [relatedJobs, setRelatedJobs] = useState([]);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        // IMPORTANT: Remove this condition and use the API call when backend is ready
        if (process.env.NODE_ENV === 'production' && false) { // <-- Change this condition when ready
          // Convert params.id to the expected format
          const jobId = params.id;
          
          // Fetch job details
          const jobData = await JobService.getJobById(jobId);
          
          if (!jobData) {
            setJob(null);
            return;
          }
          
          setJob(jobData);
          
          // Fetch related jobs if we have a job and a style
          if (jobData && jobData.style) {
            try {
              const relatedData = await JobService.getRelatedJobs(jobId, jobData.style);
              setRelatedJobs(relatedData.jobs || []);
            } catch (relatedErr) {
              console.error('Error fetching related jobs:', relatedErr);
              // Don't show an error for this, as it's not critical
              setRelatedJobs([]);
            }
          }
        } else {
          // Mock data for development - REMOVE THIS WHEN BACKEND IS READY
          // Simulate API response delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Convert params.id to a number for comparison since IDs in MOCK_JOBS are numbers
          const jobId = parseInt(params.id, 10);
          const foundJob = MOCK_JOBS.find(j => j.id === jobId) || null;
          setJob(foundJob);
          
          // Mock related jobs (excluding the current job)
          if (foundJob) {
            const related = MOCK_JOBS
              .filter(j => j.style === foundJob.style && j.id !== foundJob.id)
              .slice(0, 3);
            setRelatedJobs(related);
          }
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        // Set job to null to show the error state
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [params.id]);

  // Map martial art style to icon/color
  const getStyleBadgeColor = (style) => {
    const styleBadgeColors = {
      karate: 'bg-amber-50 text-amber-700 border-amber-200',
      judo: 'bg-blue-50 text-blue-700 border-blue-200',
      bjj: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      muaythai: 'bg-red-50 text-red-700 border-red-200',
      kickboxing: 'bg-orange-50 text-orange-700 border-orange-200',
      taekwondo: 'bg-purple-50 text-purple-700 border-purple-200',
      kungfu: 'bg-green-50 text-green-700 border-green-200',
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
    };
    return styleIcons[style?.toLowerCase()] || '🥋';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-slate-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job posting you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/find-jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-50">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#D88A22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/find-jobs" className="hover:text-[#D88A22]">Jobs</Link>
          <span className="mx-2">/</span>
          <span className="text-[#D88A22] font-medium">{job.title}</span>
        </div>
        
        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-md border-l-4 border-l-[#D88A22] border-t border-r border-b border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
              <div className="relative h-16 w-16 md:h-20 md:w-20 bg-[#f8f2e8] rounded-lg border border-[#eccaa7] flex items-center justify-center overflow-hidden">
                {job.logoUrl ? (
                  <Image
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-3xl">{getStyleIcon(job.style)}</span>
                )}
              </div>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">{job.title}</h1>
              <div className="flex flex-wrap items-center text-gray-600 mb-4">
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {job.company}
                </span>
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.postedAt}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:shadow-md hover:scale-105 transition-all ${getStyleBadgeColor(job.style)}`}>
                  {getStyleIcon(job.style)} {job.style.charAt(0).toUpperCase() + job.style.slice(1)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all">
                  {job.jobType}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 cursor-pointer hover:bg-green-100 hover:shadow-md hover:scale-105 transition-all">
                  {job.salary}
                </span>
              </div>
            </div>
              <div className="mt-6 md:mt-0 flex-shrink-0">
<Button 
  className="bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] shadow-md"
  href={`/apply-job/${job.id}`}  // Changed to link to the apply-job page with job ID
>
  Apply Now
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
</Button>
            </div>
          </div>
        </div>
        
        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Job Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-4 border-[#ecd8b9]">Job Description</h2>
              <p className="text-gray-700 mb-8 whitespace-pre-line">{job.description}</p>
              
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 text-[#b36d19] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#D88A22]">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-8 bg-gray-50 p-5 rounded-lg border-l-4 border-[#7e95b8]">
                  <h3 className="text-lg font-bold mb-3 text-[#4a6892] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#7e95b8]">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.benefits && job.benefits.length > 0 && (
                <div className="mb-8 bg-[#f6fbf6] p-5 rounded-lg border-l-4 border-[#6aac6a]">
                  <h3 className="text-lg font-bold mb-3 text-[#417841] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Benefits
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#6aac6a]">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
<Button className="mt-8 bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] text-lg px-8 py-4 shadow-md" href={`/apply-job/${job.id}`}>
  Apply for this Position
</Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Company Info & Related */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8fa] rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#4a5568] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#7e8da1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                About the School
              </h2>
              
              <div className="flex items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
                <div className="relative h-16 w-16 bg-[#f8f2e8] rounded-lg border border-[#eccaa7] flex items-center justify-center overflow-hidden">
                  {job.logoUrl ? (
                    <Image
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-3xl">{getStyleIcon(job.style)}</span>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#4a5568]">{job.company}</h3>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 bg-white p-4 rounded-lg shadow-sm">{job.companyDescription}</p>
              
              <a href="#" className="text-[#D88A22] font-medium hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Visit Website
              </a>
            </div>
            
            <div className="bg-[#f3f8fc] rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#4a5568] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#6b88ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Job Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6b88ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Job Type</p>
                    <p className="text-sm text-gray-700">{job.jobType}</p>
                  </div>
                </div>
                  <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6aac6a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Salary</p>
                    <p className="text-sm text-gray-700">{job.salary}</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-700">{job.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9c71ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Posted</p>
                    <p className="text-sm text-gray-700">{job.postedAt}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#D88A22]/20 to-[#D88A22]/10 rounded-xl shadow-md border border-[#D88A22]/30 p-6 md:p-8 relative overflow-hidden">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Share this Job</h2>
              <div className="flex space-x-3 mb-4">
                <button className="bg-[#4267B2] hover:bg-[#365899] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="bg-[#0A66C2] hover:bg-[#0958a8] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button className="bg-[#555] hover:bg-[#333] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-[#D88A22]/20 shadow-sm">
                <p className="text-sm text-gray-700">Help others find this opportunity by sharing this job posting with your network!</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Jobs Section */}
        <div className="bg-[#f6f5fb] rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#4a5568] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#7e64c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Similar Positions
          </h2>
          
          <div className="space-y-4">
            {relatedJobs.length > 0 ? (
              relatedJobs.map((relatedJob) => (
                <Link 
                  key={relatedJob.id} 
                  href={`/jobs/${relatedJob.id}`} 
                  className="block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="relative h-10 w-10 bg-[#f8f2e8] rounded-lg border border-[#eccaa7] flex items-center justify-center overflow-hidden">
                        {relatedJob.logoUrl ? (
                          <Image
                            src={relatedJob.logoUrl}
                            alt={`${relatedJob.company} logo`}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="text-xl">{getStyleIcon(relatedJob.style)}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{relatedJob.title}</h3>
                      <p className="text-sm text-gray-600">{relatedJob.company}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">{relatedJob.location}</span>
                        <span className="text-xs text-gray-500 ml-2">{relatedJob.postedAt}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No related jobs found</div>
            )}
            
            <div className="pt-2">
              <Link href="/find-jobs" className="text-[#7e64c8] font-medium hover:underline flex items-center justify-center">
                <span>View all jobs</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Apply Button Sticky Footer on Mobile */}
<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30">
  <Button 
    href={`/apply-job/${job.id}`}
    className="w-full flex items-center justify-center bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] text-lg py-3"
  >
    Apply for this Job
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </Button>
</div>
      </div>
    </MainLayout>
  );

}
