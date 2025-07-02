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

export default function EmployerSignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    dojo_name: "",
    website: "",
    logo: null,
    dojo_location: ""
  });

  // For handling image
  const [logoFile, setLogoFile] = useState(null); // Added for Cloudinary uploader

  
  const [fieldErrors, setFieldErrors] = useState({
    dojo_name: "",
    website: "",
    logo: "",
    dojo_location: ""
  });
  
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // Field-specific validation
  const validateFields = (fields = form) => {
    const errors = {
      dojo_name: "",
      website: "",
      logo: "",
      dojo_location: ""
    };

    // Website validation (optional field but must be valid if provided)
    if (fields.website && !isValidUrl(fields.website)) {
      errors.website = "Please enter a valid URL (e.g., https://example.com)";
    }
    
    return errors;
  };

  // URL validation helper
  const isValidUrl = (url) => {
    try {
      // Allow URLs without protocol by adding it temporarily for validation
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // General validation for empty required fields
  const checkAllFieldsFilled = (fields = form) => {
    return (
      !fields.dojo_name ||
      !fields.dojo_location
      // Note: website and logo are optional
    );
  };

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm(prev => ({ ...prev, [name]: value }));

    // Validate fields as user types
    const updatedForm = { 
      ...form, 
      [name]: value 
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

    // Handle logo file selection from CloudinaryUploader
  const handleFileSelect = (file) => {
    setLogoFile(file);
  };

  // Handle file validation errors from CloudinaryUploader
  const handleFileError = (errorMessage) => {
    setFieldErrors(prev => ({
      ...prev,
      logo: errorMessage
    }));
  };

  
  
  // Handle logo image upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFieldErrors(prev => ({ 
        ...prev, 
        logo: "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)" 
      }));
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors(prev => ({ 
        ...prev, 
        logo: "Image size should be less than 5MB" 
      }));
      return;
    }
    
    // Update form and preview
    setForm(prev => ({ ...prev, logo: file }));
    setFieldErrors(prev => ({ ...prev, logo: "" }));
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Remove logo
  const removeLogo = () => {
    setForm(prev => ({ ...prev, logo: null }));
    setLogoPreview(null);
    // Reset the file input
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) fileInput.value = "";
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
      let logoUrl = "";
      
      // If there's a logo file to upload, handle the Cloudinary upload first
      if (logoFile) {
        try {
          
          // Create a FormData object to send the file to Cloudinary
          const formData = new FormData();
          formData.append('file', logoFile);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
          formData.append('folder', 'martial_arts_dojos');
          
          // Upload to Cloudinary
          const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          
          if (!uploadResponse.ok) {
            throw new Error('Logo upload failed');
          }
          
          const uploadData = await uploadResponse.json();
          logoUrl = uploadData.secure_url;

          
        } catch (error) {
          console.error('Logo upload error:', error);
          setGeneralError("Logo upload failed. Please try again.");
          setLoading(false);
          return; // Stop form submission if logo upload fails
        }
      }
      
      // Create simple JSON object with the data
      const formData = {
        dojo_name: form.dojo_name,
        dojo_location: form.dojo_location,
        website: form.website ? (!/^https?:\/\//i.test(form.website) ? 'https://' + form.website : form.website) : "",
        logo_url: logoUrl || ""
      };
      
      // Log data being sent for debugging
      console.log("Employer profile data being submitted:", formData);
      
      
      // API call would go here later
      // const res = await fetch("/api/employer-signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Profile creation failed");
      
    }catch (err) {
      setGeneralError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#f3e8d1] px-2 py-8 flex flex-col items-center">
      {/* Logo and Site Name */}
      <div className="flex flex-col sm:flex-row items-center mb-6 mt-4 gap-3">
        <img
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
        {/* Title and Description */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Employer Profile</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Complete your profile to post jobs and hire instructors as needed
          </p>
        </div>

        {/* Section: Basic Information */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Dojo Information</h2>
          
          {/* Dojo Name and Location in a grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Dojo Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dojo Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dojo_name"
                value={form.dojo_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                placeholder="Enter your dojo or school name"
                required
              />
              {fieldErrors.dojo_name && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.dojo_name}
                </div>
              )}
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dojo_location"
                value={form.dojo_location}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
                placeholder="City, State/Province, Country"
                required
              />
              {fieldErrors.dojo_location && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                  {fieldErrors.dojo_location}
                </div>
              )}
            </div>
          </div>
          
          {/* Website */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
              <span className="text-gray-400 text-xs ml-2">(Optional)</span>
            </label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
              placeholder="https://www.example.com"
            />
            {fieldErrors.website && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
                {fieldErrors.website}
              </div>
            )}
          </div>
        </div>
        
        {/* Section: Logo Upload - UPDATED with CloudinaryUploader */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Dojo Logo</h2>
          <p className="text-gray-500 text-sm mb-4">
            Upload your dojo's logo to make your profile more recognizable.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo Upload - Using CloudinaryUploader component */}
            <div className="flex-grow">
              <CloudinaryUploader
                fileType="image"
                label="Logo Image"
                sublabel="(JPEG, PNG, GIF, max 5MB)"
                onFileSelect={handleFileSelect}
                onRemove={() => setLogoFile(null)}
                onError={handleFileError}
                maxSize={5} // 5MB limit
                errorMessage={fieldErrors.logo}
              />
            </div>
            
            {/* Logo Preview */}
            {logoFile && (
              <div className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo Preview"
                  className="max-h-full max-w-full object-contain p-4"
                />
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
                A good logo helps make your dojo easily recognizable to potential instructors.
                For best results, use a square image with transparent background (PNG format).
              </span>
            </p>
          </div>
        </div>
        
        {/* Error and Submit */}
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