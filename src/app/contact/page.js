'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, here you'd send the data to your API
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Have questions or need support? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="md:w-7/12">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {formSubmitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 animate-fade-in">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Your message has been sent! We'll be in touch shortly.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D88A22]"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full md:w-auto px-8 py-3">
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="md:w-5/12">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm h-full">
                <div className="flex items-center mb-8">
                  <Image 
                    src="/icon.png" 
                    alt="MartialArtsJobsBoard.com"
                    width={50}
                    height={50}
                    className="mr-4" 
                  />
                  <h3 className="text-2xl font-bold">MartialArtsJobsBoard</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#D88A22] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Email Us</h4>
                      <p className="text-gray-600 mt-1">support@martialartsjobaboard.com</p>
                      <p className="text-gray-600">info@martialartsjobaboard.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D88A22] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Call Us</h4>
                      <p className="text-gray-600 mt-1">(555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 9am - 5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D88A22] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Location</h4>
                      <p className="text-gray-600 mt-1">123 Martial Way</p>
                      <p className="text-gray-600">San Francisco, CA 94105</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h4 className="font-bold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-black p-2 rounded-full hover:bg-[#D88A22] transition-colors">
                        <Image
                          src="/instagram-icon.svg"
                          alt="Instagram"
                          width={24}
                          height={24}
                        />
                      </a>
                      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-black p-2 rounded-full hover:bg-[#D88A22] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </a>
                      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="bg-black p-2 rounded-full hover:bg-[#D88A22] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-300 h-[400px] rounded-lg flex items-center justify-center">
              {/* This would be replaced with an actual map component */}
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Interactive Map</p>
                <p className="text-gray-600">(Google Maps or other map service would be integrated here)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Contact Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">How quickly will you respond to my inquiry?</h3>
                <p className="text-gray-600">
                  We aim to respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">I'm having technical issues with your platform. Who can help?</h3>
                <p className="text-gray-600">
                  Please contact our technical support team at support@martialartsjobaboard.com with details about the 
                  issue you're experiencing, and we'll help resolve it promptly.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Do you offer custom solutions for large martial arts franchises?</h3>
                <p className="text-gray-600">
                  Yes! For multi-location schools or franchises, we offer custom enterprise solutions. 
                  Please contact our sales team to discuss your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage;
