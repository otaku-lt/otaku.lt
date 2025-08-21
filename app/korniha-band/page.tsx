"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Music, Youtube, Instagram, Facebook as FacebookIcon, Mail, Music2, Calendar, MapPin, Users, Mic2, Disc, Play, Pause, Volume2, VolumeX, Award, ExternalLink } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { getKornihaEvents, getFeaturedEvent } from "@/lib/events";
import { GigsSection } from "./components/GigsSection";
import { SongsSection } from "./components/SongsSection";
import { MembersSection } from "./components/MembersSection";
import { AboutSection } from "./components/AboutSection";
import { FeaturedEvent } from "./components/FeaturedEvent";
import type { Event, EventSetlist, SetlistDay } from "./types/event";
import type { Song } from "./types/song";
import type { BandMember } from "./types/member";

// Event types are now imported from ./types/event

export default function KornihaBandPage() {
  const [activeTab, setActiveTab] = useState("about");
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const pastEvents = events.filter(event => new Date(event.date) < now);
  const nextPerformance = upcomingEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching events data...');
        const eventsData = await getKornihaEvents();
        console.log('Events data:', eventsData);
        
        if (eventsData && Array.isArray(eventsData)) {
          setEvents(eventsData);
          
          // Find the next upcoming performance
          const now = new Date();
          const nextEvent = eventsData
            .filter(event => new Date(event.date) >= now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;
          
          setFeaturedEvent(nextEvent);
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
        {nextPerformance && <FeaturedEvent event={nextPerformance} className="mb-8" />}

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
          {activeTab === "about" && <AboutSection />}

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