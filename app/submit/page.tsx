"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Send, CheckCircle, Image as ImageIcon, Upload, X } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import Image from "next/image";

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

export default function SubmitEventPage() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      resetForm();
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border/50 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Event Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for submitting your event. We'll review it within 24-48 hours and get back to you via email.
            </p>
            <div className="space-y-3 max-w-sm mx-auto">
              <Link
                href="/events"
                className="block px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full hover:opacity-90 transition-all"
              >
                View All Events
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-accent/10 transition-all"
              >
                Submit Another Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader 
        title="Submit an Event"
        icon={Send}
        className="bg-card"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Submit Your Event 
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your otaku event with the Lithuanian community! All submissions are reviewed before publication.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details Section */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Calendar className="text-pink-600" size={24} />
              Event Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., Anime Convention 2023"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., Vilnius, Cinema Hall or Online Event"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ticket Price
                </label>
                <input
                  type="text"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., Free, €15, €10-20"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Describe your event, what attendees can expect, any special features..."
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
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
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-input hover:border-primary/50 bg-background'
                      } transition-colors`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('file')}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                        uploadMethod === 'file'
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-input hover:border-primary/50 bg-background'
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
                        className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Enter a direct image URL (JPEG, PNG, or WebP recommended)
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
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
                          className="inline-flex items-center px-4 py-2 bg-background border border-input rounded-md font-medium text-foreground hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer transition-colors"
                        >
                          Select Image
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">
                          Max file size: 5MB (JPEG, PNG, WebP)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact & Source Section */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Send className="text-blue-600" size={24} />
              Event Source & Contact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Event Source URL *
                </label>
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://facebook.com/events/123... or https://instagram.com/p/... or Discord link"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Link to the original event source (Facebook, Instagram, Discord announcement, website, etc.)
                </p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Source Description
                </label>
                <input
                  type="text"
                  name="sourceDescription"
                  value={formData.sourceDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., Official Facebook event, Organizer's website, Discord announcement..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  We'll contact you if we need clarification about the event submission
                </p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Any additional details, special requirements, or notes for the admin"
                />
              </div>
            </div>
          </div>
          
          {/* Guidelines Section */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Submission Guidelines</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span className="text-muted-foreground">All events must be related to anime, manga, Japanese pop culture, or otaku interests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span className="text-muted-foreground">We focus on modern Japanese pop culture, not traditional cultural events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span className="text-muted-foreground">Events will be reviewed within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span className="text-muted-foreground">We reserve the right to edit event descriptions for clarity</span>
              </li>
            </ul>
          </div>
          
          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Event'}
              {!isSubmitting && <Send size={20} className="text-primary-foreground" />}
            </button>
            
            <p className="text-sm text-muted-foreground text-center">
              Note: Your event will be reviewed before being published.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
