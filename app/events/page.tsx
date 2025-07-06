"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Search, Plus, ArrowLeft } from "lucide-react";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
    {
      id: 1,
      title: "Idol Stage: Summer Edition",
      date: "August 17, 2025",
      time: "18:00",
      location: "Vilnius, Compensa Concert Hall",
      category: "concert",
      description: "Our biggest summer concert featuring local and international performers",
      status: "upcoming",
      featured: true
    },
    {
      id: 2,
      title: "YuruCamp: Weeb Camping Adventure",
      date: "September 5-7, 2025",
      time: "All day",
      location: "Trakai National Park",
      category: "camping",
      description: "3-day camping experience with anime screenings, cosplay contests, and outdoor activities",
      status: "upcoming",
      featured: true
    },
    {
      id: 3,
      title: "Anime Night: Studio Ghibli Marathon",
      date: "July 20, 2025",
      time: "19:00",
      location: "Kaunas, Cinema Hall",
      category: "screening",
      description: "Marathon screening of beloved Studio Ghibli films",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Cosplay Workshop: Props & Makeup",
      date: "July 30, 2025",
      time: "14:00",
      location: "Vilnius, Art Studio",
      category: "workshop",
      description: "Learn prop-making and makeup techniques from experienced cosplayers",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Yu-Gi-Oh! Tournament",
      date: "August 5, 2025",
      time: "12:00",
      location: "Vilnius, Board Game Café",
      category: "gaming",
      description: "Competitive Yu-Gi-Oh! trading card game tournament",
      status: "upcoming"
    },
    {
      id: 6,
      title: "Korniha Band Live Performance",
      date: "August 12, 2025",
      time: "20:00",
      location: "Kaunas, Music Club",
      category: "concert",
      description: "Live performance by Lithuania's favorite anime cover band",
      status: "upcoming"
    }
  ];

  const categories = [
    { id: "all", label: "All Events", count: events.length },
    { id: "concert", label: "Concerts", count: events.filter(e => e.category === "concert").length },
    { id: "camping", label: "Camping", count: events.filter(e => e.category === "camping").length },
    { id: "screening", label: "Screenings", count: events.filter(e => e.category === "screening").length },
    { id: "workshop", label: "Workshops", count: events.filter(e => e.category === "workshop").length },
    { id: "gaming", label: "Gaming", count: events.filter(e => e.category === "gaming").length }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <img 
                src="/otaku_lt.png" 
                alt="Otaku.lt Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                🎌 Events
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Otaku Events 🎌
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing anime, cosplay, and Japanese pop culture events happening across Lithuania
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-4 focus:ring-pink-200 focus:outline-none"
            />
          </div>

          {/* Submit Event Button */}
          <Link
            href="/submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
          >
            <Plus size={20} />
            Submit Event
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-100'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 ${
                event.featured ? 'ring-2 ring-pink-300' : ''
              }`}
            >
              {event.featured && (
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <div className="text-2xl">
                    {event.category === 'concert' ? '🎤' : 
                     event.category === 'camping' ? '⛺' :
                     event.category === 'screening' ? '🎬' :
                     event.category === 'workshop' ? '🎨' :
                     event.category === 'gaming' ? '🎮' : '🎌'}
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{event.description}</p>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.category === 'concert' ? 'bg-pink-100 text-pink-600' :
                  event.category === 'camping' ? 'bg-green-100 text-green-600' :
                  event.category === 'screening' ? 'bg-blue-100 text-blue-600' :
                  event.category === 'workshop' ? 'bg-purple-100 text-purple-600' :
                  event.category === 'gaming' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {event.category}
                </span>
                <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}