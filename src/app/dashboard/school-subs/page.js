'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

export default function SchoolSubscriptionsPage() {
  const role = useSelector(state => state.role.value);
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Redirect non-school users
  React.useEffect(() => {
    if (role !== 'school' && role !== 'instructor') {
      router.push('/dashboard');
    }
  }, [role, router]);

  // Calculate annual prices (15% discount)
  const calculateAnnualPrice = (monthlyPrice) => {
    const annual = monthlyPrice * 12;
    const discount = annual * 0.15; // 15% discount
    return Math.round(annual - discount);
  };

  // Mock data for the current subscription
  const currentSubscription = {
    plan: 'Featured',
    startDate: '2025-02-15',
    nextBilling: '2025-07-15',
    amount: billingCycle === 'monthly' ? '$98.00' : `$${calculateAnnualPrice(98)}.00`,
    status: 'Active',
    jobsPosted: 3,
    jobsRemaining: 1,
    renewalDate: '2025-07-15',
  };
  
  if (role !== 'school' && role!=='instructor') return null;
  
  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-2">
          Active Subscriptions
        </h1>
        <p className="text-gray-600">
          View and manage your subscription plans for job postings.
        </p>
      </div>
      
      {/* Current Subscription Card */}
      <div className="bg-white/95 rounded-2xl shadow-xl p-6 mb-8 border border-orange-200 animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Your Current Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <span className="text-gray-600 block mb-1">Plan:</span>
              <span className="text-xl font-bold text-black flex items-center">
                {currentSubscription.plan}
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                  {currentSubscription.status}
                </span>
              </span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 block mb-1">Billing:</span>
              <span className="text-lg font-semibold text-black">{currentSubscription.amount}/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 block mb-1">Next Payment:</span>
              <span className="text-base font-medium text-black">{currentSubscription.nextBilling}</span>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-gray-600 block mb-1">Jobs Posted:</span>
              <span className="text-base font-medium text-black">{currentSubscription.jobsPosted}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 block mb-1">Jobs Remaining:</span>
              <span className="text-base font-medium text-black">{currentSubscription.jobsRemaining}</span>
            </div>
            <div className="mt-6">
              <Button variant="secondary" className="w-full md:w-auto">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Your Plan Section */}
      <div className="bg-white/95 rounded-2xl shadow-xl p-6 border border-orange-200 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-black">Upgrade Your Plan</h2>
          <p className="text-gray-600">Select a plan that fits your school&apos;s hiring needs</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
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

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white transition-transform hover:shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Starter</h3>
              <div className="text-3xl font-bold mb-1">
                ${billingCycle === 'monthly' ? '44' : calculateAnnualPrice(44)}
                <span className="text-sm text-gray-500 font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Perfect for small schools hiring occasionally</p>
              <hr className="my-4" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">30-day listing</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Standard visibility</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Email application forwarding</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Basic analytics</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Button 
                variant="secondary" 
                className="w-full flex items-center justify-center opacity-100"
              >
                Get Started <FaArrowRight className="ml-1" />
              </Button>
            </div>
          </div>

          {/* Featured Plan - Highlighted as Current */}
          <div className="border-2 border-[#D88A22] rounded-xl shadow-md overflow-hidden bg-white relative transform scale-105 shadow-lg">
            <div className="absolute top-0 left-0 right-0 bg-[#D88A22] text-white text-center text-xs py-1 font-medium">
              CURRENT PLAN
            </div>
            <div className="p-6 pt-8">
              <h3 className="text-lg font-bold mb-1 text-[#D88A22]">Featured</h3>
              <div className="text-3xl font-bold mb-1">
                ${billingCycle === 'monthly' ? '98' : calculateAnnualPrice(98)}
                <span className="text-sm text-gray-500 font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Best for schools looking for top talent</p>
              <hr className="my-4" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FaCheck className="text-[#D88A22] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">60-day listing</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-[#D88A22] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Featured placement for 14 days</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-[#D88A22] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Email + Dashboard applications</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-[#D88A22] mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Promoted in email newsletter</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Button disabled className="w-full bg-gray-100 text-gray-500 cursor-not-allowed">
                Current Plan
              </Button>
            </div>
          </div>

          {/* Elite Hiring Pro Plan */}
          <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white transition-transform hover:shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Elite Hiring Pro</h3>
              <div className="text-3xl font-bold mb-1">
                ${billingCycle === 'monthly' ? '125' : calculateAnnualPrice(125)}
                <span className="text-sm text-gray-500 font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">For schools with continuous hiring needs</p>
              <hr className="my-4" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Unlimited job posts</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">All Featured benefits</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Priority support</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Candidate talent pool access</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Button variant="primary" className="w-full flex items-center justify-center">
                Upgrade <FaArrowRight className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Compare plans link */}
        <div className="text-center mt-8">
          <a href="/pricing" className="text-[#D88A22] hover:underline font-medium inline-flex items-center">
            Compare all plans and features <FaArrowRight className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}