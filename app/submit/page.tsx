"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Upload, Send, CheckCircle } from "lucide-react";

export default function SubmitEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    expectedAttendees: "",
    contactEmail: "",
    contactName: "",
    organizerType: "",
    website: "",
    ticketPrice: "",
    additionalInfo: ""
  });

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

  const organizerTypes = [
    { value: "individual", label: "Individual" },
    { value: "group", label: "Group/Club" },
    { value: "business", label: "Business" },
    { value: "organization", label: "Organization" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
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
                  expectedAttendees: "",
                  contactEmail: "",
                  contactName: "",
                  organizerType: "",
                  website: "",
                  ticketPrice: "",
                  additionalInfo: ""
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Submit Event
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
                  Expected Attendees
                </label>
                <input
                  type="number"
                  name="expectedAttendees"
                  value={formData.expectedAttendees}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="e.g., 50"
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
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Users className="text-purple-600" size={24} />
              Organizer Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Your name or organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Type *
                </label>
                <select
                  name="organizerType"
                  value={formData.organizerType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select organizer type</option>
                  {organizerTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website/Social Media
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="https://your-website.com"
                />
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
              <li>• All events must be related to anime, manga, Japanese culture, or otaku interests</li>
              <li>• Events will be reviewed within 24-48 hours</li>
              <li>• We reserve the right to edit event descriptions for clarity</li>
              <li>• Commercial events are welcome but should benefit the community</li>
              <li>• Please provide accurate and up-to-date information</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Event for Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}