"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { EventTabs } from "@/components/events/EventTabs";
import { EventCard } from "@/components/events/EventCard";
import EventCalendar from "@/components/Calendar";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: 'upcoming' | 'past' | 'cancelled';
  featured?: boolean;
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/all');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  // Calculate category counts
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

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEventClick = (event: any) => {
    // Navigate to event details
    router.push(`/events/${event.id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader 
        title={
          <>
            <span className="inline-block mr-2">🎌</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Otaku Event Calendar
            </span>
          </>
        } 
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
        {viewMode === 'list' && isClient && (
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