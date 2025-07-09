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
      date: "September 5, 2025",
      events: [
        { time: "15:00", activity: "Check-in & Camp Setup" },
        { time: "17:00", activity: "Welcome Ceremony" },
        { time: "19:00", activity: "Campfire Stories & Anime Tales" },
        { time: "21:00", activity: "Stargazing & Chill Music" }
      ]
    },
    {
      day: "Saturday",
      date: "September 6, 2025",
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
      date: "September 7, 2025",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The ultimate otaku camping experience! Join fellow weebs for a unique outdoor adventure 
            combining nature, anime, and unforgettable memories.
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Organized by Y.M.C.A (Yuru Mobile Camping Assembly)
          </div>
        </div>

        {/* Event Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">YuruCamp 2025</h2>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-1">
                  <Calendar size={18} />
                  <span>September 5-7, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>Trakai National Park</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-8 py-3 bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors font-semibold text-lg">
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
                  : 'bg-white/80 text-gray-700 hover:bg-green-100'
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
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Detailed Description */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">What is YuruCamp?</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-4">
                    YuruCamp is Lithuania's first otaku camping event, inspired by the beloved anime series. 
                    It's a unique opportunity to connect with nature while celebrating our shared love for 
                    anime, manga, and Japanese pop culture.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Over three days, participants will enjoy outdoor anime screenings, cosplay photoshoots 
                    in beautiful natural settings, campfire storytelling, and plenty of opportunities to make 
                    new friends who share your interests.
                  </p>
                  <p className="text-gray-600">
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
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Calendar className="text-green-600" size={24} />
                    {day.day} - {day.date}
                  </h3>
                  <div className="space-y-3">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-16 text-sm font-semibold text-green-600 flex-shrink-0">
                          {event.time}
                        </div>
                        <div className="text-gray-700">{event.activity}</div>
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
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-xl">
                  <div className="text-center">
                    <Camera size={48} className="text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">Photo Gallery</p>
                    <p className="text-white/80 text-sm">Coming Soon</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registration CTA */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center mt-12">
          <h3 className="text-3xl font-bold mb-4">Ready for Adventure?</h3>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join us for an unforgettable otaku camping experience. Limited spots available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-green-600 rounded-full hover:bg-green-50 transition-colors font-semibold text-lg">
              Register Now - €45
            </button>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-green-600 transition-colors font-semibold text-lg"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}