"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { EventTabs } from "@/components/events/EventTabs";
import { EventCard } from "@/components/events/EventCard";
import EventCalendar from "@/components/Calendar";
import { EventModal } from "@/components/events/EventModal";
import { Calendar as CalendarIcon, Clock, LayoutGrid, MapPin, Loader2, ExternalLink, Download, Tag } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getEvents, getEventsByCategory } from "@/lib/events";
import type { CalendarEvent } from '@/types/calendar';
import type { Event, EventStatus } from '@/types/event'; // Import Event from types
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
  const [currentMonth, setCurrentMonth] = useState<string>('');

  // Initialize month from URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const monthParam = urlParams.get('month');
      if (monthParam) {
        setCurrentMonth(monthParam);
      } else {
        // Default to current month if no URL parameter
        const now = new Date();
        const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        setCurrentMonth(defaultMonth);
      }
    }
  }, []);

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

  // For list view: don't expand screenings, show as single card
  // For calendar view: expand by date
  const expandedEventsForCalendar = useMemo(() => {
    const out: Event[] = [];
    for (const ev of events) {
      if (Array.isArray(ev.screenings) && ev.screenings.length > 0) {
        // Group screenings by date
        const screeningsByDate = new Map<string, typeof ev.screenings>();
        ev.screenings.forEach(scr => {
          const date = scr.date || ev.date;
          if (!screeningsByDate.has(date)) {
            screeningsByDate.set(date, []);
          }
          screeningsByDate.get(date)!.push(scr);
        });
        
        // Create one event per unique date
        let dateIdx = 0;
        screeningsByDate.forEach((dateScreenings, date) => {
          dateIdx++;
          out.push({
            ...ev,
            // Make id unique per date
            id: `${ev.id}-d${dateIdx}`,
            // Use the date for this group
            date: date,
            // Keep all screenings for this date for the modal
            screenings: dateScreenings,
            // Preserve links from parent event
            link: ev.link,
            links: ev.links,
          });
        });
      } else {
        out.push(ev);
      }
    }
    return out;
  }, [events]);

  // Filter events only by search term (for category counts)
  // Use original events for list view, expanded for calendar
  const searchFilteredEvents = useMemo(() => {
    let result = viewMode === 'list' ? [...events] : [...expandedEventsForCalendar];
    
    // Apply only search filter (not category filter)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        (event.category && event.category.toLowerCase().includes(term))
      );
    }
    
    return result.sort((a, b) => {
      // For events with screenings but no date, use the first screening date
      const dateA = a.date || (a.screenings && a.screenings[0]?.date) || '';
      const dateB = b.date || (b.screenings && b.screenings[0]?.date) || '';
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  }, [events, expandedEventsForCalendar, searchTerm, viewMode]);

  // Filter events based on selected category and search term
  const filteredEvents = useMemo(() => {
    let result = viewMode === 'list' ? [...events] : [...expandedEventsForCalendar];
    
    // In list view, only show upcoming events (hide past events)
    if (viewMode === 'list') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      result = result.filter(event => {
        const eventDate = event.endDate ? new Date(event.endDate) : new Date(event.date);
        return eventDate >= today;
      });
    }
    
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
    
    return result.sort((a, b) => {
      // For events with screenings but no date, use the first screening date
      const dateA = a.date || (a.screenings && a.screenings[0]?.date) || '';
      const dateB = b.date || (b.screenings && b.screenings[0]?.date) || '';
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  }, [events, expandedEventsForCalendar, selectedCategory, searchTerm, viewMode]);

  // Calculate category counts based on filtered events
  const categories = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Start with special categories
    const baseCategories = [
      { id: 'all', label: 'All Events', count: searchFilteredEvents.length },
      { 
        id: 'upcoming', 
        label: 'Upcoming', 
        count: searchFilteredEvents.filter(event => new Date(event.date) >= today).length,
        forceListView: true
      }
    ];
    
    // Add event categories with counts
    const eventCategories = EVENT_CATEGORIES.map((category: { id: string; label: string }) => ({
      id: category.id,
      label: category.label,
      // Special handling for categories that might have been renamed or merged
      count: searchFilteredEvents.filter(e => {
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
  }, [searchFilteredEvents]);

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
            link: event.link,
            links: event.links // Include the links array!
          }
        },
        className: `event-category-${event.category || 'other'}`
      };

      // Set end time - check endDate first for multi-day events
      if (event.endDate) {
        // For events with endDate, use that as the end date
        const endDate = new Date(event.endDate);
        // Add one day to make it inclusive (FullCalendar end is exclusive)
        endDate.setDate(endDate.getDate() + 1);
        calendarEvent.end = endDate;
        calendarEvent.allDay = true;
      } else if (event.time && /^\d{1,2}:\d{2}(?::\d{2})?$/.test(event.time)) {
        // Set end time if specified and in valid format (HH:MM or HH:MM:SS)
        const endDate = new Date(eventDate);
        const [hours, minutes] = event.time.split(':').map(Number);
        endDate.setHours(hours + 2, minutes || 0, 0, 0);
        calendarEvent.end = endDate;
        calendarEvent.allDay = false;
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
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  // Generate URL-friendly slug from event title
  const generateEventSlug = useCallback((event: Event): string => {
    const titleWords = event.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .split(/\s+/) // Split by whitespace
      .slice(0, 3) // Take first 3 words
      .join('-'); // Join with hyphens
    
    return `${event.id}-${titleWords}`;
  }, []);

  // Extract event ID from slug (handles both "5" and "5-event-title" formats)
  const extractEventId = useCallback((slug: string): string => {
    return slug.split('-')[0];
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle URL parameters for deep linking to events
  useEffect(() => {
    if (!isClient || !events.length) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const eventParam = urlParams.get('event');
    
    if (eventParam && eventParam !== currentEventId) {
      // Extract event ID from slug (handles both "5" and "5-event-title" formats)
      const eventId = extractEventId(eventParam);
      const event = events.find(e => e.id?.toString() === eventId);
      if (event) {
        setSelectedEvent(event);
        setIsModalOpen(true);
        setCurrentEventId(eventId);
      }
    } else if (!eventParam && currentEventId) {
      setIsModalOpen(false);
      setSelectedEvent(null);
      setCurrentEventId(null);
    }
  }, [isClient, events, currentEventId, extractEventId]);

  // Handle browser back/forward navigation
  useEffect(() => {
    if (!isClient) return;
    
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const eventParam = urlParams.get('event');
      
      if (eventParam && events.length) {
        // Extract event ID from slug (handles both "5" and "5-event-title" formats)
        const eventId = extractEventId(eventParam);
        const event = events.find(e => e.id?.toString() === eventId);
        if (event) {
          setSelectedEvent(event);
          setIsModalOpen(true);
          setCurrentEventId(eventId);
        }
      } else {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setCurrentEventId(null);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isClient, events, extractEventId]);

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
    const eventId = event.id?.toString() || '';
    const eventSlug = generateEventSlug(event);
    
    setSelectedEvent(event);
    setIsModalOpen(true);
    setCurrentEventId(eventId);
    
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('event', eventSlug);
        window.history.pushState({}, '', url.toString());
      } catch (error) {
        console.error('Error updating URL:', error);
      }
    }
  }, [generateEventSlug]);

  const handleCalendarEventClick = useCallback((event: CalendarEvent) => {
    // Get the original event from extendedProps if available
    const original: any = event?.extendedProps?.originalEvent;
    
    if (original && original.id) {
      // Attempt to find by base id (strip screening suffix if any)
      const baseId = String(original.id).split('-s')[0];
      const byId = events.find((e: Event) => String(e.id) === original.id) 
                 || events.find((e: Event) => String(e.id).split('-s')[0] === baseId);
      
      if (byId) {
        // Create a new event object that includes links from all sources
        const eventWithLinks = {
          ...byId,
          // Use the link from the calendar event if available, otherwise use the one from the original event
          link: event.link || original.link || byId.link,
          // Combine links from both sources, removing duplicates by URL
          links: [
            ...(byId.links || []),
            ...(original.links || []),
          ].filter((link, index, self) => 
            index === self.findIndex(l => l.url === link.url)
          )
        };
        
        handleEventClick(eventWithLinks);
        return;
      }
    }

    // Fallback: attempt by exact id, then by title
    const eventId = event.id?.toString() || '';
    const matchedEvent = events.find((e: Event) => e.id?.toString() === eventId)
                      || events.find((e: Event) => e.title === event?.title);
                      
    if (matchedEvent) {
      // Create a new event object that includes links from the calendar event
      const eventWithLinks = {
        ...matchedEvent,
        link: event.link || matchedEvent.link,
        // Preserve any existing links array
        links: matchedEvent.links || []
      };
      
      handleEventClick(eventWithLinks);
    }
  }, [events, handleEventClick]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setCurrentEventId(null);
    
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('event');
        window.history.pushState({}, '', url.toString());
      } catch (error) {
        console.error('Error clearing URL:', error);
      }
    }
  }, []);

  // Handle calendar month navigation
  const handleMonthChange = useCallback((date: Date) => {
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(monthStr);
    
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('month', monthStr);
        window.history.pushState({}, '', url.toString());
      } catch (error) {
        console.error('Error updating month URL:', error);
      }
    }
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

        {/* Event Tabs */}
        <EventTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showViewToggle={false}
          className="mb-6"
        />

        {/* View Toggle and Export Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          {/* Export Button - Hidden on mobile */}
          <button
            onClick={exportAllEventsAsICS}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-card border border-border text-foreground hover:bg-accent/10 transition-colors"
            title="Export all events as ICS"
          >
            <Download size={16} />
            <span>Export Calendar</span>
          </button>

          {/* View Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                viewMode === 'calendar' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CalendarIcon size={16} />
              Calendar
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'
              }`}
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
              onSelectEvent={handleCalendarEventClick}
              initialDate={currentMonth}
              onMonthChange={handleMonthChange}
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
                screenings={event.screenings}
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
        onClose={handleCloseModal} 
      />
    </div>
  );
}