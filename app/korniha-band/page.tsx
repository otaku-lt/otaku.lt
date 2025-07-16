"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Music, Youtube, Instagram, Facebook as FacebookIcon, Mail, Music2, Calendar, MapPin, Users, Mic2, Disc, Play, Pause, Volume2, VolumeX, Award, ExternalLink } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { getKornihaEvents, getFeaturedEvent } from "@/lib/events";
import { GigsSection } from "./components/GigsSection";
import { SongsSection } from "./components/SongsSection";
import { MembersSection } from "./components/MembersSection";
import type { Event, EventSetlist, SetlistDay } from "./types/event";
import type { Song } from "./types/song";
import type { BandMember } from "./types/member";

// Event types are now imported from ./types/event

export default function KornihaBandPage() {
  const [activeTab, setActiveTab] = useState("about");
  const [events, setEvents] = useState<Event[]>([]);
  // Define a type for the setlist day
  type SetlistDay = {
    day?: number;
    type: 'Japanese' | 'Lithuanian';
    songs: string[];
  };

  // Define a type for the setlist
  type EventSetlist = {
    days: SetlistDay[];
  };

  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const pastEvents = events.filter(event => new Date(event.date) < now);
  const featured = [...events]
    .filter(event => event.featured)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching events data...');
        const eventsData = await getKornihaEvents();
        console.log('Events data:', eventsData);
        
        if (eventsData && Array.isArray(eventsData)) {
          setEvents(eventsData);
          
          // Find the first featured event
          const featured = eventsData
            .filter(event => event.featured)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;
          
          setFeaturedEvent(featured);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [bandMembers, setBandMembers] = useState<BandMember[]>([
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
  ]);

  // Song data state
  const [songs, setSongs] = useState<Song[]>([]);

  // Fetch songs data
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        if (response.ok) {
          const data = await response.json();
          setSongs(data);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <ContentPageHeader 
        title="Korniha Band"
        backText="Back to Home"
        backHref="/"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Band Image */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-full max-w-4xl rounded-2xl shadow-xl mb-6 overflow-hidden">
            <img 
              src="/images/band/band.png" 
              alt="Korniha Band - Anime music cover band performing your favorite Japanese songs in Lithuanian and original language"
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Lithuania's favorite anime cover band bringing your beloved anime songs to life 
            with passion, energy, and authentic sound.
          </p>
        </div>

        {/* Hero Section - Next Performance */}
        {featuredEvent && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg transform transition-all hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden">
            {/* Widget Label */}
            <div className="absolute top-0 left-0 bg-white/10 px-4 py-1.5 rounded-br-lg text-sm font-medium text-white/80 backdrop-blur-sm">
              Next Performance
            </div>
            
            <div className="pt-6 mb-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white/95 text-center">{featuredEvent.title}</h3>
            </div>
            
            <p className="text-purple-100 mb-6 text-center text-sm md:text-base max-w-3xl mx-auto">{featuredEvent.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
              <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
                <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/80">When</p>
                  <p className="text-white">
                    {new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {featuredEvent.endDate && (
                      <span> - {new Date(featuredEvent.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/80">Where</p>
                  <p className="text-white">{featuredEvent.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
                <Music2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/80">Setlist</p>
                  <p className="text-white">
                    {!featuredEvent?.setlist ? (
                      'TBA'
                    ) : typeof featuredEvent.setlist === 'string' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs">
                        {featuredEvent.setlist}
                      </span>
                    ) : (
                      <span className="flex flex-wrap gap-1">
                        {featuredEvent.setlist?.days?.length > 0 ? (
                          featuredEvent.setlist.days.map((day, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs">
                              {day?.day ? `Day ${day.day}: ` : ''}{day?.type || 'Performance'}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-white/70">No setlist available yet</span>
                        )}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-5 py-2.5 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all flex items-center text-sm md:text-base">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </button>
              {featuredEvent.link ? (
                <a 
                  href={featuredEvent.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center text-sm md:text-base"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  More Info
                </a>
              ) : (
                <button 
                  disabled
                  className="px-5 py-2.5 border-2 border-white/10 text-white/50 rounded-full font-medium flex items-center text-sm md:text-base cursor-not-allowed"
                  title="More information will be available soon"
                >
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white/70"></span>
                  </span>
                  More Info (coming soon)
                </button>
              )}
            </div>
          </div>
        )}

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

          {activeTab === "members" && <MembersSection members={bandMembers} />}

        {activeTab === "songs" && <SongsSection songs={songs} />}

        {activeTab === "gigs" && <GigsSection events={upcomingEvents} />}

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
    </div>
  );
}