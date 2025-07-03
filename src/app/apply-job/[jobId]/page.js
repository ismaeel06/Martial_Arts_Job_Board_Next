'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

const ApplyJobPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId;
  
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form validation errors
  const [fieldErrors, setFieldErrors] = useState({
    cover_letter: '',
    resume_file: '',
    video_file: '',
  });

  // Form state
  const [formData, setFormData] = useState({
    cover_letter: '',
    resume_file: null,
    video_file: null,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // File size validations
    if (fieldName === 'resume_file') {
      // 5MB limit for resume
      if (file.size > 5 * 1024 * 1024) {
        setFieldErrors(prev => ({
          ...prev,
          resume_file: 'Resume file size must be less than 5MB'
        }));
        return;
      }
    } else if (fieldName === 'video_file') {
      // 100MB limit for video
      if (file.size > 20 * 1024 * 1024) {
        setFieldErrors(prev => ({
          ...prev,
          video_file: 'Video file size must be less than 20MB'
        }));
        return;
      }
    }
    
    // Update form data with the file
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
    
    // Clear validation error
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {
      cover_letter: '',
      resume_file: '',
      video_file: '',
    };
    
    let isValid = true;
    
    // Cover letter validation
    if (!formData.cover_letter.trim()) {
      errors.cover_letter = 'Cover letter is required';
      isValid = false;
    } else if (formData.cover_letter.length < 100) {
      errors.cover_letter = 'Cover letter should be at least 100 characters';
      isValid = false;
    }
    
    // Resume file validation
    if (!formData.resume_file) {
      errors.resume_file = 'Resume is required';
      isValid = false;
    }
    
    // Video is optional, but if provided should be valid
    if (formData.video_file && !['video/mp4', 'video/quicktime', 'video/webm'].includes(formData.video_file.type)) {
      errors.video_file = 'Please upload a valid video file (MP4, MOV, or WebM)';
      isValid = false;
    }
    
    // Update error state
    setFieldErrors(errors);
    
    return isValid;
  };

    // Upload file to Cloudinary
  const uploadToCloudinary = async (file, fileType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      
      // Set folder based on file type
      const folder = fileType === 'resume' ? 'martial_arts_resumes' : 'martial_arts_videos';
      formData.append('folder', folder);
      
      // Select the right Cloudinary resource type based on file type
      const resourceType = fileType === 'resume' ? 'raw' : 'video';
      
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!uploadResponse.ok) {
        throw new Error(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} upload failed`);
      }
      
      const uploadData = await uploadResponse.json();
      return uploadData.secure_url;
    } catch (error) {
      console.error(`${fileType} upload error:`, error);
      throw new Error(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} upload failed. Please try again.`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setGeneralError('Please correct the errors in the form');
      window.scrollTo(0, 0);
      return;
    }
    
    setLoading(true);
    setGeneralError('');
    
    try {

      let resumeUrl = '';
      let videoUrl = '';
      
      // Upload files to Cloudinary (only after validation passes)
      if (formData.resume_file) {
        resumeUrl = await uploadToCloudinary(formData.resume_file, 'resume');
      }
      
      if (formData.video_file) {
        videoUrl = await uploadToCloudinary(formData.video_file, 'video');
      }
      
      // Create the submission object
      const applicationData = {
        job_id: jobId,
        cover_letter: formData.cover_letter,
        resume: resumeUrl, // In real implementation, this would be a file URL
        video: videoUrl // In real implementation, this would be a file URL
      };
      
      // Log data being sent for now
      console.log("Application data being submitted:", applicationData);
      
      // API call (commented out for now)
      /*
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Application submission failed");
      
      // Success - redirect to confirmation page
      router.push('/apply/success');
      */
      
      // For demo purposes, just go to next step
      setCurrentStep(2);
      
    } catch (err) {
      setGeneralError(err.message || "Something went wrong with your application");
    } finally {
      setLoading(false);
    }
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

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Apply for Position
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Submit your application and showcase your martial arts teaching skills
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {currentStep === 1 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Application Details</h2>
                
                {generalError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-md px-4 py-2 mb-6">
                    {generalError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cover Letter */}
                  <div>
                    <label htmlFor="cover_letter" className="block mb-2 font-medium">
                      Cover Letter <span className="text-red-500">*</span>
                      <span className="text-gray-400 text-xs ml-2">Min. 100 characters</span>
                    </label>
                    <textarea
                      id="cover_letter"
                      name="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleChange}
                      rows="8"
                      className={`w-full px-4 py-3 border ${fieldErrors.cover_letter ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]`}
                      placeholder="Introduce yourself, explain why you're interested in this position, and highlight your relevant experience and qualifications..."
                      required
                    ></textarea>
                    <ErrorMessage message={fieldErrors.cover_letter} />
                  </div>
                  
                  {/* Resume Upload */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Resume <span className="text-red-500">*</span>
                      <span className="text-gray-400 text-xs ml-2">(PDF, DOC, or DOCX, max 5MB)</span>
                    </label>
                    
                    <div 
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${fieldErrors.resume_file ? 'border-red-300' : 'border-gray-300'} border-dashed rounded-xl hover:border-[#D88A22] transition cursor-pointer`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.add('border-[#D88A22]');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove('border-[#D88A22]');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove('border-[#D88A22]');
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                          
                          if (validTypes.includes(file.type)) {
                            if (file.size <= 5 * 1024 * 1024) { // 5MB limit
                              handleFileChange({ target: { files: [file] } }, 'resume_file');
                            } else {
                              setFieldErrors(prev => ({
                                ...prev,
                                resume_file: 'Resume file size must be less than 5MB'
                              }));
                            }
                          } else {
                            setFieldErrors(prev => ({
                              ...prev,
                              resume_file: 'Please upload a PDF, DOC, or DOCX file'
                            }));
                          }
                        }
                      }}
                      onClick={() => document.getElementById('resume-upload').click()}
                    >
                      <div className="space-y-2 text-center">
                        {formData.resume_file ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="flex justify-center text-sm text-gray-600">
                              <p className="text-[#D88A22] font-medium truncate max-w-xs">
                                {formData.resume_file.name}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {(formData.resume_file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <span className="relative cursor-pointer rounded-md font-medium text-[#D88A22] hover:text-[#b86f1a]">
                                Upload resume
                              </span>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, or DOCX up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Hidden file input */}
                    <input 
                      id="resume-upload" 
                      name="resume-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => handleFileChange(e, 'resume_file')}
                    />
                    
                    {formData.resume_file && (
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-1 mt-2">
                        <span className="text-xs text-gray-500 truncate">
                          Resume ready for upload
                        </span>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({
                              ...prev,
                              resume_file: null
                            }));
                          }}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove resume"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    <ErrorMessage message={fieldErrors.resume_file} />
                  </div>
                  
                  {/* Teaching Demo Video */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Teaching Demo Video
                      <span className="text-gray-400 text-xs ml-2">(MP4, MOV, or WebM, max 20MB)</span>
                    </label>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Video Upload */}
                      <div className="flex-grow">
                        <div 
                          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${fieldErrors.video_file ? 'border-red-300' : 'border-gray-300'} border-dashed rounded-xl hover:border-[#D88A22] transition cursor-pointer`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.currentTarget.classList.add('border-[#D88A22]');
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.currentTarget.classList.remove('border-[#D88A22]');
                          }}
onDrop={(e) => {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.classList.remove('border-[#D88A22]');
  
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    
    if (validTypes.includes(file.type)) {
      if (file.size <= 20 * 1024 * 1024) { // 20MB limit (changed from 100MB)
        handleFileChange({ target: { files: [file] } }, 'video_file');
      } else {
        setFieldErrors(prev => ({
          ...prev,
          video_file: 'Video file size must be less than 20MB'
        }));
      }
    } else {
      setFieldErrors(prev => ({
        ...prev,
        video_file: 'Please upload an MP4, MOV, or WebM video file'
      }));
    }
  }
}}
                          onClick={() => document.getElementById('video-upload').click()}
                        >
                          <div className="space-y-2 text-center">
                            {formData.video_file ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex justify-center text-sm text-gray-600">
                                  <p className="text-[#D88A22] font-medium truncate max-w-xs">
                                    {formData.video_file.name}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {(formData.video_file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                  <span className="relative cursor-pointer rounded-md font-medium text-[#D88A22] hover:text-[#b86f1a]">
                                    Upload teaching demo
                                  </span>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  MP4, MOV, or WebM up to 20MB
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Hidden video input */}
                        <input 
                          id="video-upload" 
                          name="video-upload" 
                          type="file" 
                          className="hidden" 
                          accept="video/mp4,video/quicktime,video/webm"
                          onChange={(e) => handleFileChange(e, 'video_file')}
                        />
                        
                        {formData.video_file && (
                          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-1 mt-2">
                            <span className="text-xs text-gray-500 truncate">
                              Video ready for upload
                            </span>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData(prev => ({
                                  ...prev,
                                  video_file: null
                                }));
                              }}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove video"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                        
                        <ErrorMessage message={fieldErrors.video_file} />
                      </div>
                      
                      {/* Video Preview */}
                      {formData.video_file && (
                        <div className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                          <video 
                            className="w-full h-full object-cover" 
                            controls
                            src={URL.createObjectURL(formData.video_file)}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                    
                    {/* Tips & Instructions */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <p className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#D88A22] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          A teaching demo video greatly increases your chances of getting hired. 
                          Consider including clips of your teaching style, technical demonstrations, or 
                          class management. Keep it under 2-3 minutes for best results.
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            ) : (
              // Success page (Step 2)
              <div className="text-center py-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-green-100 rounded-full">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                  Your application has been successfully submitted. The school will review your details and contact you soon.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button href="/dashboard">
                    View Applications
                  </Button>
                  <Button variant="secondary" href="/">
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ApplyJobPage;