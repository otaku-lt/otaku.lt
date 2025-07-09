"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Play, Image, Award } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

export default function IdolStagePage() {
  const [selectedEdition, setSelectedEdition] = useState("summer-2025");

  const editions = [
    {
      id: "summer-2025",
      title: "Summer Edition 2025",
      date: "August 17, 2025",
      status: "upcoming",
      location: "Vilnius, Compensa Concert Hall",
      description: "Our biggest summer concert featuring local and international performers",
      highlights: ["5 Main Performers", "Cosplay Contest", "Interactive Games", "Food Vendors"],
      ticketPrice: "€25"
    },
    {
      id: "winter-2024",
      title: "Winter Edition 2024",
      date: "December 15, 2024",
      status: "completed",
      location: "Vilnius, Palace of Culture",
      description: "A magical winter celebration with snow-themed performances and cozy atmosphere",
      highlights: ["4 Main Performers", "Winter Cosplay Contest", "Hot Chocolate Bar", "Photo Booth"],
      attendance: 180,
      photos: 45,
      videos: 8
    },
    {
      id: "autumn-2024",
      title: "Autumn Edition 2024",
      date: "October 20, 2024",
      status: "completed",
      location: "Kaunas, Music Hall",
      description: "Our first major event that started it all - featuring autumn vibes and amazing performances",
      highlights: ["3 Main Performers", "Debut Cosplay Contest", "Karaoke Corner", "Merchandise Stand"],
      attendance: 120,
      photos: 32,
      videos: 5
    }
  ];

  const currentEdition = editions.find(e => e.id === selectedEdition);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <ContentPageHeader 
        title="🎤 Idol Stage"
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Idol Stage 🎤
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium otaku concerts bringing together amazing performers, cosplayers, and fans. 
            Organized by Idol Stage Baltics - where passion meets performance.
          </p>
        </div>

        {/* Edition Selector */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {editions.map((edition) => (
            <button
              key={edition.id}
              onClick={() => setSelectedEdition(edition.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedEdition === edition.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-100'
              }`}
            >
              {edition.title}
              {edition.status === 'upcoming' && (
                <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl">
                  🎌
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{currentEdition?.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{currentEdition?.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{currentEdition?.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-6">{currentEdition?.description}</p>

              {/* Highlights */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {currentEdition?.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {currentEdition?.status === 'upcoming' && (
                  <>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg">
                      <Calendar size={20} />
                      Get Tickets ({currentEdition.ticketPrice})
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition-all">
                      <Users size={20} />
                      Join Waiting List
                    </button>
                  </>
                )}
                {currentEdition?.status === 'completed' && (
                  <>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg">
                      <Image size={20} />
                      View Photos ({currentEdition.photos})
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition-all">
                      <Play size={20} />
                      Watch Videos ({currentEdition.videos})
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Previous Events Gallery */}
            {currentEdition?.status === 'completed' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Event Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <Play size={32} className="text-white" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Event Stats</h3>
              <div className="space-y-4">
                {currentEdition?.status === 'upcoming' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tickets Available</span>
                      <span className="font-semibold text-green-600">Yes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expected Attendance</span>
                      <span className="font-semibold">200+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price Range</span>
                      <span className="font-semibold">{currentEdition.ticketPrice}</span>
                    </div>
                  </>
                )}
                {currentEdition?.status === 'completed' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Attendance</span>
                      <span className="font-semibold">{currentEdition.attendance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Photos Taken</span>
                      <span className="font-semibold">{currentEdition.photos}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Videos Recorded</span>
                      <span className="font-semibold">{currentEdition.videos}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* About Idol Stage Baltics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">About Idol Stage Baltics</h3>
              <p className="text-gray-600 mb-4">
                We're passionate about bringing the best of Japanese pop culture to Lithuania through 
                high-quality events that celebrate music, cosplay, and community.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="text-pink-500" size={16} />
                  <span className="text-sm text-gray-600">Premium Event Organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-pink-500" size={16} />
                  <span className="text-sm text-gray-600">Community-Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-pink-500" size={16} />
                  <span className="text-sm text-gray-600">Regular Events</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="mb-4">
                Want to perform at our next event or have questions about Idol Stage?
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-white text-pink-600 rounded-full hover:bg-pink-50 transition-colors font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}