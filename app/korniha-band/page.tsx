"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Music, Youtube, Instagram, Facebook as FacebookIcon, Mail, Music2, Calendar, MapPin, Users, Mic2, Disc, Play, Pause, Volume2, VolumeX, Award, ExternalLink } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { getKornihaEvents, getFeaturedEvent } from "@/lib/events";
import type { Event } from "@/app/api/events/route";

export default function KornihaBandPage() {
  const [activeTab, setActiveTab] = useState("about");
  const [events, setEvents] = useState<Event[]>([]);
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

  const songList = [
    { title: "Unravel", anime: "Tokyo Ghoul", type: "Cover", popularity: "Fan Favorite" },
    { title: "Guren no Yumiya", anime: "Attack on Titan", type: "Cover", popularity: "High Energy" },
    { title: "Pretender", anime: "Your Name", type: "Cover", popularity: "Emotional" },
    { title: "Kimetsu no Yaiba", anime: "Demon Slayer", type: "Cover", popularity: "Epic" },
    { title: "Weeb Dreams", anime: "Original", type: "Original", popularity: "Unique" },
    { title: "Lithuania Otaku", anime: "Original", type: "Original", popularity: "Local Pride" }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <ContentPageHeader 
        title=""
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Band Image */}
        <div className="flex flex-col items-center mb-12 text-center">
          <img 
            src="/images/band/band.png" 
            alt="Korniha Band - Anime music cover band performing your favorite Japanese songs in Lithuanian and original language"
            className="w-full max-w-4xl rounded-2xl shadow-xl mb-6"
          />
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Lithuania's favorite anime cover band bringing your beloved anime songs to life 
            with passion, energy, and authentic sound.
          </p>
        </div>

        {/* Hero Section */}
        {featuredEvent && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Next Performance</h2>
            <h3 className="text-2xl font-semibold mb-1">{featuredEvent.title}</h3>
            <p className="text-purple-100 mb-4">{featuredEvent.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {featuredEvent.endDate && (
                  <span className="mx-1">- {new Date(featuredEvent.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                )}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{featuredEvent.location}</span>
              </div>
              <div className="flex items-center">
                <Music2 className="mr-2 h-5 w-5" />
                <span>Setlist: {featuredEvent.setlist}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-100 transition-colors flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                More Info
              </button>
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

          {activeTab === "members" && (
            <div className="grid md:grid-cols-2 gap-6">
              {bandMembers.map((member, index) => (
                <div key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    {['Holms', 'Korniha'].includes(member.name) ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400">
                        <img 
                          src={`/images/band/${member.name.toLowerCase()}.${member.name === 'Holms' ? 'png' : 'jpg'}`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {member.name[0]}
                      </div>
                    )}
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
            <div className="space-y-6">
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Upcoming Shows</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event: Event) => (
                    <div 
                      key={event.id} 
                      className={`p-4 rounded-xl ${event.featured ? 'bg-purple-50 dark:bg-gray-700/50' : 'bg-white/50 dark:bg-gray-800/30'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{event.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                            {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric' 
                            })}`}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                        </div>
                          <button 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              event.featured 
                                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                : 'bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            More Info
                          </button>
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