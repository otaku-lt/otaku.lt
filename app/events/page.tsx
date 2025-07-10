"use client";

import React, { useState, useMemo } from "react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { EventTabs } from "@/components/events/EventTabs";
import { EventCard } from "@/components/events/EventCard";
import EventCalendar from "@/components/Calendar";
import { Calendar, MapPin } from "lucide-react";

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
      'concert': 'bg-pink-500/10 text-pink-400',
      'camping': 'bg-green-500/10 text-green-400',
      'convention': 'bg-indigo-500/10 text-indigo-400',
      'screening': 'bg-blue-500/10 text-blue-400',
      'workshop': 'bg-purple-500/10 text-purple-400',
      'gaming': 'bg-orange-500/10 text-orange-400',
      'competition': 'bg-yellow-500/10 text-yellow-400',
      'meetup': 'bg-teal-500/10 text-teal-400',
      'special': 'bg-rose-500/10 text-rose-400'
    };
    return colorMap[category] || 'bg-gray-500/10 text-gray-400';
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

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchTerm]);

  // Convert event data to calendar format
  const calendarEvents = useMemo(() => {
    return filteredEvents.map(event => {
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
  }, [filteredEvents]);

  const handleEventClick = (event: any) => {
    // Navigate to event details or show modal
    console.log('Event clicked:', event);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContentPageHeader 
        title="🎌 Event Calendar"
        showBackButton={true}
        backHref="/"
        backText="Back to Home"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Otaku Event Calendar 🎌
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover anime, cosplay, and Japanese culture events across Lithuania. 
            Find your next otaku adventure or submit your own event to our calendar.
          </p>
        </div>

        {/* Event Tabs */}
        <EventTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          className="mb-8"
        />

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <EventCalendar 
            events={calendarEvents}
            onSelectEvent={handleEventClick}
          />
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div>
                {/* Events Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
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

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground/80">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}