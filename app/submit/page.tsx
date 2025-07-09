"use client";

"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Send, CheckCircle, Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";

export default function SubmitEventPage() {
  type FormData = {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    ticketPrice: string;
    sourceUrl: string;
    sourceDescription: string;
    contactEmail: string;
    additionalInfo: string;
    imageUrl: string;
    imageFile: File | null;
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    ticketPrice: "",
    sourceUrl: "",
    sourceDescription: "",
    contactEmail: "",
    additionalInfo: "",
    imageUrl: "",
    imageFile: null
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: '' // Clear URL if file is selected
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: null // Clear file if URL is entered
    }));
    
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };
  
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: '',
      imageFile: null
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Helper function to reset form after successful submission
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      ticketPrice: "",
      sourceUrl: "",
      sourceDescription: "",
      contactEmail: "",
      additionalInfo: "",
      imageUrl: "",
      imageFile: null
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle successful submission
  const handleSuccessfulSubmission = () => {
    resetForm();
    setIsSubmitted(true);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: "anime", label: "Anime Events" },
    { value: "cosplay", label: "Cosplay" },
    { value: "gaming", label: "Gaming" },
    { value: "music", label: "Music/Concerts" },
    { value: "screening", label: "Movie Screenings" },
    { value: "workshop", label: "Workshops" },
    { value: "meetup", label: "Meetups" },
    { value: "convention", label: "Conventions" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      imageUrl: '' // Clear URL if file is selected
    }));
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'imageFile' && value instanceof File) {
            formDataToSend.append('image', value);
          } else if (typeof value === 'string' && value.trim() !== '') {
            formDataToSend.append(key, value);
          }
        }
      });
      
      // Simulate API call with form data
      console.log('Submitting form data:', Object.fromEntries(formDataToSend));
      
      // In a real app, you would send this to your API endpoint
      // Example:
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Event Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for submitting your event. We'll review it within 24-48 hours and get back to you via email.
          </p>
          <div className="space-y-3">
            <Link
              href="/events"
              className="block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all"
            >
              View All Events
            </Link>
            <Link
              href="/submit"
              className="block px-6 py-3 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-all"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: "",
                  description: "",
                  date: "",
                  time: "",
                  location: "",
                  category: "",
                  ticketPrice: "",
                  sourceUrl: "",
                  sourceDescription: "",
                  contactEmail: "",
                  additionalInfo: "",
                  imageUrl: "",
                  imageFile: null
                });
              }}
            >
              Submit Another Event
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="/otaku_lt.png" 
                alt="Otaku.lt Logo" 
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                📅 Submit Event
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Submit Your Event 📅
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your otaku event with the Lithuanian community! All submissions are reviewed before publication.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Calendar className="text-pink-600" size={24} />
              Event Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., Anime Night: Studio Ghibli Marathon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., Vilnius, Cinema Hall or Online Event"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Price
                </label>
                <input
                  type="text"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., Free, €15, €10-20"
                />
              </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                      placeholder="Describe your event, what attendees can expect, any special features..."
                    />
                  </div>
                  
                  {/* Image Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Cover Image
                    </label>
                    
                    {imagePreview && (
                      <div className="mb-4 relative group">
                        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Event cover preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors"
                          title="Remove image"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex space-x-4 mb-4">
                        <button
                          type="button"
                          onClick={() => setUploadMethod('url')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                            uploadMethod === 'url'
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-300 hover:border-gray-400'
                          } transition-colors`}
                        >
                          Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setUploadMethod('file')}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                            uploadMethod === 'file'
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-300 hover:border-gray-400'
                          } transition-colors`}
                        >
                          Upload File
                        </button>
                      </div>
                      
                      {uploadMethod === 'url' ? (
                        <div>
                          <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleImageUrlChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter a direct image URL (JPEG, PNG, or WebP recommended)
                          </p>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Drag & drop an image here, or click to select
                            </p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileInputChange}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 cursor-pointer"
                            >
                              Select Image
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              Max file size: 5MB (JPEG, PNG, WebP)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <Send className="text-blue-600" size={24} />
                  Event Source & Contact
                </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Source URL *
                </label>
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="https://facebook.com/events/123... or https://instagram.com/p/... or Discord link"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Link to the original event source (Facebook, Instagram, Discord announcement, website, etc.)
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Description
                </label>
                <input
                  type="text"
                  name="sourceDescription"
                  value={formData.sourceDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., Official Facebook event, Organizer's website, Discord announcement..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll contact you if we need clarification about the event submission
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Submission Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• All events must be related to anime, manga, Japanese pop culture, or otaku interests</li>
              <li>• We focus on modern Japanese pop culture, not traditional cultural events</li>
              <li>• Events will be reviewed within 24-48 hours</li>
              <li>• We reserve the right to edit event descriptions for clarity</li>
              <li>• Please provide accurate and up-to-date information</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-medium hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Event'}
                {!isSubmitting && <Send size={18} />}
              </button>
              
              {formData.imageFile || formData.imageUrl ? (
                <p className="text-sm text-gray-500 text-center">
                  Note: Your event will be reviewed before being published.
                </p>
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  Adding an image will make your event more attractive to attendees.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}