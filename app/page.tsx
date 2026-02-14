"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { isRouteVisible } from '@/config/routes';
import { Calendar, MapPin, Users, Star, ArrowRight, Menu, X, ChevronDown, Mail, Facebook, Youtube, UserPlus, Clock } from "lucide-react";
import { FeatureFlag } from "@/lib/features";
import { EventCard } from "@/components/events/EventCard";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sakuraPetals, setSakuraPetals] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    // Generate random positions for sakura petals on client side to avoid hydration mismatch
    const petals = [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3 + Math.random() * 2}s`
    }));
    setSakuraPetals(petals);
  }, []);

  // Discord icon component
  const DiscordIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0001 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
    </svg>
  );

  const upcomingEvents = [
    {
      id: 1,
      title: "Idol Stage: Summer Edition",
      date: "August 17, 2025",
      time: "18:00",
      location: "Vilnius, Compensa Concert Hall",
      category: "concert",
      description: "Our biggest summer concert featuring local and international performers",
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
      featured: true
    },
    {
      id: 3,
      title: "Anime Night: Studio Ghibli Marathon",
      date: "July 20, 2025",
      time: "19:00",
      location: "Kaunas, Cinema Hall",
      category: "screening",
      description: "Marathon screening of beloved Studio Ghibli films"
    }
  ];

  // Helper function to get category emoji
  const getCategoryEmoji = (category: string): string => {
    const emojiMap: { [key: string]: string } = {
      'concert': '🎤',
      'camping': '⛺',
      'convention': '🏢',
      'screening': '🎬',
      'workshop': '🎨',
      'gaming': '🎮',
      'meetup': '👥'
    };
    return emojiMap[category] || '🎌';
  };

  // Helper function to get category colors
  const getCategoryColors = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'concert': 'bg-pink-500/10 text-pink-400',
      'camping': 'bg-green-500/10 text-green-400',
      'convention': 'bg-indigo-500/10 text-indigo-400',
      'screening': 'bg-blue-500/10 text-blue-400',
      'workshop': 'bg-purple-500/10 text-purple-400',
      'gaming': 'bg-orange-500/10 text-orange-400',
      'meetup': 'bg-teal-500/10 text-teal-400'
    };
    return colorMap[category] || 'bg-gray-500/10 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/otaku_lt.png"
                alt="Otaku.lt Logo"
                width={48}
                height={48}
                className="w-12 h-12 dark:invert group-hover:scale-105 transition-transform"
              />
              <span className="text-theme-gradient-primary text-2xl font-bold">
                Otaku.lt
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-foreground/90 hover:text-pink-400 transition-colors relative group flex items-center gap-1"
              >
                <span>🏠</span>
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
              </Link>
              
              <FeatureFlag name="eventCalendar">
                <Link
                  href="/events"
                  className="text-foreground/90 hover:text-pink-400 transition-colors relative group flex items-center gap-1"
                >
                  <span>📅</span>
                  Event Calendar
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
                </Link>
              </FeatureFlag>

              <Link
                href="/communities"
                className="text-foreground/90 hover:text-pink-400 transition-colors relative group flex items-center gap-1"
              >
                <span>🤝</span>
                Communities
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
              </Link>

              {/* Events Dropdown */}
              <div className="relative group">
                <button className="text-foreground/90 hover:text-pink-400 transition-colors relative flex items-center gap-1">
                  <span>🎭</span>
                  Otaku.lt Events
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="py-1">
                    {isRouteVisible('/idol-stage') && (
                      <Link
                        href="/idol-stage"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-pink-600/30 hover:text-white transition-colors"
                      >
                        <span className="text-pink-400">🎤</span>
                        Idol Stage
                      </Link>
                    )}
                    <Link
                      href="/korniha-band"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-pink-600/30 hover:text-white transition-colors"
                    >
                      <span className="text-pink-400">🎸</span>
                      Korniha Band
                    </Link>
                    <Link
                      href="/yurucamp"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-pink-600/30 hover:text-white transition-colors"
                    >
                      <span className="text-pink-400">⛺</span>
                      YuruCamp 2025
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-foreground/90 hover:text-pink-400 transition-colors relative group flex items-center gap-1"
              >
                <span>📧</span>
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-border/40">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-foreground/90 hover:text-pink-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>🏠</span>
                  Home
                </Link>
                <Link
                  href="/events"
                  className="text-foreground/90 hover:text-pink-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>🎌</span>
                  Event Calendar
                </Link>
                <Link
                  href="/communities"
                  className="text-foreground/90 hover:text-pink-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>👥</span>
                  Communities
                </Link>
                
                {/* Otaku.lt Events Section */}
                <div className="py-2">
                  <div className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                    <span>🎭</span>
                    Otaku.lt Events
                  </div>
                  <div className="ml-4 space-y-2">
                    {isRouteVisible('/idol-stage') && (
                      <Link
                        href="/idol-stage"
                        className="text-foreground/80 hover:text-pink-400 transition-colors py-1 flex items-center gap-2 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>🎤</span>
                        Idol Stage
                      </Link>
                    )}
                    <Link
                      href="/korniha-band"
                      className="text-foreground/80 hover:text-pink-400 transition-colors py-1 flex items-center gap-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>🎸</span>
                      Korniha Band
                    </Link>
                    <Link
                      href="/yurucamp"
                      className="text-foreground/80 hover:text-pink-400 transition-colors py-1 flex items-center gap-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>⛺</span>
                      YuruCamp 2025
                    </Link>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="text-foreground/90 hover:text-pink-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>📧</span>
                  Contact
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-card">
                <img 
                  src="/otaku_lt_banner.png" 
                  alt="Otaku.lt Banner" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your central hub for anime, cosplay, J-pop, karaoke, and otaku culture in Lithuania. 
              Powered by community, love for Japan, and good vibes. 🌸
            </p>
            <FeatureFlag name="eventCalendar">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all hover:scale-105 shadow-lg"
                >
                  <Calendar className="mr-2" size={20} />
                  Explore Events
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition-all hover:scale-105"
                >
                  <Star className="mr-2" size={20} />
                  Submit Event
                </Link>
              </div>
            </FeatureFlag>
            
            <FeatureFlag name="upcomingEvents">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    category={event.category}
                    description={event.description}
                    featured={event.featured}
                    getCategoryEmoji={getCategoryEmoji}
                    getCategoryColors={getCategoryColors}
                    href={`/events/${event.id}`}
                  />
                ))}
              </div>
            </FeatureFlag>
          </div>
        </div>

        {/* Floating Sakura Petals */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {sakuraPetals.map((petal, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-50 animate-bounce"
              style={{
                left: petal.left,
                top: petal.top,
                animationDelay: petal.delay,
                animationDuration: petal.duration
              }}
            >
              🌸
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Join Communities - Now available in production */}
            <Link href="/communities" className="block">
              <div className="text-center group cursor-pointer p-6 rounded-xl hover:bg-accent/10 transition-colors">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Join Communities</h3>
                <p className="text-muted-foreground">Connect with fellow otaku on Discord, Facebook, and more</p>
              </div>
            </Link>
            
            {/* Discover Events - Now active in production */}
            <Link href="/events" className="block">
              <div className="text-center group cursor-pointer p-6 rounded-xl hover:bg-accent/10 transition-colors">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Discover Events</h3>
                <p className="text-muted-foreground">From cons to camping, find your next otaku adventure</p>
              </div>
            </Link>
            
            {/* Share Your Event - Inactive in production */}
            {process.env.NODE_ENV === 'production' ? (
              <div className="text-center p-6 rounded-xl opacity-70">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground/70">Share Your Event</h3>
                <p className="text-muted-foreground/70">Coming Soon</p>
              </div>
            ) : (
              <Link href="/submit" className="block">
                <div className="text-center group cursor-pointer p-6 rounded-xl hover:bg-accent/10 transition-colors">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Star className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Share Your Event</h3>
                  <p className="text-muted-foreground">Help grow the community by sharing your otaku events</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop! 📬</h2>
          <p className="text-pink-100 mb-8 text-lg">
            Get monthly updates on anime events, cosplay contests, and community happenings across Lithuania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              disabled
              className="flex-1 px-6 py-3 rounded-full border-0 bg-white/10 text-white/50 placeholder-pink-300/50 cursor-not-allowed"
            />
            <button 
              disabled
              className="px-8 py-3 bg-white/50 text-pink-600/50 rounded-full cursor-not-allowed font-medium"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}