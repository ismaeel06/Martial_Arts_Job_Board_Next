'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

// API base URL - would be set from environment variables in real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.martialartsjoboard.com';

/**
 * Instructor profile service functions for API integration
 */
const InstructorService = {
  // Get instructor details by ID
  getInstructorById: async (instructorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/instructors/${instructorId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Instructor not found
        }
        throw new Error('Failed to fetch instructor details');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching instructor details:', error);
      throw error;
    }
  },
  
  // Get reviews for an instructor
  getInstructorReviews: async (instructorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/instructors/${instructorId}/reviews`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch instructor reviews');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching instructor reviews:', error);
      throw error;
    }
  },
  
  // Contact an instructor
  contactInstructor: async (instructorId, contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/instructors/${instructorId}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message to instructor');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error contacting instructor:', error);
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
    bio: "Michael Chen is a highly respected karate instructor with over 15 years of experience teaching students of all ages. He began his martial arts journey at age 7 and earned his first black belt at 16. Michael specializes in traditional Shotokan Karate and has competed internationally, winning multiple national championships.\n\nHis teaching philosophy emphasizes discipline, respect, and personal growth while maintaining the traditional aspects of karate. Michael is certified by the Japan Karate Association and continues to train regularly with master instructors from around the world.",
    achievements: [
      "5-time National Karate Champion (2015-2020)",
      "Certified Instructor, Japan Karate Association",
      "Trained over 50 black belt students",
      "Featured in Martial Arts Digest magazine",
      "Conducted seminars across 12 states"
    ],
    teaching: {
      styles: ["Shotokan Karate", "Self-Defense", "Youth Karate"],
      ageGroups: ["Children (7-12)", "Teens", "Adults"],
      specialties: ["Traditional kata", "Tournament preparation", "Self-defense applications"]
    },
    education: [
      "Master of Sports Science, United States Sports Academy (2010)",
      "Bachelor of Physical Education, University of California (2005)",
      "International Karate Instructor Certification (2008)"
    ],
    availability: {
      status: "Available for new positions",
      preference: "Full-time",
      remote: false,
      relocate: true,
      startDate: "Immediately"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Dragon Martial Arts Academy",
        rating: 5,
        date: "2023-05-20",
        text: "Michael taught at our dojo for 3 years and was an exceptional instructor. His students showed remarkable progress, and he was incredibly dedicated to their growth. Highly recommended."
      },
      {
        id: 2,
        reviewer: "Sarah Johnson",
        rating: 5,
        date: "2023-03-15", 
        text: "My son has been learning from Master Chen for 2 years, and the improvement in his discipline and confidence has been amazing. Michael has a special way with kids that brings out their best."
      },
      {
        id: 3,
        reviewer: "Olympic Karate Center",
        rating: 4,
        date: "2022-11-10",
        text: "We hired Michael as a guest instructor for our competition team. His technical knowledge and coaching abilities significantly elevated our students' performance at the regional tournament."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        linkedin: "michael-chen-karate",
        instagram: "master_chen_karate",
        facebook: "MasterChenKarate"
      }
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
    bio: "Sophia Rodriguez is a Brazilian Jiu-Jitsu black belt with over 12 years of experience competing and teaching. She received her black belt from the renowned Gracie Barra academy and has won multiple IBJJF championships throughout her competitive career.\n\nAs an instructor, Sophia is known for her technical precision and ability to break down complex movements into understandable components. She specializes in teaching women and children, with a focus on self-defense applications and competition preparation.",
    achievements: [
      "IBJJF Pan American Champion (2018)",
      "ADCC North American Trials Finalist (2019)",
      "Founder of Women's BJJ Miami Initiative",
      "Published author of 'Ground Control: BJJ for Women'",
      "Featured instructor on BJJ Fanatics"
    ],
    teaching: {
      styles: ["Brazilian Jiu-Jitsu", "No-Gi Grappling", "Self-Defense"],
      ageGroups: ["Children (6+)", "Teens", "Adults", "Women-only classes"],
      specialties: ["Competition training", "Women's self-defense", "Guard development"]
    },
    education: [
      "Master's in Physical Education, University of Miami (2014)",
      "Sports Psychology Certification, American Sports University (2016)",
      "Gracie Barra Certified Instructor (2015)"
    ],
    availability: {
      status: "Available for part-time positions",
      preference: "Part-time",
      remote: false,
      relocate: false,
      startDate: "1 month notice"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Elite Grappling Center",
        rating: 5,
        date: "2023-06-12",
        text: "Sophia ran our women's BJJ program for 3 years and completely transformed it. Enrollment tripled under her leadership, and her students consistently performed well in competitions."
      },
      {
        id: 2,
        reviewer: "Carlos Mendoza",
        rating: 5,
        date: "2023-04-20",
        text: "As a competitive black belt, I trained with Sophia to improve my guard game. Her technical knowledge is exceptional, and she has a unique ability to identify and fix weaknesses."
      },
      {
        id: 3,
        reviewer: "Miami MMA Academy",
        rating: 4,
        date: "2022-12-05",
        text: "We brought Sophia in for a women's self-defense seminar. The participants gave overwhelmingly positive feedback, noting her clear instruction and practical techniques."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        instagram: "sophia_bjj",
        facebook: "SophiaRodriguezBJJ",
        youtube: "SophiaBJJTechniques"
      }
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
    bio: "Former professional MMA fighter with a record of 15-3, James Wilson has transitioned into full-time coaching. With expertise in striking, wrestling, and submission grappling, he provides comprehensive MMA training for competitors and fitness enthusiasts alike.\n\nJames has cornered fighters in the UFC, Bellator, and PFL, bringing high-level strategic expertise to his coaching. His approach combines technical development with advanced fight strategy and conditioning.",
    achievements: [
      "Former UFC Fighter (2012-2017)",
      "Regional MMA Champion in two weight classes",
      "Head coach for 3 professional champions",
      "Fight of the Night awards in major promotions",
      "Developer of the 'MMA Comprehensive System' training methodology"
    ],
    teaching: {
      styles: ["Mixed Martial Arts", "Kickboxing", "Wrestling", "Submission Grappling"],
      ageGroups: ["Teens", "Adults", "Professional Fighters"],
      specialties: ["Fight preparation", "Game planning", "Corner coaching", "Strength & conditioning"]
    },
    education: [
      "Bachelor's in Exercise Science, UNLV (2011)",
      "NASM Certified Personal Trainer",
      "USA Wrestling Coach Certification",
      "MMA Conditioning Coach Certification"
    ],
    availability: {
      status: "Limited availability",
      preference: "Part-time",
      remote: true,
      relocate: false,
      startDate: "By arrangement"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Vegas Fight Club",
        rating: 5,
        date: "2023-07-10",
        text: "James transformed our competition team. His systematic approach to MMA training has given our fighters a significant edge in regional competitions."
      },
      {
        id: 2,
        reviewer: "Mark Thompson, Professional Fighter",
        rating: 5,
        date: "2023-05-22",
        text: "Working with James changed my career. His attention to detail and fight strategy helped me secure a championship title and improve my overall game."
      },
      {
        id: 3,
        reviewer: "Combat Fitness Center",
        rating: 4,
        date: "2023-02-15",
        text: "We brought James in for a weekend seminar and it was outstanding. His ability to connect with fighters of all levels and make complex techniques accessible is remarkable."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        instagram: "coach_james_wilson",
        twitter: "JamesWilsonMMA",
        youtube: "FightCoachJames"
      }
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
    bio: "Sarah Johnson is a 4th degree black belt in Taekwondo with Olympic training experience. She has coached multiple national champions and specializes in competitive Olympic-style sparring and traditional poomsae forms.\n\nWith 18 years of teaching experience, Sarah has developed innovative training methods that blend traditional Taekwondo discipline with modern sports science for optimal athlete development.",
    achievements: [
      "Former US National Team Member",
      "Coached 12 national medalists",
      "President's Council on Sports Excellence Award",
      "Midwest Instructor of the Year (2019)",
      "Developed youth competition program adopted by 30+ schools"
    ],
    teaching: {
      styles: ["World Taekwondo (Olympic style)", "Traditional Forms", "Demonstration"],
      ageGroups: ["Children (4+)", "Teens", "Adults", "Elite competitors"],
      specialties: ["Olympic-style sparring", "Poomsae competition", "High-performance coaching"]
    },
    education: [
      "Master's Degree in Kinesiology, University of Illinois (2012)",
      "Kukkiwon 4th Dan Certification",
      "USAT Coach Certification Level 2",
      "Sports Performance Specialist Certification"
    ],
    availability: {
      status: "Available for new positions",
      preference: "Full-time",
      remote: true,
      relocate: true,
      startDate: "2 weeks notice"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Midwest Taekwondo Academy",
        rating: 5,
        date: "2023-08-01",
        text: "Sarah's leadership as our head coach has taken our competition team to the national level. Her technical knowledge and motivational skills bring out the best in our athletes."
      },
      {
        id: 2,
        reviewer: "Jordan Miller, Junior National Champion",
        rating: 5,
        date: "2023-06-18",
        text: "Coach Sarah completely transformed my performance. Her analytical approach to breaking down techniques and competition strategy helped me win my first national title."
      },
      {
        id: 3,
        reviewer: "Olympic Training Seminar Series",
        rating: 5,
        date: "2023-03-07",
        text: "Sarah's coaching seminar was one of our highest-rated events. Her presentation on developing champions through technical excellence and mental preparation was outstanding."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        instagram: "master_sarah_tkd",
        facebook: "SarahJohnsonTaekwondo",
        youtube: "ChampionTKDTraining"
      }
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
    bio: "David Kim holds black belts in both Judo and Brazilian Jiu-Jitsu. A former national Judo competitor, David has transitioned to teaching both arts with an emphasis on their complementary techniques and competition strategy.\n\nSpecializing in the transition game between standing and ground fighting, David has developed a unique curriculum that bridges the gap between these two closely related martial arts.",
    achievements: [
      "USA Judo National Medalist",
      "IBJJF East Coast Championship Gold Medalist",
      "Developed 'Transition System' curriculum adopted by 20+ academies",
      "Technical consultant for major grappling tournaments",
      "Author of 'The Complete Judoka's Guide to BJJ'"
    ],
    teaching: {
      styles: ["Judo", "Brazilian Jiu-Jitsu", "Newaza (ground fighting)"],
      ageGroups: ["Youth (8+)", "Teens", "Adults", "Competitors"],
      specialties: ["Competition preparation", "Standing-to-ground transitions", "Submission defense"]
    },
    education: [
      "Kodokan-certified Judo Black Belt",
      "Brazilian Jiu-Jitsu Black Belt under John Danaher",
      "Bachelor's in Sports Management, New York University",
      "USA Judo Coach Certification"
    ],
    availability: {
      status: "Not currently available",
      preference: "Full-time",
      remote: false,
      relocate: false,
      startDate: "Not available"
    },
    reviews: [
      {
        id: 1,
        reviewer: "New York Combat Academy",
        rating: 5,
        date: "2023-04-11",
        text: "David's unique approach to combining Judo and BJJ has revolutionized our grappling program. Students benefit immensely from his systematic teaching method."
      },
      {
        id: 2,
        reviewer: "Alex Martinez, Competitive Grappler",
        rating: 4,
        date: "2023-02-25",
        text: "Training with David improved my standing techniques and transitions significantly. His ability to connect concepts between Judo and BJJ makes both arts more effective."
      },
      {
        id: 3,
        reviewer: "East Coast Grappling Conference",
        rating: 5,
        date: "2022-12-18",
        text: "David's seminar was outstanding. He has a gift for making complex techniques accessible and demonstrating how they connect across different grappling arts."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        instagram: "david_kim_judo_bjj",
        facebook: "DavidKimagerappling",
        youtube: "CompleteGrapplingSystem"
      }
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
    bio: "Lisa Nguyen is a professional Muay Thai fighter with multiple championship titles. Having trained extensively in Thailand, she brings authentic techniques and training methodologies to her students in both competition and self-defense contexts.\n\nHer teaching style emphasizes strong fundamentals, traditional Thai training methods, and the cultural aspects of Muay Thai that build mental resilience and fighting spirit.",
    achievements: [
      "WBC Muay Thai North American Champion",
      "3-time Thailand training camp graduate (Chiang Mai)",
      "Featured fighter in 'Modern Muay Thai' documentary",
      "Developed women's Muay Thai program adopted by 15+ gyms",
      "Ambassador for 'Fight Like a Girl' empowerment initiative"
    ],
    teaching: {
      styles: ["Traditional Muay Thai", "Dutch-style Kickboxing", "Clinch Work"],
      ageGroups: ["Teens", "Adults", "Women's Only Classes"],
      specialties: ["Authentic Thai techniques", "Clinch and knees", "Competition preparation"]
    },
    education: [
      "Certified by Muay Thai Grand Master Yodtong Senanan",
      "MTIA Advanced Trainer Certification",
      "Bachelor's in Athletic Training, University of Washington",
      "Sports Nutrition Specialist Certification"
    ],
    availability: {
      status: "Available for new positions",
      preference: "Part-time",
      remote: false,
      relocate: false,
      startDate: "Immediately"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Northwest Fight Center",
        rating: 5,
        date: "2023-07-22",
        text: "Lisa transformed our Muay Thai program with authentic techniques and traditional training methods. Her classes are always full, and students rave about her instruction."
      },
      {
        id: 2,
        reviewer: "Sarah Mitchell, Amateur Fighter",
        rating: 5,
        date: "2023-05-30",
        text: "Training with Lisa took my fighting to another level. Her attention to technical details and fight strategy helped me secure my first championship belt."
      },
      {
        id: 3,
        reviewer: "Women's Self Defense Workshop",
        rating: 5,
        date: "2023-03-15",
        text: "Lisa's self-defense workshop was outstanding. She adapted Muay Thai techniques for practical self-defense scenarios in a way that was accessible to participants of all fitness levels."
      }
    ],
    contact: {
      email: "protected",
      phone: "protected",
      social: {
        instagram: "lisa_muaythai",
        facebook: "LisaNguyenMuayThai",
        youtube: "AuthenticMuayThai"
      }
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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function InstructorProfile() {
  const params = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  useEffect(() => {
    const fetchInstructor = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // IMPORTANT: Remove this condition and use the API call when backend is ready
        if (process.env.NODE_ENV === 'production' && false) { // <-- Change this condition when ready
          const data = await InstructorService.getInstructorById(params.id);
          if (!data) {
            setError('Instructor not found');
          } else {
            setInstructor(data);
          }
        } else {
          // Mock data for development
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const instructorId = parseInt(params.id, 10);
          const foundInstructor = MOCK_INSTRUCTORS.find(i => i.id === instructorId);
          
          if (!foundInstructor) {
            setError('Instructor not found');
          } else {
            setInstructor(foundInstructor);
          }
        }
      } catch (err) {
        setError('Failed to load instructor data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [params.id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ submitting: true, success: false, error: null });
    
    try {
      // In a real app, this would call the API
      // await InstructorService.contactInstructor(instructor.id, contactFormData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContactStatus({ submitting: false, success: true, error: null });
      // Reset form after successful submission
      setContactFormData({ name: '', email: '', message: '' });
      // Close modal after a delay
      setTimeout(() => {
        setContactModalOpen(false);
        // Reset success message after modal closes
        setTimeout(() => setContactStatus({ submitting: false, success: false, error: null }), 300);
      }, 2000);
    } catch (err) {
      setContactStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="h-16 w-16 rounded-full bg-slate-200"></div>
              <div className="flex-1 space-y-6 py-1 max-w-md">
                <div className="h-4 bg-slate-200 rounded"></div>
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

  if (error || !instructor) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold mb-4">Instructor Not Found</h2>
            <p className="text-gray-600 mb-6">The instructor profile you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/instructors">
              <Button>Browse All Instructors</Button>
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
          <Link href="/instructors" className="hover:text-[#D88A22]">Instructors</Link>
          <span className="mx-2">/</span>
          <span className="text-[#D88A22] font-medium">{instructor.name}</span>
        </div>
        
        {/* Instructor Header */}
        <div className="bg-white rounded-xl shadow-md border-l-4 border-l-[#D88A22] border-t border-r border-b border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
              <div className="relative h-24 w-24 md:h-32 md:w-32 bg-[#f8f2e8] rounded-lg border border-[#eccaa7] flex items-center justify-center overflow-hidden">
                {instructor.profileImage ? (
                  <Image
                    src={instructor.profileImage}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {instructor.styles && instructor.styles.length > 0 ? getStyleIcon(instructor.styles[0]) : '🥋'}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">{instructor.name}</h1>
              <p className="text-lg text-[#D88A22] mb-3">{instructor.title}</p>
              <div className="flex flex-wrap items-center text-gray-600 mb-4">
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {instructor.location}
                </span>
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {instructor.rank}
                </span>
                <span className="mr-4 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {instructor.yearsExperience} years experience
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {instructor.styles.map((style) => (
                  <span 
                    key={style}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:shadow-md hover:scale-105 transition-all ${getStyleBadgeColor(style)}`}
                  >
                    {getStyleIcon(style)} {style.charAt(0).toUpperCase() + style.slice(1)}
                  </span>
                ))}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:shadow-md hover:scale-105 transition-all ${
                  instructor.availability.status.includes('Available') 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : instructor.availability.status.includes('Limited')
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}>
                  {instructor.availability.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex-shrink-0">
              <Button 
                className="bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] shadow-md"
                onClick={() => setContactModalOpen(true)}
              >
                Contact Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Instructor Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Instructor Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-4 border-[#ecd8b9]">Biography</h2>
              <p className="text-gray-700 mb-8 whitespace-pre-line">{instructor.bio}</p>
              
              {instructor.achievements && instructor.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 text-[#b36d19] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Achievements
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#D88A22]">
                    {instructor.achievements.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {instructor.teaching && (
                <div className="mb-8 bg-gray-50 p-5 rounded-lg border-l-4 border-[#7e95b8]">
                  <h3 className="text-lg font-bold mb-3 text-[#4a6892] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Teaching Specialties
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-[#4a6892] mb-2">Styles</h4>
                      <ul className="list-disc pl-5 space-y-1 marker:text-[#7e95b8]">
                        {instructor.teaching.styles.map((style, idx) => (
                          <li key={idx} className="text-gray-700">{style}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4a6892] mb-2">Age Groups</h4>
                      <ul className="list-disc pl-5 space-y-1 marker:text-[#7e95b8]">
                        {instructor.teaching.ageGroups.map((age, idx) => (
                          <li key={idx} className="text-gray-700">{age}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4a6892] mb-2">Specialties</h4>
                      <ul className="list-disc pl-5 space-y-1 marker:text-[#7e95b8]">
                        {instructor.teaching.specialties.map((specialty, idx) => (
                          <li key={idx} className="text-gray-700">{specialty}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {instructor.education && instructor.education.length > 0 && (
                <div className="mb-8 bg-[#f6fbf6] p-5 rounded-lg border-l-4 border-[#6aac6a]">
                  <h3 className="text-lg font-bold mb-3 text-[#417841] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Education & Certifications
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#6aac6a]">
                    {instructor.education.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Reviews Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800">
                  Reviews & References
                </h3>
              
                {instructor.reviews && instructor.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {instructor.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{review.reviewer}</h4>
                          <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                        </div>
                        <div className="mb-3">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-700 italic">{review.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-gray-500">No reviews available yet.</p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] text-lg px-8 py-4 shadow-md"
                    onClick={() => setContactModalOpen(true)}
                  >
                    Contact This Instructor
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Instructor Info & Details */}
          <div className="lg:col-span-1">
            {/* Availability info */}
            <div className="bg-[#f8f8fa] rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#4a5568] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#7e8da1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Availability Details
              </h2>
              
              <div className="flex items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  instructor.availability.status.includes('Available') 
                    ? 'bg-green-100 text-green-600' 
                    : instructor.availability.status.includes('Limited')
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {instructor.availability.status.includes('Available') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : instructor.availability.status.includes('Limited') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-[#4a5568]">{instructor.availability.status}</h3>
                  <p className="text-sm text-gray-600">{instructor.availability.preference} position</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6b88ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Employment Type</p>
                    <p className="text-sm text-gray-700">{instructor.availability.preference}</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6aac6a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Start Date</p>
                    <p className="text-sm text-gray-700">{instructor.availability.startDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Willing to Relocate</p>
                    <p className="text-sm text-gray-700">{instructor.availability.relocate ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9c71ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Remote Teaching</p>
                    <p className="text-sm text-gray-700">{instructor.availability.remote ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rank and Experience */}
            <div className="bg-[#f3f8fc] rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#4a5568] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#6b88ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Expertise Details
              </h2>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4 text-center">
                <div className="inline-block rounded-lg bg-[#f8f2e8] p-4 mb-2">
                  <span className="text-3xl">{getStyleIcon(instructor.styles[0])}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{instructor.rank}</h3>
                <p className="text-sm text-gray-500 mt-1">{instructor.yearsExperience} Years Experience</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-3">Martial Arts Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {instructor.styles.map(style => (
                    <span 
                      key={style}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStyleBadgeColor(style)}`}
                    >
                      {getStyleIcon(style)} {style.charAt(0).toUpperCase() + style.slice(1)}
                    </span>
                  ))}
                </div>
                {instructor.teaching && (
                  <>
                    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Teaching Focus</h4>
                    <div className="space-y-1">
                      {instructor.teaching.styles.slice(0, 3).map((focus, idx) => (
                        <p key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D88A22] mr-2"></span>
                          {focus}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Connect Section */}
            <div className="bg-gradient-to-br from-[#D88A22]/20 to-[#D88A22]/10 rounded-xl shadow-md border border-[#D88A22]/30 p-6 md:p-8 relative overflow-hidden">
              
              <h2 className="text-xl font-bold mb-4 text-gray-800">Connect with {instructor.name.split(' ')[0]}</h2>
              
              {instructor.contact && instructor.contact.social && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {instructor.contact.social.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${instructor.contact.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0A66C2] hover:bg-[#0958a8] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  
                  {instructor.contact.social.instagram && (
                    <a 
                      href={`https://instagram.com/${instructor.contact.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  
                  {instructor.contact.social.facebook && (
                    <a 
                      href={`https://facebook.com/${instructor.contact.social.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4267B2] hover:bg-[#365899] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  
                  {instructor.contact.social.youtube && (
                    <a 
                      href={`https://youtube.com/c/${instructor.contact.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF0000] hover:bg-[#d90000] text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
              
              <Button
                variant="primary" 
                className="w-full mb-4 shadow-sm"
                onClick={() => setContactModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Message Directly
              </Button>
              
              <div className="mt-4 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-[#D88A22]/20 shadow-sm">
                <p className="text-sm text-gray-700">Contact {instructor.name.split(' ')[0]} directly to discuss teaching opportunities, private lessons, or seminars.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => !contactStatus.submitting && setContactModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-1">Contact {instructor.name}</h2>
            <p className="text-gray-500 mb-4 text-sm">Send a message to inquire about availability or lessons</p>
            
            {contactStatus.success ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p>Your message has been sent to {instructor.name}. You should expect a response soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                {contactStatus.error && (
                  <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
                    {contactStatus.error}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                    placeholder="Enter your name"
                    required
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    disabled={contactStatus.submitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                    placeholder="Enter your email"
                    required
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    disabled={contactStatus.submitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22]/50 focus:border-[#D88A22] transition-colors"
                    placeholder="Enter your message"
                    required
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    disabled={contactStatus.submitting}
                  />
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31]"
                    disabled={contactStatus.submitting}
                  >
                    {contactStatus.submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Apply Button Sticky Footer on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30">
        <Button 
          className="w-full flex items-center justify-center bg-gradient-to-r from-[#D88A22] to-[#e09c43] hover:from-[#c67c1e] hover:to-[#d08b31] text-lg py-3"
          onClick={() => setContactModalOpen(true)}
        >
          Contact This Instructor
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </MainLayout>
  );
}