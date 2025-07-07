"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/components/CloudinaryUploader";


const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";
const ACCENT_COLOR = "#D88A22";

// Updated constants for dropdowns
const MARTIAL_ARTS_STYLES = [
  "Karate",
  "Taekwondo",
  "Brazilian Jiu-Jitsu",
  "Judo",
  "Muay Thai",
  "Boxing",
  "Kickboxing",
  "Kung Fu",
  "Wrestling",
  "MMA",
  "Aikido",
  "Krav Maga",
  "Capoeira",
  "Wing Chun",
  "Hapkido",
  "Other",
];

const SPECIALTIES = [
  "Shotokan Karate",
  "Self-Defense",
  "Youth Karate",
  "Competition Training",
  "Traditional Forms",
  "Weapons Training",
  "Sport Karate",
  "Ground Fighting",
  "Striking Techniques",
  "Grappling",
  "Fitness Conditioning",
  "Other",
];

const AGE_GROUPS = [
  "Children (4-6)",
  "Children (7-12)",
  "Teens (13-17)",
  "Adults (18+)",
  "Seniors (65+)",
  "All Ages",
];

const AVAILABILITY_STATUSES = [
  "Available for new positions",
  "Open to offers",
  "Not currently available",
  "Available for consulting only",
];

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Freelance",
];

const START_DATES = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "Within 3 months",
  "Flexible",
];

const BELT_RANKS = [
  "White Belt",
  "Yellow Belt",
  "Orange Belt",
  "Green Belt",
  "Blue Belt",
  "Purple Belt",
  "Brown Belt",
  "1st Degree Black Belt",
  "2nd Degree Black Belt",
  "3rd Degree Black Belt",
  "4th Degree Black Belt",
  "5th Degree Black Belt",
  "6th Degree Black Belt",
  "7th Degree Black Belt",
  "8th Degree Black Belt",
  "9th Degree Black Belt",
  "10th Degree Black Belt",
  "Other",
];

// Keep all your dropdown constants

export default function InstructorSignUpPage() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState(null);
  const [form, setForm] = useState({
    location: "",
    belt_rank: "",
    experience: "",
    bio: "",
    styles: [],
    specialties: [],
    age_groups: [],
    status: "",
    employment_type: "",
    start_date: "",
    willing_relocate: false,
    remote_teaching: false,
    achievements: [],
    education: [],
    certifications: [],
    video_url: "",
      video_file: null // Add this new field
  });

    // For tag-based inputs
const [currentInput, setCurrentInput] = useState({
  style: "",
  specialty: "",
  age_group: "",
  achievement: "",
  education: "",
  certification: ""
});
  
  // Keep your fieldErrors and other state variables
  const [fieldErrors, setFieldErrors] = useState({
    location: "",
    belt_rank: "",
    experience: "",
    bio: "",
    styles: "",
    specialties: "",
    age_groups: "",
    status: "",
    employment_type: "",
    start_date: "",
      video_url: "",
  });
  
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // Field-specific validation
  const validateFields = (fields = form) => {
    const errors = {
      location: "",
      belt_rank: "",
      experience: "",
      bio: "",
      styles: "",
      specialties: "",
      age_groups: "",
      status: "",
      employment_type: "",
      start_date: "",
    };

    // Experience validation
    if (fields.experience && (isNaN(fields.experience) || Number(fields.experience) < 0)) {
      errors.experience = "Please enter a valid number of years.";
    }
    
    // Bio validation
    if (fields.bio && fields.bio.length < 50) {
      errors.bio = "Bio should be at least 50 characters.";
    }
    
    // Multi-select validations
    if (fields.styles && fields.styles.length === 0) {
      errors.styles = "Please select at least one martial art style.";
    }
    
    if (fields.specialties && fields.specialties.length === 0) {
      errors.specialties = "Please select at least one specialty.";
    }
    
    if (fields.age_groups && fields.age_groups.length === 0) {
      errors.age_groups = "Please select at least one age group.";
    }

    return errors;
  };

  // General validation for empty required fields
  const checkAllFieldsFilled = (fields = form) => {
    return (
      !fields.location ||
      !fields.belt_rank ||
      !fields.experience ||
      !fields.bio ||
      fields.styles.length === 0 ||
      fields.specialties.length === 0 ||
      fields.age_groups.length === 0 ||
      !fields.status ||
      !fields.employment_type ||
      !fields.start_date
    );
  };

  const handleFileSelect = (file) => {
  setVideoFile(file);
};

