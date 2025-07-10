"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Send, CheckCircle, Image as ImageIcon, Upload, X } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import Image from "next/image";

type HTMLInputWithPicker = HTMLInputElement & {
  showPicker: () => void;
};

type FormData = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  isAllDay: boolean;
  isMultiDay: boolean;
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
    startDate: "",
    startTime: "12:00",
    endDate: "",
    isAllDay: false,
    isMultiDay: false,
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
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'isAllDay' && (e.target as HTMLInputElement).checked ? { startTime: '00:00' } : {})
    }));
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      imageUrl: ''
    }));
    
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
      imageFile: null
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
      startDate: "",
      startTime: "12:00",
      endDate: "",
      isAllDay: false,
      isMultiDay: false,
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
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'imageFile' && value instanceof File) {
            formDataToSend.append('image', value);
          } else if (typeof value === 'string' && value.trim() !== '') {
            formDataToSend.append(key, value);
          }
        }
      });
      
      console.log('Submitting form data:', Object.fromEntries(formDataToSend));
      
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
        showBackButton={true}
        backHref="/events"
        backText="Back to Events"
      />

      {/* Submission Guidelines */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/40 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submission Guidelines</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>All events must be related to anime, manga, cosplay, or Japanese pop culture.</li>
            <li>We focus on modern Japanese pop culture, not traditional cultural events</li>
            <li>Provide accurate event details including date, time, and location.</li>
            <li>For multi-day events, check the "Multiple days" option.</li>
            <li>Use a high-quality image that represents your event (max 5MB).</li>
            <li>Your submission will be reviewed before being published.</li>
          </ul>
        </div>
      </div>

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
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">
                    Event Date & Time *
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          name="isAllDay"
                          checked={formData.isAllDay}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              isAllDay: e.target.checked,
                              startTime: e.target.checked ? "00:00" : prev.startTime,
                            }));
                          }}
                          className="h-5 w-5 appearance-none rounded border-2 border-input bg-background transition-all duration-200 ease-in-out 
                          checked:bg-primary checked:border-primary
                          focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 focus:outline-none
                          group-hover:border-primary/50 relative"
                        />
                        {formData.isAllDay && (
                          <svg
                            className="w-3.5 h-3.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none"
                            fill="none"
                            viewBox="0 0 20 20"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">All day</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          name="isMultiDay"
                          checked={formData.isMultiDay}
                          onChange={(e) => {
                            const isMultiDay = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              isMultiDay,
                              endDate: isMultiDay ? prev.startDate || "" : prev.startDate
                            }));
                          }}
                          className="h-5 w-5 appearance-none rounded border-2 border-input bg-background transition-all duration-200 ease-in-out 
                          checked:bg-primary checked:border-primary
                          focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 focus:outline-none
                          group-hover:border-primary/50 relative"
                        />
                        {formData.isMultiDay && (
                          <svg
                            className="w-3.5 h-3.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none"
                            fill="none"
                            viewBox="0 0 20 20"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">Multiple days</span>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Start Date *
                    </label>
                    <div className="relative">
                      <div className="relative flex items-center">
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              startDate: e.target.value,
                              endDate: !prev.isMultiDay ? e.target.value : prev.endDate
                            }));
                          }}
                          required
                          className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                        />
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.preventDefault();
                            const input = document.querySelector('input[name="startDate"]') as HTMLInputWithPicker | null;
                            input?.showPicker?.();
                          }}
                          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Open date picker"
                        >
                          <Calendar className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Start Time - Only show if not all-day */}
                  {!formData.isAllDay && (
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Start Time *
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                        />
                        <Clock className="w-5 h-5 text-muted-foreground absolute right-3 bottom-2.5 pointer-events-none" />
                      </div>
                    </div>
                  )}
                  
                  {/* End Date - Only show for multi-day events */}
                  {formData.isMultiDay && (
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        End Date *
                      </label>
                      <div className="relative">
                        <div className="relative flex items-center">
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            min={formData.startDate}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                          />
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.preventDefault();
                              const input = document.querySelector('input[name="endDate"]') as HTMLInputWithPicker | null;
                              input?.showPicker?.();
                            }}
                            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Open date picker"
                          >
                            <Calendar className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Tell us about your event..."
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
                  placeholder="e.g., Vilnius Tech Park, Vilnius"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ticket Price (if any)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Free or €0.00"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                </div>
              </div>
              
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
          
          {/* Source & Contact Section */}
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
          
          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-primary/80' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-lg hover:shadow-pink-500/20'}`}
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
