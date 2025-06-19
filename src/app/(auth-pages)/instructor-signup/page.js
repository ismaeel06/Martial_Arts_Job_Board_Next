"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";

const SPECIALITIES = [
  "Brazilian Jiu-Jitsu",
  "Taekwondo",
  "Karate",
  "Judo",
  "Muay Thai",
  "Boxing",
  "Kickboxing",
  "Kung Fu",
  "Wrestling",
  "MMA",
  "Other",
];

const WORK_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Remote",
];

export default function InstructorSignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    speciality: "",
    workType: "",
    experience: "",
    bio: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    speciality: "",
    workType: "",
    experience: "",
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
      speciality: "",
      workType: "",
      experience: "",
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

    // Experience validation
    if (fields.experience && (isNaN(fields.experience) || Number(fields.experience) < 0)) {
      errors.experience = "Please enter a valid number of years.";
    }

    return errors;
  };

  // General validation for empty fields
  const checkAllFieldsFilled = (fields = form) => {
    return (
      !fields.firstName ||
      !fields.lastName ||
      !fields.email ||
      !fields.password ||
      !fields.confirmPassword ||
      !fields.phone ||
      !fields.location ||
      !fields.speciality ||
      !fields.workType ||
      !fields.experience ||
      !fields.bio
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
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
      errors.speciality ||
      errors.workType ||
      errors.experience
    ) {
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API call
      // const formData = new FormData();
      // Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      // const res = await fetch("/api/instructors/signup", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Sign up failed");
      console.log("Instructor sign up form submitted:", form);
      router.push("/login");
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
    <h1 className={`text-3xl font-bold mb-3 ${PRIMARY_COLOR}`}>Sign up as an instructor</h1>
    <p className="text-gray-500 max-w-2xl mx-auto">
      Join as a martial arts instructor and connect with schools and students.
    </p>
  </div>
  {/* Top section: Avatar centered and larger */}
  <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
    {/* Left: Fields */}
    <div className="flex-1 w-full space-y-5">
      {/* First Name & Last Name */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
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
            name="lastName"
            value={form.lastName}
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
    {/* Right: Avatar */}
    <div className="flex flex-col items-center min-w-[180px] mt-6 sm:mt-0">
      <div className="relative group flex flex-col items-center">
        <div
          className="w-36 h-36 rounded-full bg-gray-100 border-4 border-[#D88A22] shadow-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#b86f1a] transition-transform duration-150 hover:scale-105"
          onClick={handleAvatarClick}
          title="Upload avatar"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
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
        {/* Remove avatar button, only if avatar is set */}
        {avatarPreview && (
          <button
            type="button"
            onClick={() => {
              setAvatarPreview(null);
              setForm((prev) => ({ ...prev, avatar: null }));
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition text-gray-500 group-hover:opacity-100 opacity-80"
            aria-label="Remove avatar"
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
        onChange={handleAvatarChange}
      />
      <span className="text-xs text-gray-400 mt-2">Click avatar to upload or change</span>
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
  {/* Section Divider */}
  <hr className="my-6 border-gray-200" />
  {/* Location and Experience inline */}
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
        placeholder="City, Country"
        autoComplete="address-level2"
        required
      />
    </div>
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
      <input
        type="number"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
        placeholder="e.g. 5"
        min={0}
        required
      />
      {fieldErrors.experience && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
          {fieldErrors.experience}
        </div>
      )}
    </div>
  </div>
  {/* Speciality and Work Type inline */}
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
      <select
        name="speciality"
        value={form.speciality}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
        required
      >
        <option value="">Select Speciality</option>
        {SPECIALITIES.map((spec) => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
      </select>
      {fieldErrors.speciality && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
          {fieldErrors.speciality}
        </div>
      )}
    </div>
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
      <select
        name="workType"
        value={form.workType}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition"
        required
      >
        <option value="">Select Work Type</option>
        {WORK_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {fieldErrors.workType && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
          {fieldErrors.workType}
        </div>
      )}
    </div>
  </div>
  {/* Bio */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
    <textarea
      name="bio"
      value={form.bio}
      onChange={handleChange}
      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D88A22] hover:border-[#D88A22] transition resize-none"
      placeholder="Tell us about yourself, your teaching style, and achievements..."
      rows={3}
      required
    />
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
      fieldErrors.phone ||
      fieldErrors.speciality ||
      fieldErrors.workType ||
      fieldErrors.experience
    }
  >
    {loading ? "Signing Up..." : "Sign Up as Instructor"}
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