// Add this handler for file validation errors
const handleFileError = (errorMessage) => {
  setFieldErrors(prev => ({
    ...prev,
    video_url: errorMessage
  }));
};


    // Add this handler for Cloudinary uploads
  const handleUploadSuccess = (resourceInfo, field) => {
    setForm(prev => ({
      ...prev,
      [field]: resourceInfo.url
    }));

        // Clear any errors for this field
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    // Validate fields as user types
    const updatedForm = { 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    };
    
    const errors = validateFields(updatedForm);
    setFieldErrors(errors);

    // General error for empty fields
    if (checkAllFieldsFilled(updatedForm)) {
      setGeneralError("All required fields must be completed.");
    } else {
      setGeneralError("");
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
  const inputField = field === 'achievements' ? 'achievement' : 
                     field === 'certifications' ? 'certification' : field;
  
  const value = currentInput[inputField]?.trim();
  if (!value) return; // Don't add empty tags
  
  if (!form[field].includes(value)) {
    const updatedTags = [...form[field], value];
    setForm(prev => ({
      ...prev,
      [field]: updatedTags
    }));
    
    // Clear the input
    setCurrentInput(prev => ({
      ...prev,
      [inputField]: ""
    }));
    
    // Update validation
    const errors = validateFields({
      ...form,
      [field]: updatedTags
    });
    setFieldErrors(errors);
  }
};

    // Add tag from dropdown
  const addTagFromDropdown = (field, value) => {
    if (!value || form[field].includes(value)) return;
    
    const updatedTags = [...form[field], value];
    setForm(prev => ({
      ...prev,
      [field]: updatedTags
    }));
    
    // Update validation
    const errors = validateFields({
      ...form,
      [field]: updatedTags
    });
    setFieldErrors(errors);
  };
  
  // Remove tag from a field
  const removeTag = (field, tagToRemove) => {
    const updatedTags = form[field].filter(tag => tag !== tagToRemove);
    setForm(prev => ({
      ...prev,
      [field]: updatedTags
    }));
    
    // Update validation
    const errors = validateFields({
      ...form,
      [field]: updatedTags
    });
    setFieldErrors(errors);
  };
  
  // Handle keypress for tag inputs
const handleTagKeyPress = (e, field) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag(field);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check for empty fields
  if (checkAllFieldsFilled()) {
    setGeneralError("All required fields must be completed.");
    return;
  } else {
    setGeneralError("");
  }

  // Validate fields before submit
  const errors = validateFields();
  setFieldErrors(errors);

  // If any field-specific error exists, do not submit
  if (Object.values(errors).some(error => error !== "")) {
    return;
  }

  setLoading(true);
  try {
    let videoUrl = form.video_url;
    
    // If there's a video file to upload, handle the Cloudinary upload first
    if (videoFile) {
      try {
        
        // Create a FormData object to send the file to Cloudinary
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'martial_arts_videos');
        
        // Upload to Cloudinary
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        if (!uploadResponse.ok) {
          throw new Error('Video upload failed');
        }
        
        const uploadData = await uploadResponse.json();
        videoUrl = uploadData.secure_url;
        
      } catch (error) {
        console.error('Video upload error:', error);
        setGeneralError("Video upload failed. Please try again.");
        setLoading(false);
        return; // Stop form submission if video upload fails
      }
    }


  //   Create payload with exactly the field names from your spec
    const formData = {
      location: form.location,
      belt_rank: form.belt_rank,
      experience: parseInt(form.experience, 10) || 0,
      bio: form.bio,
      styles: form.styles,
      specialties: form.specialties,
      age_groups: form.age_groups,
      status: form.status,
      employment_type: form.employment_type,
      start_date: form.start_date,
      willing_relocate: form.willing_relocate,
      remote_teaching: form.remote_teaching,
      achievements: form.achievements,
      education: form.education,
      certifications: form.certifications,
      video_url: videoUrl || ""
    };
    
    // Log data being sent
    console.log("Instructor profile data being submitted:", formData);
    
    // API call (commented for now)
    // const res = await fetch("/api/instructors/profile", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });
    
    // const data = await res.json();
    // if (!res.ok) throw new Error(data.message || "Profile creation failed");

        localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userType', 'instructor');

        router.push('/instructor-CTA');
    
  } catch (err) {
    setGeneralError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#f3e8d1] px-2 py-8 flex flex-col items-center">
      {/* Logo and Site Name - keep as is */}
      <div className="flex flex-col sm:flex-row items-center mb-6 mt-4 gap-3">
        <image
          src={LOGO_SRC}
          alt="Martial Arts Job Board Logo"
          className="h-14 w-14 sm:h-16 sm:w-16"
        />
        <span className={`text-2xl sm:text-3xl font-bold ${PRIMARY_COLOR} mt-2 sm:mt-0 sm:ml-3 text-center sm:text-left`}>
          {SITE_NAME}
        </span>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10 mb-8 space-y-6"
        style={{ minWidth: "340px" }}
      >
        {/* Title and Description - keep as is */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Instructor Profile</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Complete your instructor profile to connect with martial arts schools and students.
          </p>
        </div>

        {/* Section: Basic Information - keep location, belt_rank, experience, bio as is */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Basic Information</h2>
          
          {/* Location and Belt Rank */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                placeholder="City, State/Province, Country"
                required
              />
              {fieldErrors.location && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.location}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Belt Rank <span className="text-red-500">*</span></label>
              <select
                name="belt_rank"
                value={form.belt_rank}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                required
              >
                <option value="">Select Belt Rank</option>
                {BELT_RANKS.map((rank) => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
              {fieldErrors.belt_rank && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.belt_rank}
                </div>
              )}
            </div>
          </div>
        
          {/* Experience */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
              placeholder="e.g. 15"
              min={0}
              required
            />
            {fieldErrors.experience && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                {fieldErrors.experience}
              </div>
            )}
          </div>
        
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biography <span className="text-red-500">*</span>
              <span className="text-gray-400 text-xs ml-2">Min. 50 characters</span>
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
              placeholder="Tell us about your martial arts journey, teaching philosophy, and experience..."
              rows={4}
              required
            />
            {fieldErrors.bio && (
              <div className="inline-block bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                {fieldErrors.bio}
              </div>
            )}
          </div>
        </div>
      
        {/* Section: Martial Arts Information - UPDATED for tag-based selection */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Martial Arts Information</h2>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Martial Arts Styles <span className="text-red-500">*</span>
  </label>
  <select
    value={currentInput.style}
    onChange={(e) => {
      if (e.target.value) {
        addTagFromDropdown('styles', e.target.value);
        e.target.value = "";
      }
    }}
    className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
  >
    <option value="">Select Style</option>
    {MARTIAL_ARTS_STYLES
      .filter(style => !form.styles.includes(style))
      .map((style) => (
        <option key={style} value={style}>{style}</option>
      ))}
  </select>
  
  <TagDisplay 
    tags={form.styles} 
    onRemove={removeTag} 
    field="styles" 
  />
  
  {fieldErrors.styles && (
    <div className="inline-block bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
      {fieldErrors.styles}
    </div>
  )}
</div>
</div>
        
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Specialties <span className="text-red-500">*</span>
  </label>
  <select
    value={currentInput.specialty}
    onChange={(e) => {
      if (e.target.value) {
        addTagFromDropdown('specialties', e.target.value);
        e.target.value = "";
      }
    }}
    className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
  >
    <option value="">Select Specialty</option>
    {SPECIALTIES
      .filter(specialty => !form.specialties.includes(specialty))
      .map((specialty) => (
        <option key={specialty} value={specialty}>{specialty}</option>
      ))}
  </select>
  
  <TagDisplay 
    tags={form.specialties} 
    onRemove={removeTag} 
    field="specialties" 
  />
  
  {fieldErrors.specialties && (
    <div className="inline-block bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
      {fieldErrors.specialties}
    </div>
  )}
</div>
        
          
          {/* Age Groups - Tag-based */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Age Groups <span className="text-red-500">*</span>
  </label>
  <select
    value={currentInput.age_group}
    onChange={(e) => {
      if (e.target.value) {
        addTagFromDropdown('age_groups', e.target.value);
        e.target.value = "";
      }
    }}
    className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
  >
    <option value="">Select Age Group</option>
    {AGE_GROUPS
      .filter(age => !form.age_groups.includes(age))
      .map((age) => (
        <option key={age} value={age}>{age}</option>
      ))}
  </select>
  
  <TagDisplay 
    tags={form.age_groups} 
    onRemove={removeTag} 
    field="age_groups" 
  />
  
  {fieldErrors.age_groups && (
    <div className="inline-block bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
      {fieldErrors.age_groups}
    </div>
  )}
</div>
      
        {/* Section: Availability - Updated checkboxes */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Availability</h2>
          
          {/* Status and Employment Type */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-500">*</span></label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                required
              >
                <option value="">Select Availability Status</option>
                {AVAILABILITY_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {fieldErrors.status && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.status}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type <span className="text-red-500">*</span></label>
              <select
                name="employment_type"
                value={form.employment_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                required
              >
                <option value="">Select Employment Type</option>
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {fieldErrors.employment_type && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.employment_type}
                </div>
              )}
            </div>
          </div>
        
          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
            <select
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
              required
            >
              <option value="">Select Availability</option>
              {START_DATES.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
            {fieldErrors.start_date && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                {fieldErrors.start_date}
              </div>
            )}
          </div>
        
          {/* Relocation and Remote Teaching Checkboxes - UPDATED with brand styling */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="willing_relocate"
                name="willing_relocate"
                checked={form.willing_relocate}
                onChange={handleChange}
                className="w-5 h-5 text-[#D88A22] focus:ring-[#D88A22] border-gray-300 rounded accent-[#D88A22]"
                style={{ accentColor: ACCENT_COLOR }}
              />
              <label htmlFor="willing_relocate" className="ml-2 block text-sm text-gray-700">
                Willing to relocate
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remote_teaching"
                name="remote_teaching"
                checked={form.remote_teaching}
                onChange={handleChange}
                className="w-5 h-5 text-[#D88A22] focus:ring-[#D88A22] border-gray-300 rounded accent-[#D88A22]"
                style={{ accentColor: ACCENT_COLOR }}
              />
              <label htmlFor="remote_teaching" className="ml-2 block text-sm text-gray-700">
                Available for remote teaching
              </label>
            </div>
          </div>
        </div>
      
        {/* Section: Achievements - UPDATED for tag-based input */}

<div className="border-b border-gray-200 pb-6">
  <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Achievements</h2>
  
  <div className="flex">
    <input
      type="text"
      value={currentInput.achievement}
      onChange={(e) => handleTagInputChange(e, 'achievement')}
      onKeyPress={(e) => handleTagKeyPress(e, 'achievements')}
      className="flex-1 px-4 py-3 border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
      placeholder="e.g. 5-time National Champion"
    />
    <button
      type="button"
      onClick={() => addTag('achievements')}
      className="px-4 bg-[#D88A22] text-white font-medium rounded-r-xl hover:bg-[#b86f1a] transition"
      disabled={!currentInput.achievement}
    >
      Add
    </button>
  </div>
  
  <TagDisplay 
    tags={form.achievements} 
    onRemove={removeTag} 
    field="achievements" 
  />
</div>
      
        {/* Section: Education & Certifications - UPDATED for tag-based input */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Education & Certifications</h2>
          
          {/* Education */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
            <div className="flex">
              <input
                type="text"
                value={currentInput.education}
                onChange={(e) => handleTagInputChange(e, 'education')}
                onKeyPress={(e) => handleTagKeyPress(e, 'education')}
                className="flex-1 px-4 py-3 border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                placeholder="e.g. Master of Sports Science"
              />
              <button
                type="button"
                onClick={() => addTag('education')}
                className="px-4 bg-[#D88A22] text-white font-medium rounded-r-xl hover:bg-[#b86f1a] transition"
                disabled={!currentInput.education.trim()}
              >
                Add
              </button>
            </div>
            
            <TagDisplay 
              tags={form.education} 
              onRemove={removeTag} 
              field="education" 
            />
          </div>
          </div>
        
          {/* Certifications */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
  <div className="flex">
    <input
      type="text"
      value={currentInput.certification}
      onChange={(e) => handleTagInputChange(e, 'certification')}
      onKeyPress={(e) => handleTagKeyPress(e, 'certifications')}
      className="flex-1 px-4 py-3 border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
      placeholder="e.g. Certified by Japan Karate Association"
    />
    <button
      type="button"
      onClick={() => addTag('certifications')}
      className="px-4 bg-[#D88A22] text-white font-medium rounded-r-xl hover:bg-[#b86f1a] transition"
      disabled={!currentInput.certification}
    >
      Add
    </button>
  </div>
  
  <TagDisplay 
    tags={form.certifications} 
    onRemove={removeTag} 
    field="certifications" 
  />
</div>

{/* OPTIMIZED Video Upload Section */}
<div className="border-b border-gray-200 pb-6">
  <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Demonstration Video</h2>
  <p className="text-gray-500 text-sm mb-4">
    Upload a video showcasing your martial arts skills or teaching style.
  </p>
  
  <div className="flex flex-col md:flex-row gap-6">
    {/* Video Upload */}
    <div className="flex-grow">
      <CloudinaryUploader
        fileType="video"
        label="Demo Video"
        sublabel="(MP4, MOV, or WebM, max 20MB)"
        onFileSelect={handleFileSelect}
        onRemove={() => setVideoFile(null)}
        onError={handleFileError} // This is important!
        maxSize={20} // 20MB limit
        errorMessage={fieldErrors.video_url}
      />
    </div>

    {/* Video Preview */}
    <div className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
      {videoFile ? (
        <video 
          className="w-full h-full object-cover" 
          controls
          src={URL.createObjectURL(videoFile)}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Video preview will appear here
          </p>
        </div>
      )}
    </div>
  </div>
  
  {/* Tips & Instructions */}
  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
    <p className="flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#D88A22] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        A short demonstration video greatly increases your chances of getting hired. 
        Consider including clips of your teaching style, technical demonstrations, or 
        competition highlights. Keep it under 2 minutes for best results.
      </span>
    </p>
  </div>
</div>
      
        
        {/* Error and Submit - keep as is */}
        {generalError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-md px-4 py-2 mb-2">
            {generalError}
          </div>
        )}
        
        <button
          type="submit"
          className={`w-full py-3 mt-6 rounded-xl text-white font-semibold shadow-md transition cursor-pointer ${BUTTON_COLOR} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={loading || generalError}
        >
          {loading ? "Submitting..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}