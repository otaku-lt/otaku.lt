"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Music, Youtube, Instagram, Facebook as FacebookIcon, Mail, Music2, Calendar, MapPin, Users, Mic2, Disc, Play, Pause, Volume2, VolumeX, Award, ExternalLink } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

export default function KornihaBandPage() {
  const [activeTab, setActiveTab] = useState("about");

  const bandMembers = [
    {
      name: "Korniha",
      role: "Vocals",
      description: "A free spirit with an ethereal voice that can go from whisper to war cry in a heartbeat. Her energy is both powerful and dreamy, filling the room with an otherworldly presence.",
      favorite: "Carrying You (Laputa: Castle in the Sky)"
    },
    {
      name: "Holms",
      role: "Guitar",
      description: "Grumpy cultured weeb with an encyclopedic knowledge of JDM cars. His guitar riffs are as precise as a well-tuned engine, and his love for Japanese pop culture runs as deep as his collection of rare anime figures.",
      favorite: "Dango Daikazoku (Clannad)"
    },
    {
      name: "Tdude",
      role: "Percussion",
      description: "The rhythm keeper who believes everything is a drum if you hit it right. His sticks are an extension of his arms, and his energy is as infectious as the beats he creates.",
      favorite: "Kokoro Pyon Pyon (Is the Order a Rabbit?)"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <ContentPageHeader 
        title="🎸 Korniha Band"
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Korniha Band 🎸
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Lithuania's favorite anime cover band bringing your beloved anime songs to life 
            with passion, energy, and authentic sound.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Next Live Performance</h2>
              <div className="space-y-2 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>August 29-30, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>YuruCamp 2025, "Bražuolės stovyklavietė"</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={20} />
                  <span>JP and LT setlists per both days</span>
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
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
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
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">About Korniha Band</h3>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Korniha Band was born from a shared passion for anime music and the desire to bring 
                    those incredible soundtracks to life. We're a group of Lithuanian musicians who grew up 
                    loving anime and wanted to share that love through music.
                  </p>
                  <p className="text-gray-600 dark:text-gray-200 mb-4">
                    From epic opening themes to emotional ending songs, we carefully arrange and perform 
                    both classic and modern anime music. Our goal is to create an authentic experience 
                    that captures the spirit and emotion of the original compositions.
                  </p>
                  <p className="text-gray-600 dark:text-gray-200">
                    Whether you're a long-time anime fan or just discovering this amazing music, 
                    we invite you to join us for an unforgettable musical journey through the world of anime.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="text-purple-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 dark:text-white">30+ Songs</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Performing anime covers in both Japanese and Lithuanian</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-pink-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 dark:text-white">20+ Events</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Performing at cons and events across the Baltic states</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-purple-600" size={32} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 dark:text-white">1 Year</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Passionately performing since 2024</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="grid md:grid-cols-2 gap-6">
              {bandMembers.map((member, index) => (
                <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{member.description}</p>
                  <div className="bg-purple-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Favorite: </span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{member.favorite}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "songs" && (
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Repertoire</h3>
              <div className="space-y-3">
                {songList.map((song, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-purple-50 dark:bg-gray-700/50 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{song.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{song.anime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        song.type === 'Original' 
                          ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' 
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      }`}>
                        {song.type}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {song.popularity}
                      </span>
                      <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
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
                    <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{gig.title}</h4>
                          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>{gig.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{gig.venue}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{gig.description}</p>
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
                    <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
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
                            <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
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
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center mt-12 shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Book Korniha Band</h3>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Want us to perform at your event? We'd love to bring anime music to your audience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:korniha.band@korniha.lt"
              className="px-8 py-3 bg-white dark:bg-gray-100 text-purple-600 rounded-full hover:bg-purple-50 dark:hover:bg-gray-200 transition-colors font-semibold text-lg flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Mail size={20} />
              Contact Us
            </a>
            <a 
              href="https://www.youtube.com/@KornihaBand" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Youtube size={20} />
              YouTube
            </a>
            <a 
              href="https://www.facebook.com/kornihaband" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <FacebookIcon size={20} />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}