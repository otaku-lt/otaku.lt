"use client";

import React, { useState, useMemo, useEffect } from "react";
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
      // Create a date object from the event date
      const eventDate = new Date(event.date);
      
      // Set time if specified
      if (event.time) {
        const [hours, minutes] = event.time.split(':').map(Number);
        eventDate.setHours(hours, minutes || 0, 0, 0);
      }
      
      // Create a new event object that matches the CalendarEvent type
      const calendarEvent: CalendarEvent = {
        id: event.id?.toString() || Math.random().toString(36).substr(2, 9),
        title: event.title || 'Untitled Event',
        start: eventDate,
        allDay: !event.time, // If no time is specified, it's an all-day event
        description: event.description || '',
        location: event.location || '',
        category: event.category || 'other',
        extendedProps: {
          originalEvent: {
            ...event,
            id: event.id?.toString() || Math.random().toString(36).substr(2, 9),
            title: event.title || 'Untitled Event',
            date: event.date,
            time: event.time || '',
            location: event.location || '',
            description: event.description || '',
            category: event.category || 'other',
            featured: Boolean(event.featured),
            status: event.status || 'upcoming'
          }
        },
        className: `event-category-${event.category || 'other'}`
      };
      
      // Add end time if specified or for all-day events
      const formatTime = (timeString?: string) => {
        if (!timeString) return '';
        
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10) || 0);
        date.setMinutes(parseInt(minutes, 10) || 0);
        
        return date.toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' });
      };

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

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (calendarEvent: CalendarEvent) => {
    // Get the original event data from the calendar event
    const eventData = calendarEvent.extendedProps?.originalEvent;
    if (eventData) {
      // Ensure all required fields have fallback values
      const safeEvent: Event = {
        id: eventData.id || '',
        title: eventData.title || 'Untitled Event',
        date: eventData.date || new Date().toISOString().split('T')[0],
        time: eventData.time || '',
        location: eventData.location || '',
        description: eventData.description || '',
        category: eventData.category || 'other',
        featured: Boolean(eventData.featured),
        status: (eventData.status && ['upcoming', 'past', 'cancelled', 'scheduled', 'postponed', 'completed'].includes(eventData.status))
          ? eventData.status as EventStatus
          : 'upcoming',
        link: eventData.link || '',
        image: eventData.image || ''
      };
      setSelectedEvent(safeEvent);
    }
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

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <div className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-foreground">{selectedEvent.title}</h2>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{selectedEvent.date} • {selectedEvent.time}</span>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedEvent.title)}&dates=${new Date(selectedEvent.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${new Date(selectedEvent.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(selectedEvent.description || '')}&location=${encodeURIComponent(selectedEvent.location || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Add to Google Calendar
                  </a>
                  
                  <button
                    onClick={() => {
                      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${selectedEvent.title}
DESCRIPTION:${selectedEvent.description || ''}
LOCATION:${selectedEvent.location || ''}
DTSTART:${new Date(selectedEvent.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${new Date(selectedEvent.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
END:VEVENT
END:VCALENDAR`;
                      
                      const blob = new Blob([icsContent], { type: 'text/calendar' });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${selectedEvent.title.replace(/\s+/g, '_')}.ics`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Download size={16} />
                    Download .ics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};