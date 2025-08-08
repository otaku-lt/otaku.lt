"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { EventTabs } from "@/components/events/EventTabs";
import { EventCard } from "@/components/events/EventCard";
import EventCalendar from "@/components/Calendar";
import { EventModal } from "@/components/events/EventModal";
import { Calendar as CalendarIcon, Clock, LayoutGrid, MapPin, Loader2, ExternalLink, Download, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Event, getEvents, getEventsByCategory } from "@/lib/events";
import type { CalendarEvent } from '@/components/Calendar';
import type { EventStatus } from '@/types/event';
import { EVENT_CATEGORIES } from '@/config/event-categories';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const categoryConfig = EVENT_CATEGORIES.find(cat => cat.id === category);
    return categoryConfig?.icon || '🎌';
  };

  // Helper function to get category colors
  const getCategoryColors = (category: string): string => {
    const categoryConfig = EVENT_CATEGORIES.find(cat => cat.id === category);
    return categoryConfig?.color || 'bg-gray-500/10 text-gray-400';
  };

  // Filter events based on selected category and search term
  const filteredEvents = useMemo(() => {
    let result = [...events];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'upcoming') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        result = result.filter(event => new Date(event.date) >= today);
      } else {
        // Special handling for categories that might have been renamed or merged
        result = result.filter(event => {
          // Get all categories for this event (primary + additional)
          const eventCategories = event.categories ? [...event.categories] : [event.category];
          
          if (selectedCategory === 'music') {
            // Handle music category (formerly concert)
            return eventCategories.includes('concert') || eventCategories.includes('music');
          }
          if (selectedCategory === 'screening') {
            // Handle screening category
            return eventCategories.includes('screening');
          }
          // Default case - check if any of the event's categories match
          return eventCategories.includes(selectedCategory);
        });
      }
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        (event.category && event.category.toLowerCase().includes(term))
      );
    }
    
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedCategory, searchTerm]);

  // Calculate category counts based on filtered events
  const categories = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Start with special categories
    const baseCategories = [
      { id: 'all', label: 'All Events', count: filteredEvents.length },
      { 
        id: 'upcoming', 
        label: 'Upcoming', 
        count: filteredEvents.filter(event => new Date(event.date) >= today).length,
        forceListView: true
      }
    ];
    
    // Add event categories with counts
    const eventCategories = EVENT_CATEGORIES.map((category: { id: string; label: string }) => ({
      id: category.id,
      label: category.label,
      // Special handling for categories that might have been renamed or merged
      count: filteredEvents.filter(e => {
        // Get all categories for this event (primary + additional)
        const eventCategories = e.categories ? [...e.categories] : [e.category];
        
        if (category.id === 'music') {
          // Handle music category (formerly concert)
          return eventCategories.includes('concert') || eventCategories.includes('music');
        }
        if (category.id === 'screening') {
          // Handle screening category
          return eventCategories.includes('screening');
        }
        // Default case - check if any of the event's categories match
        return eventCategories.includes(category.id);
      }).length
    }));
    
    return [...baseCategories, ...eventCategories];
  }, [filteredEvents]);

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

      // Set end time if specified and not 'All day'
      if (event.time && event.time !== 'All day') {
        const endDate = new Date(eventDate);
        const [hours, minutes] = event.time.split(':').map(Number);
        endDate.setHours(hours + 2, minutes || 0, 0, 0);
        calendarEvent.end = endDate;
        calendarEvent.allDay = false;
      } else if (event.endDate) {
        // For events with endDate, use that as the end date
        const endDate = new Date(event.endDate);
        // Add one day to make it inclusive
        endDate.setDate(endDate.getDate() + 1);
        calendarEvent.end = endDate;
        calendarEvent.allDay = true;
      } else {
        // For all-day events, set end to the next day
        const endDate = new Date(eventDate);
        endDate.setDate(endDate.getDate() + 1);
        calendarEvent.end = endDate;
        calendarEvent.allDay = true;
      }

      return calendarEvent;
    });
  }, [filteredEvents]);

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    // Always switch to list view when filtering by categories
    setViewMode('list');
  }, []);

  const handleSearchChange = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    // Switch to list view when user starts typing in search
    if (searchTerm.trim().length > 0) {
      setViewMode('list');
    }
  }, []);

  const handleEventClick = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  // Function to export all events as ICS
  const exportAllEventsAsICS = useCallback(() => {
    if (calendarEvents.length === 0) return;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Otaku.lt//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Otaku.lt Events',
      'X-WR-TIMEZONE:Europe/Vilnius',
      ...calendarEvents.map(event => {
        const start = event.start ? new Date(event.start) : new Date();
        const end = event.end ? new Date(event.end) : new Date(start.getTime() + 60 * 60 * 1000);
        
        // Format dates for ICS (YYYYMMDDTHHMMSSZ)
        const formatDate = (date: Date): string => {
          return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        };
        
        return [
          'BEGIN:VEVENT',
          `UID:${event.id}@otaku.lt`,
          `DTSTART:${formatDate(start)}`,
          `DTEND:${formatDate(end)}`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description || ''}`,
          `LOCATION:${event.location || ''}`,
          'END:VEVENT'
        ].join('\n');
      }).flat(),
      'END:VCALENDAR'
    ].join('\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'otaku-events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [calendarEvents]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mb-8">
        <ContentPageHeader 
          title={
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Otaku Event Calendar
            </span>
          }
          showBackButton={true}
          backHref="/"
          backText="Back to Home"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-2">
          Discover anime, Japanese culture, and otaku events in Lithuania and beyond
        </p>

        {/* Event Tabs - Modified to remove view toggle */}
        <EventTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showViewToggle={false}
          showSubmitButton={true}
          className="mb-8"
        />

        {/* View Toggle - Matching Submit Form Style */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${viewMode === 'calendar' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <CalendarIcon size={16} />
              Calendar View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid size={16} />
              List View
            </button>
          </div>
        </div>

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
              onSelectEvent={(event) => {
                const matchedEvent = events.find(e => e.id === event.id);
                if (matchedEvent) {
                  handleEventClick(matchedEvent);
                }
              }}
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
                categories={event.categories}
                description={event.description}
                featured={event.featured}
                getCategoryEmoji={getCategoryEmoji}
                getCategoryColors={getCategoryColors}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Event Detail Modal - Matching Calendar Modal Styling */}
      <EventModal 
        event={selectedEvent} 
        isOpen={isModalOpen && selectedEvent !== null} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}