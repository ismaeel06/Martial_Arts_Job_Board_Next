'use client';

import { useState } from 'react';

const PricingCard = ({
  name,
  price,
  description,
  features,
  cta,
  ctaLink,
  recommended = false,
  highlightFeature = '',
  billingCycle = 'monthly',
  savings = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with commas
  const formattedPrice = Number(price).toLocaleString();
  
  return (
    <div className="relative">
      {/* Recommended Tag - Positioned OUTSIDE the card */}
      {recommended && (
        <div className="absolute -top-3 left-0 right-0 text-center z-10">
          <div className="inline-block bg-[#D88A22] text-white px-4 py-1 rounded-full text-xs font-bold shadow-md border border-[#D88A22]/20">
            Most Popular
          </div>
        </div>
      )}
      
      <div 
        className={`
          bg-white rounded-xl shadow-lg transition-all overflow-hidden
          hover:shadow-xl duration-300 flex flex-col h-full
          ${recommended ? 'border-2 border-[#D88A22] mt-' : 'border border-gray-100'}
          ${isHovered ? 'transform -translate-y-2' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background accent */}
        <div className={`absolute top-0 left-0 right-0 h-24 opacity-5 transition-opacity duration-300 ${isHovered && 'opacity-10'}`}>
          {recommended ? (
            <div className="absolute inset-0 bg-[#D88A22]"></div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black"></div>
          )}
        </div>
        
        <div className="relative p-8">
          {/* Plan Name */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">{name}</h3>
            {billingCycle === 'yearly' && savings > 0 && (
              <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md border border-green-100">
                Save ${savings}
              </div>
            )}
          </div>
          
          {/* Price */}
          <div className="mb-2 flex items-baseline">
            <span className="text-4xl font-bold">${formattedPrice}</span>
            <span className="text-gray-500 ml-2">
              {billingCycle === 'monthly' ? '/month' : '/year'}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">{description}</p>
          
          {/* Highlight Feature */}
          {highlightFeature && (
            <div className={`
              mb-6 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300
              ${recommended ? 'bg-[#D88A22]/10 text-[#D88A22]' : 'bg-black/5 text-gray-700'}
              ${isHovered && recommended ? 'bg-[#D88A22]/15' : ''}
              ${isHovered && !recommended ? 'bg-black/10' : ''}
            `}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {highlightFeature}
              </div>
            </div>
          )}
        
          {/* Features */}
          <div className="mb-8 grow">
            <div className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide">What&apos;s included:</div>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                      recommended ? 'text-[#D88A22]' : 'text-black'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA Button */}
          <button 
            className={`
              w-full py-3.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center
              ${recommended 
                ? `bg-[#D88A22] ${isHovered ? 'bg-[#c47a1c]' : ''} text-white shadow-lg shadow-[#D88A22]/20` 
                : `bg-black ${isHovered ? 'bg-zinc-800' : ''} text-white`
              }
            `}
          >
            <span>{cta}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          {/* Money-back guarantee */}
          {billingCycle === 'yearly' && (
            <div className="text-center text-xs text-gray-500 mt-4">
              30-day money-back guarantee
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;