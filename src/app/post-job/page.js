'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import {useRouter} from 'next/navigation';

const PostJobPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('featured'); // Default to featured plan

  // Check authentication and permissions on page load
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');
    const selectedPlan = localStorage.getItem('selectedPlan');
    
    if (!userLoggedIn) {
      // Not logged in, redirect to login
      router.replace('/login');
      return;
    }
    
    if (userType !== 'employer') {
      // Logged in but not an employer, redirect to employer signup
      router.replace('/employer-signup');
      return;
    }
    
    if (!selectedPlan) {
      // Employer but no plan, redirect to pricing
      router.replace('/pricing');
      return;
    }
    
    // User is logged in, is an employer, and has a plan - allow access
    setIsLoading(false);
  }, [router]);


  // Current tag input state
  const [currentInput, setCurrentInput] = useState({
    requirement: "",
    responsibility: "",
    benefit: ""
  });
  
  // Add field errors state
  const [fieldErrors, setFieldErrors] = useState({
    // Step 2 errors
    title: "",
    martial_art: "",
    job_type: "",
    location: "",
    description: "",
    requirements: "",
    responsibilities: "",
    
    // Step 3 errors
    emailAddress: "",
    redirectUrl: "",
  });
  
  // Form state - removed schoolName, schoolLogo, schoolWebsite, schoolSize, schoolDescription
  const [formData, setFormData] = useState({

    plan: 'featured',
    title: '',
    martial_art: '',
    job_type: '',
    salary_range: '',
    location: '',
    remote: false,
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    
    // Step 3: Application Settings (formerly step 4)
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
    
    // Clear validation error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle tag input changes
  const handleTagInputChange = (e, field) => {
    setCurrentInput({
      ...currentInput,
      [field]: e.target.value
    });
  };
  
  // Add tag to a field
  const addTag = (field) => {
    const inputField = field === 'requirements' ? 'requirement' : 
                       field === 'responsibilities' ? 'responsibility' : 'benefit';
                       
    const value = currentInput[inputField]?.trim();
    if (!value) return; // Don't add empty tags
    
    if (!formData[field].includes(value)) {
      const updatedTags = [...formData[field], value];
      setFormData(prev => ({
        ...prev,
        [field]: updatedTags
      }));
      
      // Clear the input
      setCurrentInput(prev => ({
        ...prev,
        [inputField]: ""
      }));
      
      // Clear validation error
      if (fieldErrors[field]) {
        setFieldErrors(prev => ({
          ...prev,
          [field]: ""
        }));
      }
    }
  };
  
  // Remove tag from a field
  const removeTag = (field, tagToRemove) => {
    const updatedTags = formData[field].filter(tag => tag !== tagToRemove);
    setFormData(prev => ({
      ...prev,
      [field]: updatedTags
    }));
    
    // Re-validate if empty after removal
    if (updatedTags.length === 0 && (field === 'requirements' || field === 'responsibilities')) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: `Please add at least one ${field.slice(0, -1)}`
      }));
    }
  };
  
  // Handle keypress for tag inputs
  const handleTagKeyPress = (e, field) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(field);
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
  
  // Email validation function
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate step 2 fields
  const validateStep2 = () => {
    const errors = {
      title: "",
      martial_art: "",
      job_type: "",
      location: "",
      description: "",
      requirements: "",
      responsibilities: "",
    };
    
    let isValid = true;
    
    // Check required fields
    if (!formData.title.trim()) {
      errors.title = "Job title is required";
      isValid = false;
    }
    
    if (!formData.martial_art) {
      errors.martial_art = "Please select a martial art";
      isValid = false;
    }
    
    if (!formData.job_type) {
      errors.job_type = "Please select a job type";
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      errors.description = "Job description is required";
      isValid = false;
    }
    
    if (formData.requirements.length === 0) {
      errors.requirements = "Please add at least one requirement";
      isValid = false;
    }
    
    if (formData.responsibilities.length === 0) {
      errors.responsibilities = "Please add at least one responsibility";
      isValid = false;
    }
    
    // Update error state
    setFieldErrors(prev => ({
      ...prev,
      ...errors
    }));
    
    return isValid;
  };
  
  // Validate step 3 fields
  const validateStep3 = () => {
    const errors = {
      emailAddress: "",
      redirectUrl: "",
    };
    
    let isValid = true;
    
    // Validate email if that option is selected
    if (formData.receiveApplicationsBy === 'email') {
      if (!formData.emailAddress.trim()) {
        errors.emailAddress = "Email address is required";
        isValid = false;
      } else if (!isEmailValid(formData.emailAddress)) {
        errors.emailAddress = "Please enter a valid email address";
        isValid = false;
      }
    }
    
    // Validate redirect URL if that option is selected
    if (formData.receiveApplicationsBy === 'redirect') {
      if (!formData.redirectUrl.trim()) {
        errors.redirectUrl = "Application URL is required";
        isValid = false;
      } else if (!formData.redirectUrl.startsWith('http')) {
        errors.redirectUrl = "Please enter a valid URL starting with http:// or https://";
        isValid = false;
      }
    }
    
    // Update error state
    setFieldErrors(prev => ({
      ...prev,
      ...errors
    }));
    
    return isValid;
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate step 2 before submission
    if (!validateStep3()) {
      return;
    }
    
    // Prepare data for API submission
    const jobData = {
      // Core job data
      title: formData.title,
      description: formData.description,
      martial_art: formData.martial_art,
      job_type: formData.job_type,
      salary_range: formData.salary_range,
      location: formData.location,
      
      // Arrays for requirements, responsibilities, benefits
      requirements: formData.requirements,
      responsibilities: formData.responsibilities,
      benefits: formData.benefits,
    }
    
    // Log the job data that would be sent to the API
    console.log('Job posting data to be sent:', jobData);
    
    // Here you would make the actual API call
    // const response = await fetch('/api/jobs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(jobData)
    // });
    
    // Move to confirmation step
    setCurrentStep(3); // Changed from 5 to 4 since we removed a step
  };
  
  // Navigation between steps
  const nextStep = () => {
    // If we're on step 2, validate before proceeding
    if (currentStep === 1) {
      if (!validateStep2()) {
        return; // Stop if validation fails
      }
    }
    
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
  
  // UI component for displaying tags
  const TagDisplay = ({ tags, onRemove, field }) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <div 
            key={`${field}-${index}`}
            className="bg-[#F9E9D1] border border-[#D88A22] text-[#8B5A13] px-2 py-1 rounded-md text-sm flex items-center"
          >
            <span className="max-w-[200px] truncate">{tag}</span>
            <button
              type="button"
              onClick={() => onRemove(field, tag)}
              className="ml-1 text-[#8B5A13] hover:text-[#D88A22] transition"
              aria-label={`Remove ${tag}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  // Error message component
  const ErrorMessage = ({ message }) => {
    if (!message) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
        {message}
      </div>
    );
  };
  
  // Render the current step
  const renderStep = () => {
    switch(currentStep) {
      
      case 1:
        // Updated Job Details step with validation
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Job Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 font-medium">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${fieldErrors.title ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                  placeholder="e.g. Head Karate Instructor"
                  required
                />
                <ErrorMessage message={fieldErrors.title} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="martial_art" className="block mb-2 font-medium">
                    Martial Art <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="martial_art"
                    name="martial_art"
                    value={formData.martial_art}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${fieldErrors.martial_art ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
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
                  <ErrorMessage message={fieldErrors.martial_art} />
                </div>
                
                <div>
                  <label htmlFor="job_type" className="block mb-2 font-medium">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="job_type"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${fieldErrors.job_type ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  <ErrorMessage message={fieldErrors.job_type} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="salary_range" className="block mb-2 font-medium">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salary_range"
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="e.g. $40,000 - $60,000 or $25/hour"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block mb-2 font-medium">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`flex-grow px-4 py-3 border ${fieldErrors.location ? 'border-red-300' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                      placeholder="City, State or Remote"
                      required
                    />
                    <div className="inline-flex items-center px-3 border border-l-0 border-gray-300 rounded-r-md bg-gray-50">
                      <input
                        type="checkbox"
                        name="remote"
                        id="remote"
                        checked={formData.remote}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#D88A22] accent-[#D88A22] rounded focus:ring-[#D88A22]"
                      />
                      <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                        Remote
                      </label>
                    </div>
                  </div>
                  <ErrorMessage message={fieldErrors.location} />
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
                  className={`w-full px-4 py-3 border ${fieldErrors.description ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                  placeholder="Provide a detailed description of the job..."
                  required
                ></textarea>
                <ErrorMessage message={fieldErrors.description} />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentInput.requirement}
                    onChange={(e) => handleTagInputChange(e, 'requirement')}
                    onKeyPress={(e) => handleTagKeyPress(e, 'requirements')}
                    className={`flex-1 px-4 py-3 border ${fieldErrors.requirements ? 'border-red-300' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                    placeholder="e.g. Black Belt in Karate"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('requirements')}
                    className="px-4 py-3 bg-[#D88A22] text-white font-medium rounded-r-md hover:bg-[#b86f1a] transition"
                    disabled={!currentInput.requirement}
                  >
                    Add
                  </button>
                </div>
                
                <TagDisplay 
                  tags={formData.requirements} 
                  onRemove={removeTag} 
                  field="requirements" 
                />
                <ErrorMessage message={fieldErrors.requirements} />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">
                  Responsibilities <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentInput.responsibility}
                    onChange={(e) => handleTagInputChange(e, 'responsibility')}
                    onKeyPress={(e) => handleTagKeyPress(e, 'responsibilities')}
                    className={`flex-1 px-4 py-3 border ${fieldErrors.responsibilities ? 'border-red-300' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                    placeholder="e.g. Teach group/private classes"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('responsibilities')}
                    className="px-4 py-3 bg-[#D88A22] text-white font-medium rounded-r-md hover:bg-[#b86f1a] transition"
                    disabled={!currentInput.responsibility}
                  >
                    Add
                  </button>
                </div>
                
                <TagDisplay 
                  tags={formData.responsibilities} 
                  onRemove={removeTag} 
                  field="responsibilities" 
                />
                <ErrorMessage message={fieldErrors.responsibilities} />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">
                  Benefits
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentInput.benefit}
                    onChange={(e) => handleTagInputChange(e, 'benefit')}
                    onKeyPress={(e) => handleTagKeyPress(e, 'benefits')}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="e.g. Free training"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('benefits')}
                    className="px-4 py-3 bg-[#D88A22] text-white font-medium rounded-r-md hover:bg-[#b86f1a] transition"
                    disabled={!currentInput.benefit}
                  >
                    Add
                  </button>
                </div>
                
                <TagDisplay 
                  tags={formData.benefits} 
                  onRemove={removeTag} 
                  field="benefits" 
                />
              </div>
            </div>
            
<div className="flex justify-between mt-8">
  <Button onClick={() => window.location.href = '/'}>
    Back to Home
  </Button>
  <Button onClick={nextStep}>
    Continue
  </Button>
</div>
          </div>
        );
      
      case 2:
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
                      className="mr-2 accent-[#D88A22]"
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
                      className="mr-2 accent-[#D88A22]"
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
                      className="mr-2 accent-[#D88A22]"
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
                    className={`w-full px-4 py-3 border ${fieldErrors.emailAddress ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                    placeholder="Where should we send applications?"
                    required={formData.receiveApplicationsBy === 'email'}
                  />
                  <ErrorMessage message={fieldErrors.emailAddress} />
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
                    className={`w-full px-4 py-3 border ${fieldErrors.redirectUrl ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                    placeholder="https://your-application-form.com"
                    required={formData.receiveApplicationsBy === 'redirect'}
                  />
                  <ErrorMessage message={fieldErrors.redirectUrl} />
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
                      className="mr-2 accent-[#D88A22]"
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
              <Button onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit}>
                Post Job
              </Button>
            </div>
          </div>
        );
        
      case 3:
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
  
  // Step indicator component - Updated to only show 3 steps instead of 4
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
            <p className={currentStep >= 1 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>Job Details</p>
          </div>
          <div className="text-center text-sm">
            <p className={currentStep >= 2 ? 'font-medium text-[#D88A22]' : 'text-gray-500'}>Application Details</p>
          </div>
        </div>
      </div>
    );
  };

    if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D88A22]"></div>
        </div>
      </MainLayout>
    );
  }

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
            {currentStep < 3 && (
              <StepIndicator currentStep={currentStep} totalSteps={2} />
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