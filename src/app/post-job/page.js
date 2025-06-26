'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const PostJobPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('featured'); // Default to featured plan
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Choose Plan
    plan: 'featured',
    
    // Step 2: Job Details
    jobTitle: '',
    jobType: '',
    employmentType: '',
    martialArtStyle: '',
    experienceLevel: '',
    salary: '',
    salaryType: 'range',
    location: '',
    remote: false,
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    
    // Step 3: School Details
    schoolName: '',
    schoolLogo: null,
    schoolWebsite: '',
    schoolSize: '',
    schoolDescription: '',
    
    // Step 4: Application Settings
    receiveApplicationsBy: 'email',
    emailAddress: '',
    phoneNumber: '',
    applicationInstructions: '',
    requireVideo: true,
    videoInstructions: 'Please submit a 2-3 minute teaching demo showcasing your instruction style and communication skills.',
    redirectUrl: '',
  });
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Update plan selection if changed from pricing section
    if (name === 'plan') {
      setSelectedPlan(value);
    }
  };
  
  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would send the form data to your backend API
    console.log('Job posting form submitted:', formData);
    
    // Move to confirmation step
    setCurrentStep(5);
  };
  
  // Navigation between steps
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Price values for display
  const prices = {
    starter: 44,
    featured: 98,
    unlimited: 125
  };
  
  // Render the current step
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                              {/* Urgency Banner */}
    <div className="max-w-3xl mx-auto mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4 shadow-sm">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

 
              {/* Starter Plan */}
              <div 
                className={`
                  border rounded-lg p-6 cursor-pointer transition-all
                  ${selectedPlan === 'starter' 
                    ? 'border-[#D88A22] bg-yellow-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
                onClick={() => {
                  setSelectedPlan('starter');
                  setFormData(prev => ({ ...prev, plan: 'starter' }));
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                    {selectedPlan === 'starter' && (
                      <div className="h-3 w-3 bg-[#D88A22] rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold">${prices.starter}</span>
                  <span className="text-gray-500 ml-1">per post</span>
                </div>
                
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">30-day listing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Standard visibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Email applications</span>
                  </li>
                </ul>
              </div>
              
              {/* Featured Plan */}
              <div 
                className={`
                  border rounded-lg p-6 cursor-pointer transition-all relative
                  ${selectedPlan === 'featured' 
                    ? 'border-[#D88A22] bg-yellow-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
                onClick={() => {
                  setSelectedPlan('featured');
                  setFormData(prev => ({ ...prev, plan: 'featured' }));
                }}
              >
                <div className="absolute -top-3 right-4 bg-[#D88A22] text-white px-3 py-1 rounded-full text-xs font-bold">
                  Recommended
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Featured</h3>
                  <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                    {selectedPlan === 'featured' && (
                      <div className="h-3 w-3 bg-[#D88A22] rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold">${prices.featured}</span>
                  <span className="text-gray-500 ml-1">per post</span>
                </div>
                
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">60-day listing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Featured for 14 days</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Email + Dashboard</span>
                  </li>
                </ul>
              </div>
              
              {/* Unlimited Plan */}
              <div 
                className={`
                  border rounded-lg p-6 cursor-pointer transition-all
                  ${selectedPlan === 'unlimited' 
                    ? 'border-[#D88A22] bg-yellow-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
                onClick={() => {
                  setSelectedPlan('unlimited');
                  setFormData(prev => ({ ...prev, plan: 'unlimited' }));
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Unlimited</h3>
                  <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                    {selectedPlan === 'unlimited' && (
                      <div className="h-3 w-3 bg-[#D88A22] rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold">${prices.unlimited}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Unlimited job posts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">All Featured benefits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#D88A22] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={nextStep}>Continue</Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Job Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="jobTitle" className="block mb-2 font-medium">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="e.g. Head Karate Instructor"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobType" className="block mb-2 font-medium">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="instructor">Instructor</option>
                    <option value="head-coach">Head Coach</option>
                    <option value="assistant-coach">Assistant Coach</option>
                    <option value="program-director">Program Director</option>
                    <option value="youth-instructor">Youth Instructor</option>
                    <option value="admin">Admin/Support Staff</option>
                    <option value="management">Management</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="employmentType" className="block mb-2 font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    required
                  >
                    <option value="">Select Employment Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="martialArtStyle" className="block mb-2 font-medium">
                    Martial Art Style <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="martialArtStyle"
                    name="martialArtStyle"
                    value={formData.martialArtStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    required
                  >
                    <option value="">Select Style</option>
                    <option value="Karate">Karate</option>
                    <option value="BJJ">Brazilian Jiu-Jitsu</option>
                    <option value="Taekwondo">Taekwondo</option>
                    <option value="MMA">MMA</option>
                    <option value="Judo">Judo</option>
                    <option value="Muay Thai">Muay Thai</option>
                    <option value="Kung Fu">Kung Fu</option>
                    <option value="Aikido">Aikido</option>
                    <option value="Multiple">Multiple Styles</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="experienceLevel" className="block mb-2 font-medium">
                    Experience Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    required
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Beginner">Beginner (0-1 years)</option>
                    <option value="Intermediate">Intermediate (1-3 years)</option>
                    <option value="Experienced">Experienced (3-5 years)</option>
                    <option value="Advanced">Advanced (5+ years)</option>
                    <option value="Master">Master Level</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="salary" className="block mb-2 font-medium">
                    Salary/Pay
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="e.g. $40,000 - $60,000 or $25/hour"
                  />
                </div>
                
                <div>
                  <label htmlFor="salaryType" className="block mb-2 font-medium">
                    Pay Type
                  </label>
                  <select
                    id="salaryType"
                    name="salaryType"
                    value={formData.salaryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  >
                    <option value="range">Salary Range</option>
                    <option value="exact">Exact Salary</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="commission">Commission-Based</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block mb-2 font-medium">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="City, State or Remote"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <div className="mt-8">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#D88A22] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D88A22]"></div>
                      <span className="ms-3 font-medium text-gray-700">
                        This is a remote position
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block mb-2 font-medium">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="Provide a detailed description of the job..."
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="responsibilities" className="block mb-2 font-medium">
                  Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="List the key responsibilities of the role..."
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="requirements" className="block mb-2 font-medium">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="List qualifications, skills, and experience required..."
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="benefits" className="block mb-2 font-medium">
                  Benefits
                </label>
                <textarea
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="List any benefits offered with this position..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">School Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="schoolName" className="block mb-2 font-medium">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="e.g. Dragon Martial Arts Academy"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="schoolLogo" className="block mb-2 font-medium">
                  School Logo
                </label>
                <input
                  type="file"
                  id="schoolLogo"
                  name="schoolLogo"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended size: 400x400 pixels, max 2MB. PNG or JPG formats.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="schoolWebsite" className="block mb-2 font-medium">
                    School Website
                  </label>
                  <input
                    type="url"
                    id="schoolWebsite"
                    name="schoolWebsite"
                    value={formData.schoolWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="https://www.yourschool.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="schoolSize" className="block mb-2 font-medium">
                    School Size
                  </label>
                  <select
                    id="schoolSize"
                    name="schoolSize"
                    value={formData.schoolSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  >
                    <option value="">Select School Size</option>
                    <option value="Small">Small (under 100 students)</option>
                    <option value="Medium">Medium (100-300 students)</option>
                    <option value="Large">Large (300-500 students)</option>
                    <option value="VeryLarge">Very Large (500+ students)</option>
                    <option value="MultiLocation">Multi-Location</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="schoolDescription" className="block mb-2 font-medium">
                  About Your School <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="schoolDescription"
                  name="schoolDescription"
                  value={formData.schoolDescription}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="Tell potential instructors about your school, culture, and what makes it special..."
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Application Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  How would you like to receive applications? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="receiveApplicationsBy"
                      value="email"
                      checked={formData.receiveApplicationsBy === 'email'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Email - receive applications to your email address
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="receiveApplicationsBy"
                      value="dashboard"
                      checked={formData.receiveApplicationsBy === 'dashboard'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Dashboard - manage applications in your employer dashboard
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="receiveApplicationsBy"
                      value="redirect"
                      checked={formData.receiveApplicationsBy === 'redirect'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    External URL - send applicants to your application form
                  </label>
                </div>
              </div>
              
              {formData.receiveApplicationsBy === 'email' && (
                <div>
                  <label htmlFor="emailAddress" className="block mb-2 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="Where should we send applications?"
                    required={formData.receiveApplicationsBy === 'email'}
                  />
                </div>
              )}
              
              {formData.receiveApplicationsBy === 'redirect' && (
                <div>
                  <label htmlFor="redirectUrl" className="block mb-2 font-medium">
                    Application URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="redirectUrl"
                    name="redirectUrl"
                    value={formData.redirectUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="https://your-application-form.com"
                    required={formData.receiveApplicationsBy === 'redirect'}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 font-medium">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="applicationInstructions" className="block mb-2 font-medium">
                  Application Instructions (Optional)
                </label>
                <textarea
                  id="applicationInstructions"
                  name="applicationInstructions"
                  value={formData.applicationInstructions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                  placeholder="Any specific instructions for applicants..."
                ></textarea>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-start">
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      name="requireVideo"
                      checked={formData.requireVideo}
                      onChange={handleChange}
                      className="mr-2"
                    />
                  </div>
                  <div>
                    <span className="font-medium">Require Teaching Demo Video</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Request applicants to include a 2-3 minute teaching demo video with their application.
                      This helps you evaluate their teaching style and presence.
                    </p>
                  </div>
                </label>
                
                {formData.requireVideo && (
                  <div className="mt-4 ml-6">
                    <label htmlFor="videoInstructions" className="block mb-2 font-medium">
                      Video Instructions
                    </label>
                    <textarea
                      id="videoInstructions"
                      name="videoInstructions"
                      value={formData.videoInstructions}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                      placeholder="Instructions for the teaching demo video..."
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit}>
                Post Job
              </Button>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-green-100 rounded-full">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Job Posted Successfully!</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Your job listing has been created and is now live on MartialArtsJobsBoard.com
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/find-jobs">
                View Your Listing
              </Button>
              <Button variant="secondary" href="/">
                Back to Home
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Step indicator component
  const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className={`flex items-center ${i > 0 ? 'flex-1' : ''}`}>
              {i > 0 && (
                <div 
                  className={`flex-1 h-1 ${i < currentStep ? 'bg-[#D88A22]' : 'bg-gray-300'} transition-colors duration-300`}
                ></div>
              )}
              <div 
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                  ${i + 1 === currentStep 
                    ? 'bg-[#D88A22] text-white' 
                    : i + 1 < currentStep
                      ? 'bg-[#D88A22] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }
                  transition-colors duration-300
                `}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 px-1">
          <div className="text-center text-sm">
            <p className={currentStep >= 1 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>Plan</p>
          </div>
          <div className="text-center text-sm">
            <p className={currentStep >= 2 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>Job Details</p>
          </div>
          <div className="text-center text-sm">
            <p className={currentStep >= 3 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>School Info</p>
          </div>
          <div className="text-center text-sm">
            <p className={currentStep >= 4 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>Application</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Post a Job
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Find your next martial arts instructor and build your dream team
            </p>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {currentStep < 5 && (
              <StepIndicator currentStep={currentStep} totalSteps={4} />
            )}
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              {renderStep()}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PostJobPage;
