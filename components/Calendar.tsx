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
import './Calendar.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay?: boolean;
  description?: string;
  location?: string;
  category?: string;
  url?: string;
  extendedProps?: {
    originalEvent?: CalendarEvent;
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
  const calendarRef = useRef<FullCalendar>(null);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = useCallback((event: CalendarEvent): string => {
    const start = event.start instanceof Date ? event.start : new Date(event.start);
    const end = event.end ? (event.end instanceof Date ? event.end : new Date(event.end)) : new Date(start.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
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
    const start = event.start instanceof Date ? event.start : new Date(event.start);
    const end = event.end ? (event.end instanceof Date ? event.end : new Date(event.end)) : new Date(start.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
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
    const dateObj = date instanceof Date ? date : new Date(date);
    return format(dateObj, formatStr);
  }, []);

  // Format date range for display
  const formatDateRange = useCallback((start: Date | string, end?: Date | string): string => {
    if (!start) return '';
    const startDate = start instanceof Date ? start : new Date(start);
    
    if (!end) {
      return format(startDate, 'MMMM d, yyyy h:mm a');
    }
    
    const endDate = end instanceof Date ? end : new Date(end);
    
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      return `${format(startDate, 'MMMM d, yyyy h:mm a')} - ${format(endDate, 'h:mm a')}`;
    }
    
    return `${format(startDate, 'MMMM d, yyyy h:mm a')} - ${format(endDate, 'MMMM d, yyyy h:mm a')}`;
  }, []);

  // Handle event click
  const handleEventClick = useCallback((info: EventClickArg) => {
    info.jsEvent.preventDefault();
    const event = info.event.extendedProps.originalEvent as CalendarEvent;
    if (event) {
      setSelectedEvent(event);
      if (onSelectEvent) {
        onSelectEvent(event);
      }
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

  // Convert events to FullCalendar format
  const fullCalendarEvents = events.map((event: CalendarEvent) => {
    const category = event.category || 'default';
    const colors = getCategoryColor(category);
    
    // Format date and time
    const startDate = event.start instanceof Date ? event.start : new Date(event.start);
    const endDate = event.end ? (event.end instanceof Date ? event.end : new Date(event.end)) : undefined;
    
    return {
      id: event.id.toString(),
      title: event.title,
      start: startDate,
      end: endDate,
      allDay: event.allDay || false,
      backgroundColor: colors.bg,
      borderColor: colors.border,
      textColor: colors.text,
      className: `fc-event-${category} cursor-pointer hover:opacity-90 transition-opacity`,
      extendedProps: {
        location: event.location,
        category: category,
        description: event.description,
        originalEvent: event
      }
    };
  });
  
  // Add event content to show title and time
  const eventContent = (arg: any) => {
    return (
      <div className="p-1">
        <div className="font-medium text-sm truncate">{arg.timeText}</div>
        <div className="font-bold text-sm truncate">{arg.event.title}</div>
      </div>
    );
  };

  // Handle date select
  const handleDateSelect = useCallback((selectInfo: any): void => {
    if (onSelectSlot) {
      onSelectSlot(selectInfo);
    }
  }, [onSelectSlot]);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/40 p-6 mb-6">
        <div className="flex items-center gap-3">
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
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
            hour12: true
          }}
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
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full border border-border/40 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              {selectedEvent.location && (
                <p className="opacity-90 mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </p>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">When</p>
                    <p className="text-foreground">
                      {format(selectedEvent.start, 'MMMM d, yyyy h:mm a')}
                      {selectedEvent.end && ` - ${format(selectedEvent.end, 'h:mm a')}`}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="text-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.category && (
                  <div className="flex items-start">
                    <Tag className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="text-foreground">{selectedEvent.category}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="pt-4 mt-2 border-t border-border/40">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                    <p className="text-foreground whitespace-pre-line">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                <button
                  onClick={() => handleDownloadICS(selectedEvent)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <Download size={16} />
                  Download .ics
                </button>
                <a
                  href={generateGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={16} />
                  Google Calendar
                </a>
              </div>
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
