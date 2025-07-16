"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Tent, TreePine, Mountain, Camera, ArrowRight, ArrowUpRight, Star } from "lucide-react";
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
      icon: <TreePine className="text-green-600" size={24} />,
      title: "Nature & Anime",
      description: "Perfect blend of outdoor adventure and anime culture"
    },
    {
      icon: <Camera className="text-green-600" size={24} />,
      title: "Photo Opportunities",
      description: "Stunning locations for cosplay photography and memories"
    },
    {
      icon: <Star className="text-green-600" size={24} />,
      title: "Unique Experience",
      description: "First-of-its-kind otaku camping event in Lithuania"
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

        {/* Event Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">YuruCamp 2025</h2>
              <div className="flex items-center gap-4 text-lg text-muted-foreground-dark">
                <div className="flex items-center gap-1">
                  <Calendar size={18} />
                  <span>August 29-31</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>Brazuolės stovyklavietė</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-8 py-3 bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors font-semibold text-lg hover:scale-105 transform">
                Register Now
              </button>
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

              {/* Detailed Description */}
              <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border-dark/50">
                <h3 className="text-2xl font-bold mb-6 text-foreground">What is YuruCamp?</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    YuruCamp is Lithuania's first otaku camping event, inspired by the beloved anime series. 
                    It's a unique opportunity to connect with nature while celebrating our shared love for 
                    anime, manga, and Japanese pop culture.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Over three days, participants will enjoy outdoor anime screenings, cosplay photoshoots 
                    in beautiful natural settings, campfire storytelling, and plenty of opportunities to make 
                    new friends who share your interests.
                  </p>
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