"use client";

import { useState, useRef } from "react";

export default function CloudinaryUploader({ 
  onFileSelect,
  onRemove,
  onError,
  fileType = "image",
  value = null,
  label,
  sublabel,
  errorMessage,
  maxSize = 20 // Size in MB
}) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Convert MB to bytes
  const maxSizeBytes = maxSize * 1024 * 1024;
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    
  // Validate file size
  if (selectedFile.size > maxSizeBytes) {
    // Instead of alert, call the parent's error handler
    if (onError) {
      onError(`File is too large. Please select a file smaller than ${maxSize}MB.`);
    }
    return;
  }
    // Reset any previous errors when a valid file is selected
  if (onError) {
    onError("");
  }
    
    // Validate file type
    if (fileType === 'video' && !selectedFile.type.startsWith('video/')) {
      alert('Please select a video file.');
      return;
    }
    
    if (fileType === 'image' && !selectedFile.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setFile(selectedFile);
    
    // Notify parent component
    onFileSelect(selectedFile);
    

  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) onRemove();
  };

  // Determine what icon and text to show based on fileType
  const getUploadDetails = () => {
    if (fileType === "image") {
      return {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        text: `PNG, JPG, GIF up to ${maxSize}MB`,
        uploadText: "Upload a file"
      };
    } else {
      return {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        ),
        text: `MP4, MOV, or WebM up to ${maxSize}MB`,
        uploadText: "Upload a file"
      };
    }
  };

  const { icon, text, uploadText } = getUploadDetails();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {sublabel && (
            <span className="text-gray-400 text-xs ml-2">{sublabel}</span>
          )}
        </label>
      )}
      
      <div className="mt-1">
        <input 
          ref={fileInputRef}
          type="file" 
          onChange={handleFileChange} 
          accept={fileType === 'video' ? 'video/*' : 'image/*'}
          className="sr-only"
          id="file-upload"
        />
        
        <label 
          htmlFor="file-upload"
          className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#D88A22] transition cursor-pointer"
        >
          <div className="space-y-2 text-center">
            {file ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[#D88A22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {fileType === "video" ? (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  )}
                </svg>
                <div className="flex justify-center text-sm text-gray-600">
                  <p className="text-[#D88A22] font-medium truncate max-w-xs">
                    {file.name}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Click to replace
                </p>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer rounded-md font-medium text-[#D88A22] hover:text-[#b86f1a]">
                    {uploadText}
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  {text}
                </p>
              </>
            )}
          </div>
        </label>
      </div>
      
      {file && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-1 mt-2">
          <span className="text-xs text-gray-500 truncate">
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </span>
          <button 
            type="button"
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500"
            aria-label={`Remove ${fileType}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-md px-3 py-1 mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
}