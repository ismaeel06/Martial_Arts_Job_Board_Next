"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo.png";
const SITE_NAME = "Martial Arts Job Board";
const PRIMARY_COLOR = "text-[#D88A22]";
const BUTTON_COLOR = "bg-[#D88A22] hover:bg-[#b86f1a]";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  // Field-specific validation
  const validateFields = (fields = form) => {
    const errors = { email: "", password: "" };

    // Email validation
    if (fields.email && (!fields.email.includes("@") || !fields.email.endsWith(".com"))) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (fields.password && fields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  // General validation for empty fields
  const checkAllFieldsFilled = (fields = form) => {
    return !fields.email || !fields.password;
  };

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
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
    if (errors.email || errors.password) {
      return;
    }

      const formData = {
        email: form.email.trim(),
        password: form.password,
      };

    setLoading(true);
    try {

      // Log formData to see what would be sent to the backend
          console.log("Login form data to be sent:", formData);

    // Replace with your actual API call
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error(data.message || "Login failed");

    } catch (err) {
      setGeneralError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Uncomment and implement your API call here
    // const res = await fetch("/api/auth/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: form.email }),
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error(data.message || "Failed to send reset email");
    console.log("Forgot password requested for:", form.email);
    alert("Forgot password API call would be made here.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff7ed] to-[#f3e8d1] px-4">
      {/* Logo and Site Name */}
      <div className="flex flex-col sm:flex-row items-center mb-8 mt-4 gap-3">
        <img
          src={LOGO_SRC}
          alt="Martial Arts Job Board Logo"
          className="h-14 w-14 sm:h-16 sm:w-16"
        />
        <span className={`text-2xl sm:text-3xl font-bold ${PRIMARY_COLOR} mt-2 sm:mt-0 sm:ml-3 text-center sm:text-left`}>
          {SITE_NAME}
        </span>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className={`text-3xl font-bold mb-2 ${PRIMARY_COLOR}`}>Log In</h1>
        <p className="mb-6 text-gray-500">Welcome back! Log in to your account.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22] transition"
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
            {fieldErrors.email && (
              <div className="text-red-600 text-xs mt-1">{fieldErrors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D88A22] transition"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            {fieldErrors.password && (
              <div className="text-red-600 text-xs mt-1">{fieldErrors.password}</div>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-[#D88A22] hover:underline focus:outline-none cursor-pointer"
              tabIndex={-1}
              type="button"
            >
              Forgot password?
            </button>
          </div>
          {generalError && (
            <div className="text-red-600 text-sm font-medium">{generalError}</div>
          )}
<button
  type="submit"
  className={`w-full py-2 mt-2 rounded-lg text-white font-semibold shadow-md transition cursor-pointer ${BUTTON_COLOR} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
  disabled={loading || generalError || fieldErrors.email || fieldErrors.password}
>
  {loading ? "Logging In..." : "Log In"}
</button>
        </form>
        <div className="flex justify-end items-center mt-4">
          <span className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#D88A22] hover:underline cursor-pointer transition">
              <span>Sign up</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}