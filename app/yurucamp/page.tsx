"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Tent, TreePine, Mountain, Camera, ArrowRight, ArrowUpRight, Star, Music } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

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
      description: "Fandom meetups, games, and outdoor anime screenings"
    }
  ];

  const schedule = [
    {
      day: "Friday",
      date: "August 29",
      events: [
        { time: "15:00", activity: "Check-in & Camp Setup" },
        { time: "17:00", activity: "Welcome Ceremony" },
        { time: "19:00", activity: "Campfire Stories & Anime Tales" },
        { time: "21:00", activity: "Stargazing & Chill Music" }
      ]
    },
    {
      day: "Saturday",
      date: "August 30",
      events: [
        { time: "08:00", activity: "Morning Yoga & Exercises" },
        { time: "10:00", activity: "Outdoor Anime Screening" },
        { time: "12:00", activity: "Lunch & Free Time" },
        { time: "14:00", activity: "Cosplay Photoshoot" },
        { time: "16:00", activity: "Outdoor Games & Activities" },
        { time: "18:00", activity: "Cooking Together" },
        { time: "20:00", activity: "Campfire Concert" },
        { time: "22:00", activity: "Night Games & Karaoke" }
      ]
    },
    {
      day: "Sunday",
      date: "August 31",
      events: [
        { time: "09:00", activity: "Farewell Breakfast" },
        { time: "11:00", activity: "Pack Up & Clean Up" },
        { time: "12:00", activity: "Group Photo & Departure" }
      ]
    }
  ];

  const faqs = [
    {
      question: "What should I bring?",
      answer: "We'll provide camping equipment, but bring personal items, cosplay, comfortable clothes, and toiletries. Full packing list will be sent to registered participants."
    },
    {
      question: "Is food included?",
      answer: "Yes! All meals are included in the registration fee. We'll have vegetarian and vegan options available."
    },
    {
      question: "What if it rains?",
      answer: "We have covered areas and backup indoor activities. The event will proceed rain or shine!"
    },
    {
      question: "Are there age restrictions?",
      answer: "18+ only for this edition. Future family-friendly editions may be organized."
    },
    {
      question: "Can I bring my own tent?",
      answer: "Absolutely! Personal tents are welcome. We'll also have shared tents available."
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">What is YuruCamp?</h2>
                <p className="text-muted-foreground-dark text-lg mb-4">
                  YuruCamp is a unique otaku camping experience that brings together anime fans for an unforgettable weekend in nature. 
                  It's a celebration of Japanese pop culture under the open sky, where you can enjoy your favorite hobbies while 
                  surrounded by beautiful Lithuanian forests and lakes. Whether you're into cosplay, anime, or just want to meet fellow 
                  fans in a relaxed outdoor setting, YuruCamp has something special for you.
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
                  <button className="px-8 py-3 bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors font-semibold hover:scale-105 transform">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-full overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                <img 
                  src="/images/yurucamp/2025_poster.png" 
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

              {/* Event Highlights */}
              <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border-dark/50">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Event Highlights</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Join us for an unforgettable weekend where anime culture meets outdoor adventure. Our carefully 
                    curated program includes something for every fan:
                  </p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>Live performance by Korniha band</li>
                    <li>Karaoke nights with professional equipment</li>
                    <li>Cosplay masquerade with prizes</li>
                    <li>Wet cosplay photoshoots by the river</li>
                    <li>Outdoor anime screenings under the stars</li>
                    <li>Fandom meetups and community activities</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Whether you're an experienced camper or a first-timer, YuruCamp offers a welcoming 
                    environment where everyone can enjoy the great outdoors together. All camping equipment 
                    is provided, so you just need to bring yourself and your enthusiasm!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              {schedule.map((day, index) => (
                <div key={index} className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50 hover:border-green-500/30 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-foreground-dark flex items-center gap-2">
                    <Calendar className="text-green-600" size={24} />
                    {day.day} - {day.date}
                  </h3>
                  <div className="space-y-3">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center gap-4 p-3 bg-card/50 hover:bg-card/70 rounded-lg border border-border/30 transition-colors group">
                        <div className="w-16 text-sm font-semibold text-green-400 flex-shrink-0">
                          {event.time}
                        </div>
                        <div className="text-foreground group-hover:text-green-300 transition-colors">{event.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50 hover:border-green-500/30 transition-colors">
                  <h3 className="text-lg font-bold mb-3 text-foreground-dark">{faq.question}</h3>
                  <p className="text-muted-foreground-dark">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-xl border border-border/50 hover:border-green-500/30">
                  <div className="text-center">
                    <Camera size={48} className="text-green-400 mx-auto mb-2" />
                    <p className="text-foreground font-semibold">Photo Gallery</p>
                    <p className="text-muted-foreground text-sm">Coming Soon</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registration CTA */}
        <div className="bg-gradient-to-r from-green-600/90 to-blue-600/90 rounded-2xl p-8 text-white text-center mt-12 border border-green-500/20">
          <h3 className="text-3xl font-bold mb-4">Ready for Adventure?</h3>
          <p className="text-xl mb-6 max-w-2xl mx-auto text-muted-foreground">
            Join us for an unforgettable otaku camping experience. Limited spots available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-700 rounded-full hover:bg-green-50 hover:scale-105 transition-all font-semibold text-lg">
              Register Now - €45
            </button>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white/30 text-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all font-semibold text-lg"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}