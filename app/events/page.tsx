"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Search, Plus, ArrowLeft, LayoutGrid } from "lucide-react";
import EventCalendar from "../../components/Calendar";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Helper function to get category emoji
  const getCategoryEmoji = (category: string): string => {
    const emojiMap: { [key: string]: string } = {
      'concert': '🎤',
      'camping': '⛺',
      'convention': '🏢',
      'screening': '🎬',
      'workshop': '🎨',
      'gaming': '🎮',
      'competition': '🏆',
      'meetup': '👥',
      'special': '✨'
    };
    return emojiMap[category] || '🎌';
  };

  // Helper function to get category colors
  const getCategoryColors = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'concert': 'bg-pink-100 text-pink-600',
      'camping': 'bg-green-100 text-green-600',
      'convention': 'bg-indigo-100 text-indigo-600',
      'screening': 'bg-blue-100 text-blue-600',
      'workshop': 'bg-purple-100 text-purple-600',
      'gaming': 'bg-orange-100 text-orange-600',
      'competition': 'bg-yellow-100 text-yellow-600',
      'meetup': 'bg-teal-100 text-teal-600',
      'special': 'bg-rose-100 text-rose-600'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-600';
  };

  const events = [
    // Featured Events
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
      title: "Baltic Anime Con 2025",
      date: "October 12-14, 2025",
      time: "10:00",
      location: "Vilnius, LITEXPO",
      category: "convention",
      description: "The biggest anime convention in the Baltics with guests, competitions, and vendors",
      status: "upcoming",
      featured: true
    },

    // Concerts & Music
    {
      id: 4,
      title: "Korniha Band Live Performance",
      date: "August 12, 2025",
      time: "20:00",
      location: "Kaunas, Music Club",
      category: "concert",
      description: "Live performance by Lithuania's favorite anime cover band",
      status: "upcoming"
    },
    {
      id: 5,
      title: "J-Rock Night: Visual Kei Tribute",
      date: "July 25, 2025",
      time: "21:00",
      location: "Vilnius, Rock Club",
      category: "concert",
      description: "Tribute night to legendary Visual Kei bands with local performers",
      status: "upcoming"
    },
    {
      id: 6,
      title: "Vocaloid Concert Experience",
      date: "September 20, 2025",
      time: "19:30",
      location: "Klaipėda, Concert Hall",
      category: "concert",
      description: "Holographic Vocaloid concert with Hatsune Miku and friends",
      status: "upcoming"
    },

    // Screenings
    {
      id: 7,
      title: "Anime Night: Studio Ghibli Marathon",
      date: "July 20, 2025",
      time: "19:00",
      location: "Kaunas, Cinema Hall",
      category: "screening",
      description: "Marathon screening of beloved Studio Ghibli films",
      status: "upcoming"
    },
    {
      id: 8,
      title: "Your Name: 35mm Film Screening",
      date: "July 28, 2025",
      time: "20:00",
      location: "Vilnius, Skalvijos Cinema",
      category: "screening",
      description: "Special 35mm film screening of Makoto Shinkai's masterpiece",
      status: "upcoming"
    },
    {
      id: 9,
      title: "Ghost in the Shell: Cyberpunk Night",
      date: "August 3, 2025",
      time: "22:00",
      location: "Šiauliai, Art Cinema",
      category: "screening",
      description: "Late night screening with cyberpunk atmosphere and discussion",
      status: "upcoming"
    },
    {
      id: 10,
      title: "Demon Slayer: Movie Marathon",
      date: "August 15, 2025",
      time: "16:00",
      location: "Panevėžys, Cinema Center",
      category: "screening",
      description: "All Demon Slayer movies back-to-back with breaks",
      status: "upcoming"
    },

    // Gaming
    {
      id: 11,
      title: "Yu-Gi-Oh! Tournament",
      date: "August 5, 2025",
      time: "12:00",
      location: "Vilnius, Board Game Café",
      category: "gaming",
      description: "Competitive Yu-Gi-Oh! trading card game tournament",
      status: "upcoming"
    },
    {
      id: 12,
      title: "Pokémon TCG Championship",
      date: "July 27, 2025",
      time: "11:00",
      location: "Kaunas, Gaming Center",
      category: "gaming",
      description: "Regional Pokémon Trading Card Game championship",
      status: "upcoming"
    },
    {
      id: 13,
      title: "Fighting Game Tournament: Tekken 8",
      date: "August 9, 2025",
      time: "15:00",
      location: "Vilnius, Esports Arena",
      category: "gaming",
      description: "Competitive Tekken 8 tournament with cash prizes",
      status: "upcoming"
    },
    {
      id: 14,
      title: "Retro Gaming: Arcade Night",
      date: "July 24, 2025",
      time: "18:00",
      location: "Klaipėda, Retro Bar",
      category: "gaming",
      description: "Classic arcade games and retro console tournaments",
      status: "upcoming"
    },

    // Workshops
    {
      id: 16,
      title: "Cosplay Workshop: Props & Makeup",
      date: "July 30, 2025",
      time: "14:00",
      location: "Vilnius, Art Studio",
      category: "workshop",
      description: "Learn prop-making and makeup techniques from experienced cosplayers",
      status: "upcoming"
    },
    {
      id: 17,
      title: "Manga Drawing Masterclass",
      date: "July 26, 2025",
      time: "13:00",
      location: "Vilnius, Art Academy",
      category: "workshop",
      description: "Professional manga artist teaches character design and storytelling",
      status: "upcoming"
    },
    {
      id: 18,
      title: "Sewing Workshop: Cosplay Basics",
      date: "August 14, 2025",
      time: "10:00",
      location: "Šiauliai, Craft Studio",
      category: "workshop",
      description: "Learn basic sewing techniques for cosplay costume creation",
      status: "upcoming"
    },
    {
      id: 19,
      title: "Voice Acting Workshop: Anime Dubbing",
      date: "September 1, 2025",
      time: "15:00",
      location: "Vilnius, Recording Studio",
      category: "workshop",
      description: "Learn anime voice acting techniques with professional voice actors",
      status: "upcoming"
    },

    // Competitions
    {
      id: 20,
      title: "Cosplay Competition: Summer Edition",
      date: "July 21, 2025",
      time: "16:00",
      location: "Vilnius, Convention Center",
      category: "competition",
      description: "Regional cosplay competition with multiple categories and prizes",
      status: "upcoming"
    },
    {
      id: 21,
      title: "AMV (Anime Music Video) Contest",
      date: "August 18, 2025",
      time: "20:00",
      location: "Kaunas, Digital Arts Center",
      category: "competition",
      description: "Annual anime music video creation contest and screening",
      status: "upcoming"
    },
    {
      id: 22,
      title: "Karaoke Championship: Anime Songs",
      date: "September 5, 2025",
      time: "19:00",
      location: "Vilnius, Karaoke Club",
      category: "competition",
      description: "Sing your favorite anime opening and ending themes",
      status: "upcoming"
    },

    // Meetups
    {
      id: 23,
      title: "Anime Discussion: Attack on Titan Finale",
      date: "July 22, 2025",
      time: "18:30",
      location: "Vilnius, Café Library",
      category: "meetup",
      description: "Discuss the finale of Attack on Titan with fellow fans",
      status: "upcoming"
    },
    {
      id: 24,
      title: "J-Pop Dance Practice",
      date: "July 29, 2025",
      time: "19:00",
      location: "Kaunas, Dance Studio",
      category: "meetup",
      description: "Learn and practice popular J-Pop choreographies",
      status: "upcoming"
    },
    {
      id: 25,
      title: "Otaku Book Club: Light Novel Discussion",
      date: "August 11, 2025",
      time: "17:00",
      location: "Šiauliai, Bookstore Café",
      category: "meetup",
      description: "Monthly book club discussing popular light novels",
      status: "upcoming"
    },

    // Special Events
    {
      id: 26,
      title: "Maid Café Pop-up",
      date: "August 19-20, 2025",
      time: "12:00",
      location: "Vilnius, Themed Café",
      category: "special",
      description: "Two-day maid café experience with themed menu and entertainment",
      status: "upcoming"
    },
    {
      id: 27,
      title: "Anime Trivia Night",
      date: "July 31, 2025",
      time: "20:00",
      location: "Kaunas, Pub Quiz",
      category: "special",
      description: "Test your anime knowledge in this fun trivia competition",
      status: "upcoming"
    }
  ];

  const categories = [
    { id: "all", label: "All Events", count: events.length },
    { id: "concert", label: "Concerts", count: events.filter(e => e.category === "concert").length },
    { id: "camping", label: "Camping", count: events.filter(e => e.category === "camping").length },
    { id: "convention", label: "Conventions", count: events.filter(e => e.category === "convention").length },
    { id: "screening", label: "Screenings", count: events.filter(e => e.category === "screening").length },
    { id: "workshop", label: "Workshops", count: events.filter(e => e.category === "workshop").length },
    { id: "gaming", label: "Gaming", count: events.filter(e => e.category === "gaming").length },
    { id: "competition", label: "Competitions", count: events.filter(e => e.category === "competition").length },
    { id: "meetup", label: "Meetups", count: events.filter(e => e.category === "meetup").length },
    { id: "special", label: "Special Events", count: events.filter(e => e.category === "special").length }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Convert event data to calendar format
  const convertToCalendarEvents = (events: any[]) => {
    return events.map(event => {
      // Parse date and time
      const eventDate = new Date(event.date);
      const [hours, minutes] = event.time === "All day" ? [0, 0] : event.time.split(':').map(Number);
      
      const start = new Date(eventDate);
      start.setHours(hours, minutes ?? 0);
      
      const end = new Date(start);
      if (event.time === "All day") {
        end.setHours(23, 59); // All day event
      } else {
        end.setHours(hours + 2, minutes ?? 0); // Default 2-hour duration
      }
      
      return {
        id: event.id,
        title: event.title,
        start,
        end,
        location: event.location,
        category: event.category,
        description: event.description,
      };
    });
  };

  const calendarEvents = convertToCalendarEvents(filteredEvents);

  const handleEventClick = (event: any) => {
    // Navigate to event details or show modal
    console.log('Event clicked:', event);
  };

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
                🎌 Event Calendar
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Event Calendar 🎌
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

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-theme-primary-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={16} className="inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-theme-primary-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid size={16} className="inline mr-2" />
              List View
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <EventCalendar 
            events={calendarEvents}
            onSelectEvent={handleEventClick}
          />
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <>
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
                    {getCategoryEmoji(event.category)}
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
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColors(event.category)}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
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
          </>
        )}
      </div>
    </div>
  );
}