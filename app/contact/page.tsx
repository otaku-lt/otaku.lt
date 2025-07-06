"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "event", label: "Event Organization" },
    { value: "collaboration", label: "Collaboration" },
    { value: "performance", label: "Performance Booking" },
    { value: "press", label: "Press/Media" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" }
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
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Message Sent!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="block px-6 py-3 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-all"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  subject: "",
                  message: "",
                  type: ""
                });
              }}
            >
              Send Another Message
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Contact
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch 📬
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, ideas, or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select inquiry type</option>
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full hover:from-pink-600 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Mail className="text-pink-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">info@otaku.lt</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Discord</p>
                    <p className="font-semibold">@otaku_lithuania</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">Lithuania</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Our Organizations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Idol Stage Baltics</h4>
                  <p className="text-sm text-gray-600">Premium otaku concerts and events</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Y.M.C.A</h4>
                  <p className="text-sm text-gray-600">Yuru Mobile Camping Assembly</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">Korniha Band</h4>
                  <p className="text-sm text-gray-600">Anime music covers and originals</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-6 shadow-xl text-white">
              <h3 className="text-xl font-bold mb-2">Response Time</h3>
              <p className="mb-4">
                We typically respond within 24 hours. For urgent matters, please reach out via Discord.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Usually online 9 AM - 6 PM (EET)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}