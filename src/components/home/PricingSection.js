'use client';

import { useEffect, useRef, useState } from 'react';
import PricingCard from '@/components/ui/PricingCard';

const PricingSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  
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

  // Calculate annual prices (15% discount)
  const calculateAnnualPrice = (monthlyPrice) => {
    const annual = monthlyPrice * 12;
    const discount = annual * 0.15; // 15% discount
    return Math.round(annual - discount);
  };

  const pricingPlans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '44' : calculateAnnualPrice(44).toString(),
      description: 'Perfect for small schools hiring occasionally',
      features: [
        '30-day listing',
        'Standard visibility',
        'Email application forwarding',
        'Basic analytics'
      ],
      cta: 'Get Started',
      ctaLink: '/post-job?plan=starter',
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
        'Advanced candidate filters'
      ],
      cta: 'Choose Featured',
      ctaLink: '/post-job?plan=featured',
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
        'Dedicated account manager'
      ],
      cta: 'Start Elite Hiring Pro',
      ctaLink: '/post-job?plan=unlimited',
    }
  ];

  // Calculate savings for yearly billing
  const calculateSavings = (monthlyPrice) => {
    const yearlyWithoutDiscount = monthlyPrice * 12;
    const discountedYearly = calculateAnnualPrice(monthlyPrice);
    return Math.round(yearlyWithoutDiscount - discountedYearly);
  };

  return (
    <section ref={sectionRef} className="pt-20 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Plans</h2>
          <div className="h-1 w-24 bg-[#D88A22] mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Choose the perfect plan for your martial arts school's hiring needs
          </p>

{/* Urgency Banner */}
<div className="max-w-3xl mx-auto mt-8 mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4 shadow-sm">
  <div className="flex items-center mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-base font-bold text-gray-900">
      We are opening enrollment for only 17 Founding Member Schools.
    </span>
  </div>
  <p className="text-sm text-gray-700 ml-9">
    Lock in lifetime discounted pricing before our national launch. Your rate will never increase as long as you remain active.
  </p>
</div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mt-8 mb-4">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white shadow-sm text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                transition-all duration-700 transform
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              <PricingCard 
                {...plan} 
                billingCycle={billingCycle}
                savings={billingCycle === 'yearly' ? calculateSavings(Number(plan.price)) : 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;