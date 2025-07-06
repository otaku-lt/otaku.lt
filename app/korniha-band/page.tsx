"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Music, Play, Calendar, MapPin, Users, Award, ExternalLink } from "lucide-react";

export default function KornihaBandPage() {
  const [activeTab, setActiveTab] = useState("about");

  const bandMembers = [
    {
      name: "Alex",
      role: "Lead Vocals & Guitar",
      description: "Passionate about anime OSTs and Japanese rock",
      favorite: "Attack on Titan themes"
    },
    {
      name: "Mika",
      role: "Bass Guitar",
      description: "Groove master with love for J-pop rhythms",
      favorite: "Your Name soundtrack"
    },
    {
      name: "Ryuu",
      role: "Drums",
      description: "Energetic drummer inspired by anime openings",
      favorite: "Demon Slayer OPs"
    },
    {
      name: "Yuki",
      role: "Keyboard & Backing Vocals",
      description: "Melodic genius behind our anime arrangements",
      favorite: "Studio Ghibli songs"
    }
  ];

  const upcomingGigs = [
    {
      title: "Korniha Live at Idol Stage",
      date: "August 12, 2025",
      venue: "Kaunas Music Club",
      type: "Solo Concert",
      description: "Full concert featuring our best anime covers and original songs"
    },
    {
      title: "Anime Night Performance",
      date: "July 25, 2025",
      venue: "Vilnius Underground",
      type: "Guest Performance",
      description: "Special guest performance at monthly anime night"
    }
  ];

  const pastGigs = [
    {
      title: "Idol Stage Winter Edition",
      date: "December 15, 2024",
      venue: "Vilnius Palace of Culture",
      attendance: 180,
      highlights: ["Crowd favorite: Unravel (Tokyo Ghoul)", "Special acoustic set"]
    },
    {
      title: "Comic Con Vilnius",
      date: "October 2024",
      venue: "Litexpo",
      attendance: 300,
      highlights: ["Opening ceremony performance", "Meet & greet with fans"]
    }
  ];

  const songList = [
    { title: "Unravel", anime: "Tokyo Ghoul", type: "Cover", popularity: "Fan Favorite" },
    { title: "Guren no Yumiya", anime: "Attack on Titan", type: "Cover", popularity: "High Energy" },
    { title: "Pretender", anime: "Your Name", type: "Cover", popularity: "Emotional" },
    { title: "Kimetsu no Yaiba", anime: "Demon Slayer", type: "Cover", popularity: "Epic" },
    { title: "Weeb Dreams", anime: "Original", type: "Original", popularity: "Unique" },
    { title: "Lithuania Otaku", anime: "Original", type: "Original", popularity: "Local Pride" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <img 
                src="/otaku_lt.png" 
                alt="Otaku.lt Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎸 Korniha Band
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Korniha Band 🎸
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lithuania's favorite anime cover band bringing your beloved anime songs to life 
            with passion, energy, and authentic sound.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Next Live Performance</h2>
              <div className="space-y-2 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>August 12, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>Kaunas Music Club</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={20} />
                  <span>Solo Concert - Full Setlist</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-semibold text-lg">
                Get Tickets
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: "about", label: "About" },
            { id: "members", label: "Members" },
            { id: "songs", label: "Songs" },
            { id: "gigs", label: "Gigs" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-purple-100'
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">About Korniha Band</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-4">
                    Korniha Band was born from a shared passion for anime music and the desire to bring 
                    those incredible soundtracks to life. We're a group of Lithuanian musicians who grew up 
                    loving anime and wanted to share that love through music.
                  </p>
                  <p className="text-gray-600 mb-4">
                    From epic opening themes to emotional ending songs, we carefully arrange and perform 
                    both classic and modern anime music. Our goal is to create an authentic experience 
                    that captures the spirit and emotion of the original compositions.
                  </p>
                  <p className="text-gray-600">
                    Whether you're a long-time anime fan or just discovering this amazing music, 
                    we invite you to join us for an unforgettable musical journey through the world of anime.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="text-purple-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">50+ Songs</h4>
                  <p className="text-gray-600 text-sm">Extensive repertoire of anime covers and originals</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-pink-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">500+ Fans</h4>
                  <p className="text-gray-600 text-sm">Growing community of anime music lovers</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-purple-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">3 Years</h4>
                  <p className="text-gray-600 text-sm">Performing at events across Lithuania</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="grid md:grid-cols-2 gap-6">
              {bandMembers.map((member, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                      <p className="text-purple-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{member.description}</p>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <span className="text-sm font-medium text-purple-600">Favorite: </span>
                    <span className="text-sm text-gray-700">{member.favorite}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "songs" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Repertoire</h3>
              <div className="space-y-3">
                {songList.map((song, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{song.title}</h4>
                        <p className="text-sm text-gray-600">{song.anime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        song.type === 'Original' ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {song.type}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {song.popularity}
                      </span>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gigs" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Gigs</h3>
                <div className="space-y-4">
                  {upcomingGigs.map((gig, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{gig.title}</h4>
                          <div className="flex items-center gap-4 text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>{gig.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{gig.venue}</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{gig.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all">
                            Get Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Past Performances</h3>
                <div className="space-y-4">
                  {pastGigs.map((gig, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{gig.title}</h4>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>{gig.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{gig.venue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              <span>{gig.attendance} people</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {gig.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center mt-12">
          <h3 className="text-3xl font-bold mb-4">Book Korniha Band</h3>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Want us to perform at your event? We'd love to bring anime music to your audience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-semibold text-lg"
            >
              Contact Us
            </Link>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2">
              <ExternalLink size={20} />
              Listen on Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}