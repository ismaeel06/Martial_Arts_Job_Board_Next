'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PricingCard from '@/components/ui/PricingCard';
import Button from '@/components/ui/Button';

// export const metadata = {
//   title: 'Pricing | MartialArtsJobsBoard.com',
//   description: 'Choose the perfect plan for your martial arts school\'s hiring needs',
// };

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Calculate annual prices (15% discount)
  const calculateAnnualPrice = (monthlyPrice) => {
    const annual = monthlyPrice * 12;
    const discount = annual * 0.15; // 15% discount
    return Math.round(annual - discount);
  };

  // Define pricing plans
  const pricingPlans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '44' : calculateAnnualPrice(44).toString(),
      description: 'Perfect for small schools hiring occasionally',
      features: [
        '30-day listing',
        'Standard visibility',
        'Email application forwarding',
        'Basic analytics',
        'Simple listing design',
        'Application tracking'
      ],
      cta: 'Get Started',
      ctaLink: `/post-job?plan=starter&billing=${billingCycle}`,
    },
    {
      name: 'Featured',
      price: billingCycle === 'monthly' ? '98' : calculateAnnualPrice(98).toString(),
      description: 'Best for schools looking for top talent',
      features: [
        '60-day listing',
        'Featured placement for 14 days',
        'Email + Dashboard applications',
        'Promoted in email newsletter',
        'Advanced candidate filters',
        'Enhanced listing design',
        'Social media promotion'
      ],
      cta: 'Choose Featured',
      ctaLink: `/post-job?plan=featured&billing=${billingCycle}`,
      recommended: true,
    },
    {
      name: 'Elite Hiring Pro',
      price: billingCycle === 'monthly' ? '125' : calculateAnnualPrice(125).toString(),
      description: 'For schools with continuous hiring needs',
      features: [
        'Unlimited job posts',
        'All Featured benefits',
        'Priority support',
        'Candidate video review',
        'Dedicated account manager',
        'Premium listing design',
        'Featured employer profile',
        'Candidate talent pool access'
      ],
      cta: 'Start Elite Hiring Pro',
      ctaLink: `/post-job?plan=unlimited&billing=${billingCycle}`,
    }
  ];

  const frequentlyAskedQuestions = [
    {
      question: 'How long will my job listing remain active?',
      answer: 'Starter listings remain active for 30 days, Featured listings for 60 days, and Elite Hiring Pro plan subscribers can post jobs that remain active until filled or for up to 90 days per listing.'
    },
    {
      question: 'What happens when I receive applications?',
      answer: 'You\'ll receive email notifications when candidates apply. With Featured and Elite Hiring Pro plans, you can also manage applications through your dashboard and review teaching demo videos.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes! You can upgrade from Starter to Featured at any time. To upgrade to Elite Hiring Pro, contact our support team.'
    },
    {
      question: 'Do you offer refunds if I don\'t find a candidate?',
      answer: 'We don\'t offer refunds for individual job postings, but we do offer a satisfaction guarantee for Elite Hiring Pro plan subscribers. Contact support for details.'
    },
    {
      question: 'What types of martial arts schools use your platform?',
      answer: 'We serve all styles and disciplines including Karate, BJJ, Taekwondo, Kung Fu, Judo, MMA, Muay Thai, Aikido, and many more. Schools range from small independent dojos to large multi-location academies.'
    },
    {
      question: 'Can I post jobs for non-teaching positions?',
      answer: 'Absolutely! While we specialize in instructor positions, you can also post for front desk staff, management, administrative roles, and other positions at your martial arts school.'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
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
        
        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 mb-5">
            <span className="text-sm font-medium text-[#D88A22]">Transparent Pricing & No Hidden Fees</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up leading-tight">
            Simple Pricing for<br />
            <span className="text-[#D88A22]">Martial Arts Schools</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Choose the plan that best fits your school&apos;s hiring needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Billing Cycle Toggle */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex justify-center mb-10">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-sm">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white shadow-sm text-gray-800'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                    billingCycle === 'yearly'
                      ? 'bg-white shadow-sm text-gray-800'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-3 -right-3 bg-[#D88A22] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    Save 15%
                  </span>
                </button>
              </div>
            </div>
          </div>

            {/* Urgency Banner */}
  <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-[#D88A22] rounded-lg p-4 shadow-md">
    <div className="flex items-center mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D88A22] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-lg font-bold text-gray-900">
We are opening enrollment for only 17 Founding Member Schools.
      </span>
    </div>
    <p className="text-base text-gray-800 ml-9">
      Lock in lifetime discounted pricing before our national launch. Your rate will never increase as long as you remain active.
    </p>
  </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`
                  transition-all duration-700 transform
                  ${index === 0 ? 'animate-slide-up-left' : index === 2 ? 'animate-slide-up-right' : 'animate-slide-up'}
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PricingCard 
                  {...plan} 
                  billingCycle={billingCycle} 
                  highlightFeature={
                    index === 0 ? "Perfect for occasional hiring" : 
                    index === 1 ? "Most popular choice" : 
                    "Best value for active hiring"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-[#D88A22] text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-center">
                  <svg className="w-12 h-12 text-white/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed italic">
                    &apos;We found an incredible BJJ coach within 2 weeks of posting on MartialArtsJobsBoard. The Featured plan was definitely worth it for the extra visibility.&apos;
                  </p>
                  <div>
                    <p className="font-bold">Sarah Chen</p>
                    <p className="text-white/70 text-sm">Owner, Elite Martial Arts Academy</p>
                  </div>
                </div>
                <div className="bg-white p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by 500+ Martial Arts Schools Nationwide</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Karate schools</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">BJJ academies</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">MMA gyms</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Taekwondo</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Kung Fu</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#D88A22]/10 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-[#D88A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">And more...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <div className="h-1 w-16 bg-[#D88A22] mx-auto mb-6"></div>
            <p className="text-gray-600">
              Choose the plan that offers exactly what you need for your martial arts school&apos;s hiring goals
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-5 text-left text-gray-600 border-b"></th>
                    <th className="px-6 py-5 text-center border-b">
                      <span className="text-lg font-bold">Starter</span>
                      <div className="text-gray-500 mt-1 font-normal text-sm">
                        ${billingCycle === 'monthly' ? '44' : calculateAnnualPrice(44)} {billingCycle === 'yearly' ? '/year' : '/month'}
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center border-b bg-[#D88A22]/5 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="inline-block bg-[#D88A22] text-white text-xs px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#D88A22]">Featured</span>
                      <div className="text-gray-500 mt-1 font-normal text-sm">
                        ${billingCycle === 'monthly' ? '98' : calculateAnnualPrice(98)} {billingCycle === 'yearly' ? '/year' : '/month'}
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center border-b">
                      <span className="text-lg font-bold">Elite Hiring Pro</span>
                      <div className="text-gray-500 mt-1 font-normal text-sm">
                        ${billingCycle === 'monthly' ? '125' : calculateAnnualPrice(125)} {billingCycle === 'yearly' ? '/year' : '/month'}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Listing Duration</td>
                    <td className="px-6 py-4 border-b text-center">30 days</td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">60 days</td>
                    <td className="px-6 py-4 border-b text-center">Up to 90 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Featured Placement</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      14 days
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      30 days
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Email Applications</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Dashboard Applications</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Number of Job Posts</td>
                    <td className="px-6 py-4 border-b text-center">1</td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">1</td>
                    <td className="px-6 py-4 border-b text-center">Elite Hiring Pro</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Video Applications</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Social Media Promotion</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Dedicated Account Manager</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 border-b text-left font-medium">Candidate Talent Pool</td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center bg-[#D88A22]/5">
                      <svg className="w-5 h-5 text-red-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <svg className="w-5 h-5 text-green-500 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  {/* Action Row */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-6"></td>
                    <td className="px-6 py-6 text-center">
                      <Button 
                        href={`/post-job?plan=starter&billing=${billingCycle}`} 
                        variant="secondary"
                      >
                        Get Started
                      </Button>
                    </td>
                    <td className="px-6 py-6 text-center bg-[#D88A22]/5">
                      <Button 
                        href={`/post-job?plan=featured&billing=${billingCycle}`} 
                        variant="primary"
                      >
                        Choose Featured
                      </Button>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <Button 
                        href={`/post-job?plan=unlimited&billing=${billingCycle}`}
                        variant="secondary"
                      >
                        Start Elite Hiring Pro
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-16 bg-[#D88A22] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {frequentlyAskedQuestions.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-semibold">
                    <span>{faq.question}</span>
                    <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Can&apos;t find the answer you&apos;re looking for?</p>
            <Button 
              href="/contact" 
              variant="outline" 
              className="inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#D88A22] to-[#c47a1c] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url("/images/pattern-martial-arts.svg")', 
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(45deg)'
          }}></div>
        </div>
        
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find Your Next Martial Arts Instructor Today
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join hundreds of schools that have found their perfect match on MartialArtsJobsBoard.com
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              href={`/post-job?plan=featured&billing=${billingCycle}`} 
              variant="light" 
              size="lg"
              className="shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post a Job Now
            </Button>
            <Button 
              href="/contact" 
              variant="outline-light" 
              size="lg"
            >
              Talk to Sales
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-8 text-sm font-medium">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No contracts
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quality candidates
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PricingPage;