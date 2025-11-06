"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Tent, TreePine, Mountain, Camera, ArrowRight, ArrowUpRight, Star, Music } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import FAQSection from "./components/FAQSection";
import GallerySection from "./components/GallerySection";
import ScheduleSection from "./components/ScheduleSection";

export default function YuruCampPage() {
  const [activeTab, setActiveTab] = useState("about");

  // Handle URL hash to set active tab and scroll to schedule
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'schedule' || hash === 'friday' || hash === 'saturday' || hash === 'sunday') {
      setActiveTab('schedule');
      // Scroll to schedule section after a short delay to ensure content is rendered
      setTimeout(() => {
        const scheduleElement = document.querySelector('[data-schedule-section]');
        if (scheduleElement) {
          scheduleElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const campFeatures = [
    {
      icon: <Tent className="text-green-600" size={24} />,
      title: "Camping Experience",
      description: "Traditional camping with modern amenities and otaku-themed activities"
    },
    {
      icon: <Music className="text-green-600" size={24} />,
      title: "Live Performances",
      description: "Korniha band on stage and karaoke nights under the stars"
    },
    {
      icon: <Camera className="text-green-600" size={24} />,
      title: "Cosplay Events",
      description: "Wet cosplay photoshoots and cosplay masquerade competition"
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      title: "Community & Activities",
      description: "Fandom meetups, games, and outdoor vocaloid and vtubers screenings"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader 
        title="⛺ YuruCamp"
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            YuruCamp ⛺
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate otaku camping experience! Join fellow weebs for a unique outdoor adventure 
            combining nature, anime, and unforgettable memories.
          </p>
          <div className="text-sm text-muted-foreground/80 mt-2">
            Organized by Y.M.C.A (Yuru Mobile Camping Assembly)
          </div>
        </div>

        {/* Event Banner with Poster and Description */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">What is YuruCamp?</h2>
                <p className="text-muted-foreground-dark text-lg mb-4">
                  A weeb-themed outdoor festival by the river, featuring a cosplay stage, photo spots, water adventures, a professional outdoor kitchen, DIY campfire option, live evening performances by Korniha band with anime OSTs, and the Idol Stage karaoke! Artists will enjoy sketch meetups, live drawing sessions, and collaborative art projects in our Creative Hub.
                </p>
                <p className="text-muted-foreground-dark text-lg mb-4">
                  Fandom meetups (*insert your fandom here*), SpeedWeeb, a Wet Cosplay contest, and Cinema Live concert streams (Hatsune Miku, Colorful Stage, Hololive). Join our Creative Hub for artist workshops, where you can learn new skills, share techniques, and create amazing art together with fellow enthusiasts.
                </p>
                <p className="text-muted-foreground-dark text-lg mb-4">
                  So, pack your tent, sleeping bag, and thermos (for ramen, of course!). Don't forget your cat ears and plenty of glowsticks for the evening concerts. Bring your favorite snacks, water, and your most comfortable cosplay. Whether you're a camping pro or a first-time weeb in the wild, we can't wait to see you there!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-lg text-muted-foreground-dark mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={18} />
                    <span>August 29-31</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={18} />
                    <span>Brazuolės stovyklavietė</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-2">
                    <a 
                      href="https://www.facebook.com/events/1288618732795259" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-colors font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                      Facebook Event
                    </a>
                    <a 
                      href="https://www.instagram.com/y.m.c.a.lt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity font-semibold text-center flex items-center justify-center gap-2"
                      title="Follow us on Instagram"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://discord.gg/2gjpUqBPsj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-[#5865F2] text-white rounded-full hover:opacity-90 transition-opacity font-semibold text-center flex items-center justify-center gap-2"
                      title="Join our Discord server"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.19.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.78 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                  </div>
                  <button 
                    disabled
                    className="relative px-8 py-3.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full font-bold text-lg group overflow-hidden transition-all duration-300 cursor-not-allowed opacity-70"
                    aria-disabled="true"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-sm">🔒</span>
                      <span>Registration Closed</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="w-full max-w-md">
                <img 
                  src="/images/yurucamp/2025_poster.jpg" 
                  alt="YuruCamp 2025 Official Poster" 
                  className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/20"
                  style={{ maxHeight: '80vh' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: "about", label: "About" },
            { id: "schedule", label: "Schedule" },
            { id: "faq", label: "FAQ" },
            { id: "gallery", label: "Gallery" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'schedule') {
                  window.location.hash = 'schedule';
                } else {
                  window.location.hash = '';
                }
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'bg-card-dark/80 text-foreground-dark hover:bg-green-500/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === "about" && (
            <div className="space-y-8">
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {campFeatures.map((feature, index) => (
                  <div key={index} className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center border border-border/50 hover:border-green-500/30 transition-colors">
                    <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                      {React.cloneElement(feature.icon, { className: 'text-green-400' })}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Ticket Information */}
              <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border-dark/50">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Tickets & Information</h3>
                <div className="prose prose-invert max-w-none">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 p-6 rounded-xl border border-green-500/20">
                      <h4 className="text-xl font-bold mb-2">Regular Ticket</h4>
                      <p className="text-muted-foreground mb-4">€15 (limited number of glowsticks available for €10 deposit)</p>
                      <p className="text-sm text-muted-foreground/80">Ticket quantity is limited</p>
                      <button 
                        disabled
                        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-full cursor-not-allowed opacity-70 text-sm font-medium"
                        aria-disabled="true"
                      >
                        Sold Out
                      </button>
                    </div>
                    <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 p-6 rounded-xl border border-red-500/30">
                      <h4 className="text-xl font-bold mb-2 text-red-100">VIP Ticket</h4>
                      <p className="text-red-50/90 mb-1">€25 (includes premium glowstick)</p>
                      <p className="text-sm text-red-100/80 mb-1">Priority during karaoke event</p>
                      <p className="text-sm text-red-100/80">Very limited quantity</p>
                      <button 
                        disabled
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full cursor-not-allowed opacity-70 text-sm font-medium"
                        aria-disabled="true"
                      >
                        Sold Out
                      </button>
                      <p className="text-xs text-red-100/70 mt-4">
                        VIP tickets help support our new event and include a high-quality glowstick
                      </p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mt-6 mb-2">Getting There</h4>
                  <p className="text-muted-foreground">
                    The campsite is accessible by train! Take the train to Lazdėnu station (QX44+9M). 
                    It's a 20-minute walk from the station to the campsite. A free shuttle will run 
                    a few times a day between the station and the campsite, primarily for transporting 
                    attendees' belongings (priority given to cosplay equipment). Check the shuttle schedule 
                    as it's aligned with train arrival times from both Kaunas and Vilnius. Parking for cars is also available.
                  </p>
                  
                  <div className="mt-6 p-4 bg-red-900/30 border-l-4 border-red-500 rounded-r">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-red-100 font-medium">Rain or Shine Event</p>
                        <p className="text-red-50 text-sm mt-1">The festival will proceed regardless of weather conditions. We have tents and shelters in place to keep everyone comfortable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && <div data-schedule-section><ScheduleSection /></div>}

          {activeTab === "faq" && <FAQSection />}

          {activeTab === "gallery" && <GallerySection />}
        </div>
      </div>
    </div>
  );
}