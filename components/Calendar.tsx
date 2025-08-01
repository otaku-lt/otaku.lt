"use client";

import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { CalendarApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import { Tag, MapPin, Calendar as CalendarIcon, Download, ExternalLink, X } from 'lucide-react';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  category?: string;
  description?: string;
  resource?: any;
}

interface EventCalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: any) => void;
}

// Generate Google Calendar URL for single event
const generateGoogleCalendarUrl = (event: CalendarEvent) => {
  const startDate = event.start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endDate = event.end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description || '',
    location: event.location || '',
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Generate ICS file content for single event
const generateICSContent = (event: CalendarEvent) => {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Otaku.lt//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@otaku.lt
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
END:VEVENT
END:VCALENDAR`;
};

// Download ICS file
const downloadICS = (event: CalendarEvent) => {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Get category colors
const getCategoryColor = (category: string) => {
  const colors: Record<string, { background: string; border: string }> = {
    concert: { background: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.5)' },
    camping: { background: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.5)' },
    convention: { background: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.5)' },
    screening: { background: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.5)' },
    workshop: { background: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.5)' },
    gaming: { background: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.5)' },
    competition: { background: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.5)' },
    meetup: { background: 'rgba(20, 184, 166, 0.1)', border: 'rgba(20, 184, 166, 0.5)' },
    special: { background: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 0.5)' },
    default: { background: 'rgba(156, 163, 175, 0.1)', border: 'rgba(156, 163, 175, 0.5)' },
  };
  return colors[category] || colors.default;
};

export default function EventCalendar({ events, onSelectEvent, onSelectSlot }: EventCalendarProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert events to FullCalendar format
  const fullCalendarEvents = events.map(event => {
    const category = event.category || 'default';
    const colors = getCategoryColor(category);
    
    return {
      id: event.id.toString(),
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: {
        location: event.location,
        category: category,
        description: event.description,
        originalEvent: event
      },
      className: `fc-event-${category}`,
      borderColor: colors.border,
      backgroundColor: colors.background,
    };
  });



  const handleEventClick = (info: any) => {
    const event = info.event.extendedProps.originalEvent;
    setSelectedEvent(event);
    if (onSelectEvent) {
      onSelectEvent(event);
    }
  };

  const handleDateSelect = (selectInfo: any) => {
    if (onSelectSlot) {
      onSelectSlot(selectInfo);
    }
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/40 p-6">
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
              const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=otaku.lt`;
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
            right: 'dayGridMonth,listWeek'
          }}
          height="auto"
          events={fullCalendarEvents}
          eventClick={handleEventClick}
          select={handleDateSelect}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          eventDisplay='block'
          displayEventTime={false}
          dayMaxEventRows={3}
          moreLinkClick='popover'
          // Styling for dark theme
          themeSystem='standard'
          eventClassNames="bg-card border-l-4 border-primary hover:bg-accent/50 transition-colors"
          dayHeaderClassNames="text-foreground/80 font-medium"
          dayCellClassNames="hover:bg-accent/20"
          buttonText={{
            today: 'Today',
            month: 'Month',
            list: 'List'
          }}

          eventContent={(eventInfo) => {
            const event = eventInfo.event;
            const timeText = eventInfo.timeText;
            
            return (
              <div className="fc-event-main-frame">
                {timeText && (
                  <div className="fc-event-time text-xs opacity-80 mr-1">
                    {timeText}
                  </div>
                )}
                <div className="fc-event-title-container">
                  <div className="fc-event-title text-sm font-medium">
                    {event.title}
                  </div>
                </div>
              </div>
            );
          }}
          expandRows={true}
          stickyHeaderDates={true}
          eventMouseEnter={(info: any) => {
            info.el.style.transform = 'scale(1.02)';
            info.el.style.zIndex = '10';
          }}
          eventMouseLeave={(info: any) => {
            info.el.style.transform = 'scale(1)';
            info.el.style.zIndex = '1';
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
                  onClick={() => downloadICS(selectedEvent)}
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
