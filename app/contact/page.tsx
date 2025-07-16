"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Send, CheckCircle, X, Users } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

export default function ContactPage() {
  // Add dark theme class to html element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

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
      <div className="min-h-screen bg-background text-foreground">
        <ContentPageHeader title={
          <>
            <MessageCircle className="w-6 h-6 inline-block mr-2" />
            Contact Us
          </>
        } />
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
              className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader title={
        <>
          <span className="inline-block mr-2">📫</span>
          Contact Us
        </>
      } />
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get in Touch 📫
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay in touch with our community
            </p>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, ideas, or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/40">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Inquiry Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground"
                >
                  <option value="">Select inquiry type</option>
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/40">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Quick Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p className="mt-1 text-base text-foreground">otaku@otaku.lt</p>
                  </div>
                </div>
                <div className="flex items-start mt-6">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Discord</h3>
                    <p className="mt-1 text-base text-foreground">Join our community</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p className="mt-1 text-base text-foreground">Vilnius, Lithuania</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizations */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/40 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Our Organizations
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-card to-card-foreground/5 rounded-lg border border-border/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">Yuru Camp Mobile Assembly</h4>
                      <p className="text-sm text-muted-foreground mt-1">Weeb oriented events</p>
                      <p className="text-sm text-foreground/80 mt-1">ymca@otaku.lt</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-card to-card-foreground/5 rounded-lg border border-border/30 mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">Idol Stage Baltics</h4>
                      <p className="text-sm text-muted-foreground mt-1">Live performance and J-pop culture activities</p>
                    </div>
                    <a 
                      href="https://www.facebook.com/idolstagebaltics" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      aria-label="Idol Stage Baltics Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-card to-card-foreground/5 rounded-lg border border-border/30 mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">Korniha Band</h4>
                      <p className="text-sm text-muted-foreground mt-1">Anime music acoustic band</p>
                      <p className="text-sm text-foreground/80 mt-1">korniha.band@korniha.lt</p>
                    </div>
                    <a 
                      href="https://www.facebook.com/kornihaband/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      aria-label="Korniha Band Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
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