"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { EventTabs } from "@/components/events/EventTabs";
import { EventCard } from "@/components/events/EventCard";
import EventCalendar from "@/components/Calendar";
import { Calendar as CalendarIcon, MapPin, Loader2, X, ExternalLink, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Event, getEvents, getEventsByCategory } from "@/lib/events";
import type { CalendarEvent } from '@/components/Calendar';
import type { EventStatus } from '@/types/event';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getEvents();
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
    const categoryIcons: Record<string, string> = {
      'meetup': '👥',
      'workshop': '🎨',
      'conference': '🎤',
      'social': '🎉'
    };
    return categoryIcons[category] || '🎌';
  };

  // Helper function to get category colors
  const getCategoryColors = (category: string): string => {
    const categoryColors: Record<string, string> = {
      'meetup': 'bg-blue-500/10 text-blue-400',
      'workshop': 'bg-purple-500/10 text-purple-400',
      'conference': 'bg-pink-500/10 text-pink-400',
      'social': 'bg-green-500/10 text-green-400'
    };
    return categoryColors[category] || 'bg-gray-500/10 text-gray-400';
  };

  // Calculate category counts
  const categories = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'upcoming', label: 'Upcoming', count: events.filter(e => e.status === 'upcoming').length },
    { id: 'meetup', label: 'Meetups', count: events.filter(e => e.category === 'meetup').length },
    { id: 'workshop', label: 'Workshops', count: events.filter(e => e.category === 'workshop').length },
    { id: 'conference', label: 'Conferences', count: events.filter(e => e.category === 'conference').length },
    { id: 'social', label: 'Socials', count: events.filter(e => e.category === 'social').length }
  ];

  // Filter events based on selected category and search term
  const filteredEvents = useMemo(() => {
    let result = [...events];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(term) ||
          (event.description?.toLowerCase() || '').includes(term) ||
          event.location.toLowerCase().includes(term)
      );
    }
    
    // Sort by date (upcoming first)
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedCategory, searchTerm]);

  // Group events by month for the calendar view
  const eventsByMonth = useMemo(() => {
    const months: Record<string, Event[]> = {};
    
    filteredEvents.forEach(event => {
      const date = new Date(event.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthYear]) {
        months[monthYear] = [];
      }
      
      months[monthYear].push({
        ...event,
        // Ensure all required fields have default values
        id: String(event.id),
        title: event.title || 'Untitled Event',
        date: event.date,
        location: event.location || 'Location not specified',
        description: event.description || '',
        featured: Boolean(event.featured)
      });
    });
    
    return months;
  }, [filteredEvents]);

  // Convert event data to calendar format
  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    return filteredEvents.map(event => {
      const eventDate = new Date(event.date);
      const calendarEvent: CalendarEvent = {
        id: event.id?.toString() || Math.random().toString(36).substr(2, 9),
        title: event.title || 'Untitled Event',
        start: eventDate,
        allDay: !event.time, // If no time is specified, it's an all-day event
        description: event.description,
        location: event.location,
        category: event.category,
        image: event.image,
        link: event.link,
        extendedProps: {
          originalEvent: {
            ...event,
            id: event.id?.toString() || Math.random().toString(36).substr(2, 9),
            title: event.title || 'Untitled Event',
            date: event.date,
            time: event.time || '',
            location: event.location || 'Location not specified',
            description: event.description || '',
            category: event.category || 'other',
            featured: Boolean(event.featured),
            status: event.status || 'upcoming'
          }
        },
        className: `event-category-${event.category || 'other'}`
      };

      // Set end time if specified
      if (event.time) {
        const endDate = new Date(eventDate);
        const [hours, minutes] = event.time.split(':').map(Number);
        endDate.setHours(hours + 2, minutes || 0, 0, 0);
        calendarEvent.end = endDate;
      } else {
        // For all-day events, set end to the next day
        const endDate = new Date(eventDate);
        endDate.setDate(endDate.getDate() + 1);
        calendarEvent.end = endDate;
      }

      return calendarEvent;
    });
  }, [filteredEvents]);

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEventClick = useCallback((calendarEvent: CalendarEvent) => {
    // The Calendar component handles the modal display
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mb-8">
        <ContentPageHeader 
          title={
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Events & Gatherings
            </span>
          }
          showBackButton={true}
          backHref="/"
          backText="Back to Home"
        />
      </div>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-muted-foreground">
          Discover anime, Japanese culture, and otaku events in Lithuania and beyond
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
            <span className="ml-2">Loading events...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Check back later for upcoming events!'}
            </p>
          </div>
        )}

        {/* Calendar View */}
        {!isLoading && !error && viewMode === 'calendar' && filteredEvents.length > 0 && (
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <EventCalendar 
              events={calendarEvents}
              onSelectEvent={handleEventClick}
            />
          </div>
        )}

        {/* List View */}
        {!isLoading && !error && viewMode === 'list' && filteredEvents.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        )}
      </div>
    </div>
  );
};