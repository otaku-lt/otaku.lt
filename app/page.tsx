"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Star, ArrowRight, Menu, X, ChevronDown, Mail, Facebook, Youtube, UserPlus } from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      location: "Vilnius",
      type: "Concert",
      featured: true
    },
    {
      id: 2,
      title: "YuruCamp: Weeb Camping Adventure",
      date: "September 5-7, 2025",
      location: "Trakai",
      type: "Camping",
      featured: true
    },
    {
      id: 3,
      title: "Anime Night: Studio Ghibli Marathon",
      date: "July 20, 2025",
      location: "Kaunas",
      type: "Screening"
    }
  ];

  return (
    <div className="bg-theme-gradient-light min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/otaku_lt.png" 
                alt="Otaku.lt Logo" 
                className="w-12 h-12 group-hover:scale-105 transition-transform"
              />
              <span className="text-theme-gradient-primary text-2xl font-bold">
                Otaku.lt
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-pink-600 transition-colors relative group flex items-center gap-1"
              >
                <span>🏠</span>
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </Link>
              
              <Link
                href="/events"
                className="text-gray-700 hover:text-pink-600 transition-colors relative group flex items-center gap-1"
              >
                <span>🎌</span>
                Event Calendar
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </Link>

              <Link
                href="/communities"
                className="text-gray-700 hover:text-pink-600 transition-colors relative group flex items-center gap-1"
              >
                <span>👥</span>
                Communities
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </Link>

              {/* Events Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-pink-600 transition-colors relative flex items-center gap-1">
                  <span>🎭</span>
                  Otaku.lt Events
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/idol-stage"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <span>🎤</span>
                      Idol Stage
                    </Link>
                    <Link
                      href="/yurucamp"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <span>⛺</span>
                      YuruCamp
                    </Link>
                    <Link
                      href="/korniha-band"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <span>🎸</span>
                      Korniha Band
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-pink-600 transition-colors relative group flex items-center gap-1"
              >
                <span>📧</span>
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
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
            <nav className="md:hidden mt-4 py-4 border-t border-pink-200">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-pink-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>🏠</span>
                  Home
                </Link>
                <Link
                  href="/events"
                  className="text-gray-700 hover:text-pink-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>🎌</span>
                  Event Calendar
                </Link>
                <Link
                  href="/communities"
                  className="text-gray-700 hover:text-pink-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>👥</span>
                  Communities
                </Link>
                
                {/* Otaku.lt Events Section */}
                <div className="py-2">
                  <div className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                    <span>🎭</span>
                    Otaku.lt Events
                  </div>
                  <div className="ml-4 space-y-2">
                    <Link
                      href="/idol-stage"
                      className="text-gray-700 hover:text-pink-600 transition-colors py-1 flex items-center gap-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>🎤</span>
                      Idol Stage
                    </Link>
                    <Link
                      href="/yurucamp"
                      className="text-gray-700 hover:text-pink-600 transition-colors py-1 flex items-center gap-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>⛺</span>
                      YuruCamp
                    </Link>
                    <Link
                      href="/korniha-band"
                      className="text-gray-700 hover:text-pink-600 transition-colors py-1 flex items-center gap-2 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>🎸</span>
                      Korniha Band
                    </Link>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-pink-600 transition-colors py-2 flex items-center gap-2"
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
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src="/otaku_lt_banner.png" 
                alt="Otaku.lt Banner" 
                className="w-full max-w-4xl h-auto hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg"
              />
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your central hub for anime, cosplay, J-pop, karaoke, and otaku culture in Lithuania. 
              Powered by community, love for Japan, and good vibes. 🌸
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all hover:scale-105 shadow-lg"
              >
                <Calendar className="mr-2" size={20} />
                Explore Events
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition-all hover:scale-105"
              >
                <Star className="mr-2" size={20} />
                Submit Event
              </Link>
            </div>
          </div>

          {/* Featured Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 ${
                  event.featured ? 'ring-2 ring-pink-300' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-sm font-medium text-pink-600">{event.type}</span>
                  </div>
                  {event.featured && (
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar size={16} />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Sakura Petals */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-50 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Join Communities</h3>
              <p className="text-gray-600">Connect with fellow otaku on Discord, Facebook, and more</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Events</h3>
              <p className="text-gray-600">From cons to camping, find your next otaku adventure</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Event</h3>
              <p className="text-gray-600">Help grow the community by sharing your otaku events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop! 📬
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Get monthly updates on anime events, cosplay contests, and community happenings across Lithuania.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-pink-200 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-pink-600 rounded-full hover:bg-pink-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/otaku_lt.png" 
                  alt="Otaku.lt Logo" 
                  className="w-10 h-10 filter brightness-0 invert"
                />
                <span className="text-xl font-bold">Otaku.lt</span>
              </div>
              <p className="text-gray-400">
                Lithuania's premier hub for otaku culture, bringing together anime fans, cosplayers, and Japanese pop culture enthusiasts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-pink-400 flex items-center gap-2"><Calendar size={16} className="text-white" />Event Calendar</Link></li>
                <li><Link href="/communities" className="hover:text-pink-400 flex items-center gap-2"><Users size={16} className="text-white" />Communities</Link></li>
                <li><Link href="/submit" className="hover:text-pink-400 flex items-center gap-2"><UserPlus size={16} className="text-white" />Submit Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Otaku.lt Events</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/idol-stage" className="hover:text-pink-400 flex items-center gap-2"><Star size={16} className="text-white" />Idol Stage</Link></li>
                <li><Link href="/yurucamp" className="hover:text-pink-400 flex items-center gap-2"><MapPin size={16} className="text-white" />YuruCamp</Link></li>
                <li><Link href="/korniha-band" className="hover:text-pink-400 flex items-center gap-2"><Users size={16} className="text-white" />Korniha Band</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-pink-400 flex items-center gap-2"><Mail size={16} className="text-white" />Contact Us</Link></li>
                <li><a href="#" className="hover:text-pink-400 flex items-center gap-2"><DiscordIcon size={16} className="text-white" />Discord</a></li>
                <li><a href="#" className="hover:text-pink-400 flex items-center gap-2"><Facebook size={16} className="text-white" />Facebook</a></li>
                <li><a href="#" className="hover:text-pink-400 flex items-center gap-2"><Youtube size={16} className="text-white" />YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Otaku.lt. Made with 💖 for Lithuania's otaku community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}