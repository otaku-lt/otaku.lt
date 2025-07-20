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
                  So, pack your tent, sleeping bag, and thermos (for ramen, of course!). Don't forget your cat ears, fluffy tail, and plenty of glowsticks for the evening concerts. Bring your favorite snacks, water, and your most comfortable cosplay. Whether you're a camping pro or a first-time weeb in the wild, we can't wait to see you there!
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
                    href="https://forms.gle/F8vjGNG8LefEXeoi7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-8 py-3.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg group overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-sm">✨</span>
                      <span>Register for Cosplay</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-full rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
                <img 
                  src="/images/yurucamp/2025_poster.jpg" 
                  alt="YuruCamp 2025 Official Poster" 
                  className="w-full h-full object-cover"
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
              onClick={() => setActiveTab(tab.id)}
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
                      <a 
                        href="https://wibu.me/PdVyP" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Buy Online
                      </a>
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        Your email will be your confirmation at the entrance
                      </p>
                      <hr className="border-t border-border/30 my-4" />
                      <div className="mt-4">
                        <button 
                          onClick={() => document.getElementById('bank-transfer-details')?.classList.toggle('hidden')}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <span>Bank Transfer Option</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div id="bank-transfer-details" className="hidden mt-2 p-3 bg-blue-900/20 rounded-lg text-xs">
                          <p className="font-mono break-all">
                            <span className="text-muted-foreground/80 block">Recipient:</span>
                            Roman Gorodeckij
                          </p>
                          <p className="font-mono break-all mt-2">
                            <span className="text-muted-foreground/80 block">IBAN:</span>
                            LT54 7290 0990 3540 3692
                          </p>
                          <p className="mt-2">
                            <span className="text-muted-foreground/80 block">Payment reason:</span>
                            Yurucamp your@email.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 p-6 rounded-xl border border-red-500/30">
                      <h4 className="text-xl font-bold mb-2 text-red-100">VIP Ticket</h4>
                      <p className="text-red-50/90 mb-1">€25 (includes premium glowstick)</p>
                      <p className="text-sm text-red-100/80 mb-1">Priority during karaoke event</p>
                      <p className="text-sm text-red-100/80">Very limited quantity</p>
                      <a 
                        href="https://wibu.me/BFeBv" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Buy VIP Ticket
                      </a>
                      <p className="text-xs text-red-100/70 mt-4">
                        VIP tickets help support our new event and include a high-quality glowstick
                      </p>
                      <div className="mt-4 pt-4 border-t border-red-500/20">
                        <button 
                          onClick={() => document.getElementById('bank-transfer-details-vip')?.classList.toggle('hidden')}
                          className="text-xs text-blue-300 hover:text-blue-200 flex items-center gap-1"
                        >
                          <span>Bank Transfer Option</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div id="bank-transfer-details-vip" className="hidden mt-2 p-3 bg-red-900/20 rounded-lg text-xs">
                          <p className="font-mono break-all">
                            <span className="text-red-100/80 block">Recipient:</span>
                            Roman Gorodeckij
                          </p>
                          <p className="font-mono break-all mt-2">
                            <span className="text-red-100/80 block">IBAN:</span>
                            LT54 7290 0990 3540 3692
                          </p>
                          <p className="mt-2">
                            <span className="text-red-100/80 block">Payment reason:</span>
                            Yurucamp VIP your@email.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mt-8 mb-2">Registration</h4>
                  <p className="text-muted-foreground mb-4">
                    Registration for cosplay and fandom meetups will be announced soon.
                  </p>
                  
                  <h4 className="text-lg font-semibold mt-6 mb-2">Getting There</h4>
                  <p className="text-muted-foreground">
                    The campsite is accessible by train! Take the train to Kragžliai station (QX44+9M). 
                    It's a 20-minute walk from the station to the campsite. A free shuttle will run 
                    a few times a day between the station and the campsite, primarily for transporting 
                    attendees' belongings (priority given to cosplay equipment). Parking for cars is also available.
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

          {activeTab === "schedule" && <ScheduleSection />}

          {activeTab === "faq" && <FAQSection />}

          {activeTab === "gallery" && <GallerySection />}
        </div>
      </div>
    </div>
  );
}