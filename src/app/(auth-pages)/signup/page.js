"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Field-specific validation
  const validateFields = (fields = form) => {
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    };

    // Email validation
    if (fields.email && (!fields.email.includes("@") || !fields.email.endsWith(".com"))) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (fields.password && fields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    // Confirm password validation
    if (fields.confirmPassword && fields.password !== fields.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Phone validation (basic)
    if (fields.phone && !/^\+?\d{7,15}$/.test(fields.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    return errors;
  };

  // General validation for empty fields
  const checkAllFieldsFilled = (fields = form) => {
    return (
      !fields.first_name ||
      !fields.last_name ||
      !fields.email ||
      !fields.password ||
      !fields.confirmPassword ||
      !fields.phone
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validate fields as user types
    const errors = validateFields(updatedForm);
    setFieldErrors(errors);

    // General error for empty fields
    if (checkAllFieldsFilled(updatedForm)) {
      setGeneralError("All fields are required.");
    } else {
      setGeneralError("");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

    const handleFileSelect = (file) => {
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

    const handleFileError = (errorMessage) => {
    setFieldErrors(prev => ({
      ...prev,
      photo: errorMessage
    }));
  };

    const uploadPhotoToCloudinary = async (photoFile) => {
    try {
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'martial_arts_profiles');
      
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!uploadResponse.ok) {
        throw new Error('Photo upload failed');
      }
      
      const uploadData = await uploadResponse.json();
      return uploadData.secure_url;
    } catch (error) {
      console.error('Photo upload error:', error);
      throw new Error("Photo upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (checkAllFieldsFilled()) {
      setGeneralError("All fields are required.");
      return;
    } else {
      setGeneralError("");
    }

    // Validate fields before submit
    const errors = validateFields();
    setFieldErrors(errors);

    // If any field-specific error exists, do not submit
    if (
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.phone ||
      errors.photo
    ) {
      return;
    }

    setLoading(true);
    try {
        let photoUrl = "";
      // Create FormData object for file uploads

            if (form.photo) {
        photoUrl = await uploadPhotoToCloudinary(form.photo);
      }

      const formData = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        photoUrl: photoUrl
      };

          // Log the data being sent
    console.log("Form data being sent to backend:");
    console.log({
      ...formData,
    });

    // Commented out the actual API call for now
    // Actual API call (commented for now)
    // const res = await fetch("/api/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error(data.message || "Sign up failed");



      router.push("/CTA");
    } catch (err) {
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
  encType="multipart/form-data"
>
  {/* Title and Description inside the form */}
  <div className="mb-12 text-center">
    <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Sign up</h1>
    <p className="text-gray-500 max-w-2xl mx-auto">
Create your account to start exploring roles in the martial arts industry, or create them
    </p>
  </div>
  {/* Top section: Photo centered and larger */}
<div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-center">
    {/* Left: Fields */}
    <div className="flex-1 w-full space-y-5">
      {/* First Name & Last Name */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
            placeholder="First Name"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
            placeholder="Last Name"
            autoComplete="family-name"
            required
          />
        </div>
      </div>
      {/* Email & Phone */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
            placeholder="you@email.com"
            autoComplete="email"
            required
          />
          {fieldErrors.email && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
              {fieldErrors.email}
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
            placeholder="+1234567890"
            autoComplete="tel"
            required
          />
          {fieldErrors.phone && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
              {fieldErrors.phone}
            </div>
          )}
        </div>
      </div>
    </div>
    {/* Right: Photo */}
    <div className="flex flex-col items-center min-w-[180px] mt-6 sm:mt-0">
      <div className="relative group flex flex-col items-center">
        <div
          className="w-36 h-36 rounded-full bg-gray-100 border-4 border-[#D88A22] shadow-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#b86f1a] transition-transform duration-150 hover:scale-105"
          onClick={handlePhotoClick}
          title="Upload photo"
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Photo Preview"
              className="w-36 h-36 object-cover rounded-full"
              style={{ objectPosition: "center" }}
            />
          ) : (
            // Placeholder: user icon SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
              />
            </svg>
          )}
        </div>
        {/* Remove photo button, only if photo is set */}
        {photoPreview && (
          <button
            type="button"
            onClick={() => {
              setPhotoPreview(null);
              setForm((prev) => ({ ...prev, photo: null }));
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition text-gray-500 group-hover:opacity-100 opacity-80"
            aria-label="Remove photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />
      <span className="text-xs text-gray-400 mt-2">Click photo to upload or change</span>
    </div>
  </div>
  {/* Rest of the form fields below */}
  {/* Password and Confirm Password as block */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
      placeholder="Password"
      autoComplete="new-password"
      required
    />
    {fieldErrors.password && (
      <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
        {fieldErrors.password}
      </div>
    )}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
      placeholder="Confirm Password"
      autoComplete="new-password"
      required
    />
    {fieldErrors.confirmPassword && (
      <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
        {fieldErrors.confirmPassword}
      </div>
    )}
  </div>

  {generalError && (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-md px-4 py-2 mb-2">
      {generalError}
    </div>
  )}
  <button
    type="submit"
    className={`w-full py-3 mt-2 rounded-xl text-white font-semibold shadow-md transition cursor-pointer ${BUTTON_COLOR} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
    disabled={
      loading ||
      generalError ||
      fieldErrors.email ||
      fieldErrors.password ||
      fieldErrors.confirmPassword ||
      fieldErrors.phone
    }
  >
    {loading ? "Signing Up..." : "Sign Up"}
  </button>
  <div className="flex justify-end items-center mt-4">
    <span className="text-sm text-gray-500">
      Already have an account?{" "}
      <Link href="/login" className="font-semibold text-[#D88A22] hover:underline cursor-pointer transition">
        <span>Log in</span>
      </Link>
    </span>
  </div>
</form>
    </div>
  );
}