"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { CalendarApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { format, parseISO } from 'date-fns';
import { Tag, MapPin, Calendar as CalendarIcon, Download, ExternalLink, X, Clock, CalendarPlus } from 'lucide-react';
import { EventModal } from '@/components/events/EventModal';
import './Calendar.css';

// Extended event interface for the original event data
export interface OriginalEvent extends Omit<CalendarEvent, 'extendedProps'> {
  id: string;
  title: string;
  date: string;
  time?: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  status?: import('@/types/event').EventStatus;
  link?: string;
  category?: string;
  image?: string;
  tags?: string[];
  organizer?: string;
  venue?: string;
  city?: string;
  price?: number | string;
  [key: string]: any; // Allow additional properties
}

export interface CalendarEvent {
  id: string;
  title: string;
  start?: Date | string;
  end?: Date | string;
  allDay?: boolean;
  description?: string;
  location?: string;
  category?: string;
  url?: string;
  link?: string; // External link to event page
  image?: string; // Path to event poster/cover image
  className?: string;
  extendedProps?: {
    originalEvent?: OriginalEvent;
  };
}

interface EventCalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: any) => void;
}

const getCategoryColor = (category: string): { bg: string; text: string; border: string } => {
  const colors = {
    default: {
      bg: 'bg-gray-100/10',
      text: 'text-gray-100',
      border: 'border-gray-500/30',
    },
    meetup: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    workshop: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    conference: {
      bg: 'bg-pink-500/10',
      text: 'text-pink-400',
      border: 'border-pink-500/30',
    },
    social: {
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
  };

  return colors[category as keyof typeof colors] || colors.default;
};

export default function Calendar({ events = [], onSelectEvent, onSelectSlot }: EventCalendarProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = useCallback((event: CalendarEvent): string => {
    const start = event.start 
      ? (event.start instanceof Date ? event.start : new Date(event.start))
      : new Date();
    
    const end = event.end 
      ? (event.end instanceof Date ? event.end : new Date(event.end))
      : new Date(start.getTime() + 60 * 60 * 1000);
      
    // Ensure dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Invalid date in event', event);
      return '';
    }

    const formatDate = (date: Date | string): string => {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) {
        console.error('Invalid date:', date);
        return '';
      }
      return d.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description || '',
      location: event.location || '',
      dates: `${formatDate(start)}/${formatDate(end)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  // Helper to escape ICS content
  const escapeICS = useCallback((text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,');
  }, []);

  // Generate ICS content for a single event
  const generateICSContent = useCallback((event: CalendarEvent): string => {
    const start = event.start 
      ? (event.start instanceof Date ? event.start : new Date(event.start))
      : new Date();
      
    const end = event.end 
      ? (event.end instanceof Date ? event.end : new Date(event.end))
      : new Date(start.getTime() + 60 * 60 * 1000);
      
    // Ensure dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Invalid date in event', event);
      return '';
    }

    const formatDate = (date: Date | string): string => {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) {
        console.error('Invalid date in ICS generation:', date);
        return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      }
      return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//otaku.lt//NONSGML Events//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@otaku.lt`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${escapeICS(event.title)}`,
      event.description ? `DESCRIPTION:${escapeICS(event.description)}` : '',
      event.location ? `LOCATION:${escapeICS(event.location)}` : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean).join('\r\n');
  }, [escapeICS]);

  // Download event as ICS file
  const downloadEventICS = useCallback((event: CalendarEvent): void => {
    const icsContent = generateICSContent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateICSContent]);

  // Format date for display
  const formatEventDate = useCallback((date: Date | string | undefined, formatStr: string): string => {
    if (!date) return '';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.error('Invalid date:', date);
        return '';
      }
      return format(dateObj, formatStr);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }, []);

  // Format date range for display
  const formatDateRange = useCallback((start: Date | string | undefined, end?: Date | string | undefined): string => {
    if (!start) return '';
    
    const startDate = start instanceof Date ? start : new Date(start);
    if (isNaN(startDate.getTime())) {
      console.error('Invalid start date:', start);
      return '';
    }
    
    if (!end) {
      return format(startDate, 'MMMM d, yyyy h:mm a');
    }
    
    const endDate = end instanceof Date ? end : new Date(end);
    if (isNaN(endDate.getTime())) {
      console.error('Invalid end date:', end);
      return format(startDate, 'MMMM d, yyyy h:mm a');
    }
    
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      return `${format(startDate, 'MMMM d, yyyy h:mm a')} - ${format(endDate, 'h:mm a')}`;
    }
    
    return `${format(startDate, 'MMMM d, yyyy h:mm a')} - ${format(endDate, 'MMMM d, yyyy h:mm a')}`;
  }, []);

  // Handle event click
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    console.log('Calendar handleEventClick called');
    console.log('clickInfo.event:', clickInfo.event);
    console.log('extendedProps:', clickInfo.event.extendedProps);
    
    const calendarEvent = clickInfo.event.extendedProps.originalEvent;
    console.log('calendarEvent (originalEvent):', calendarEvent);
    
    if (calendarEvent) {
      // Call the parent's onSelectEvent callback if provided
      if (onSelectEvent) {
        // Pass the original event data from extendedProps
        const originalEvent = clickInfo.event.extendedProps.originalEvent;
        console.log('Calling onSelectEvent with originalEvent:', originalEvent);
        onSelectEvent(originalEvent);
      } else {
        console.log('No onSelectEvent callback, using internal modal');
        // Fallback to internal modal if no callback provided
        setSelectedEvent(calendarEvent);
        setIsModalOpen(true);
      }
    } else {
      console.error('No calendarEvent found in extendedProps.originalEvent');
    }
  }, [onSelectEvent]);

  // Handle download ICS for an event
  const handleDownloadICS = useCallback((event: CalendarEvent) => {
    const icsContent = generateICSContent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  // Open Google Calendar with event details
  const handleGoogleCalendar = useCallback((event: CalendarEvent) => {
    const url = generateGoogleCalendarUrl(event);
    window.open(url, '_blank');
  }, []);

  // Close the event details modal
  const handleModalClose = useCallback((): void => {
    setSelectedEvent(null);
  }, []);

  // Event content renderer - shows just the title
  const eventContent = useCallback((arg: any) => {
    return (
      <div className="p-1 w-full h-full">
        <div className="font-bold text-xs leading-tight break-words whitespace-normal">
          {arg.event.title}
        </div>
      </div>
    );
  }, []);

  // Handle date select
  const handleDateSelect = useCallback((selectInfo: any): void => {
    if (onSelectSlot) {
      onSelectSlot(selectInfo);
    }
  }, [onSelectSlot]);

  // Convert events to FullCalendar format and filter out invalid ones
  const fullCalendarEvents = events
    .map((event: CalendarEvent) => {
      try {
        const category = event.category || 'default';
        const colors = getCategoryColor(category);
        
        // Format date and time with proper null checks
        const startDate = event.start 
          ? (event.start instanceof Date ? event.start : new Date(event.start))
          : new Date();
          
        const endDate = event.end 
          ? (event.end instanceof Date ? event.end : new Date(event.end))
          : undefined;
        
        // Skip invalid events
        if (isNaN(startDate.getTime()) || (endDate && isNaN(endDate.getTime()))) {
          console.error('Invalid date in event', event);
          return null;
        }
        
        return {
          id: event.id?.toString() || Math.random().toString(36).substr(2, 9),
          title: event.title || 'Untitled Event',
          start: startDate,
          end: endDate,
          allDay: event.allDay || false,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          textColor: colors.text,
          className: `fc-event-${category} cursor-pointer hover:opacity-90 transition-opacity`,
          extendedProps: {
            location: event.location || '',
            category: category,
            description: event.description || '',
            originalEvent: event
          }
        };
      } catch (error) {
        console.error('Error processing event:', error, event);
        return null;
      }
    })
    .filter((event): event is NonNullable<typeof event> => event !== null);
  
  // Add event content to show title and time
  // Event content renderer - shows just the title (duplicate removed)
  // Handle date select (duplicate removed)

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header with export all functionality */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/40 p-6 mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="text-primary" size={24} />
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Event Calendar
            </h2>
            <p className="text-sm text-muted-foreground">{events.length} events</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              // Generate ICS for all events
              const allEventsICS = events.map(event => generateICSContent(event)).join('\n');
              const blob = new Blob([allEventsICS], { type: 'text/calendar' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'otaku_events_calendar.ics';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            <Download size={16} />
            Export All (.ics)
          </button>
          
          <button
            onClick={() => {
              const googleCalendarUrl = 'https://calendar.google.com/calendar/render?cid=otaku.lt';
              window.open(googleCalendarUrl, '_blank');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all shadow-md border border-border"
          >
            <ExternalLink size={16} />
            Google Calendar
          </button>
        </div>
      </div>

      {/* FullCalendar */}
      <div className="otaku-fullcalendar bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-border/40 p-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
          }}
          events={fullCalendarEvents}
          eventClick={handleEventClick}
          eventContent={eventContent}
          selectable={!!onSelectSlot}
          select={handleDateSelect}
          height="auto"
          eventBorderColor="transparent"
          eventTextColor="inherit"
          eventBackgroundColor="transparent"
          eventDisplay="block"
          displayEventTime={false}
          dayMaxEvents={3}
          views={{
            dayGridMonth: {
              dayMaxEventRows: 3,
            },
            listMonth: {
              listDayFormat: { weekday: 'long', month: 'long', day: 'numeric', omitCommas: true },
              listDaySideFormat: false,
            }
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            list: 'List'
          }}
        />
      </div>

      {/* Event Details Modal */}
      <EventModal 
        event={selectedEvent?.extendedProps?.originalEvent || null} 
        isOpen={isModalOpen && selectedEvent?.extendedProps?.originalEvent !== undefined} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
