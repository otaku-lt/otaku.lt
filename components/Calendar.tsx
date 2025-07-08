"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, Download, ExternalLink } from 'lucide-react';
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

export default function EventCalendar({ events, onSelectEvent, onSelectSlot }: EventCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Convert events to FullCalendar format
  const fullCalendarEvents = events.map(event => ({
    id: event.id.toString(),
    title: event.title,
    start: event.start,
    end: event.end,
    extendedProps: {
      location: event.location,
      category: event.category,
      description: event.description,
      originalEvent: event
    },
    className: `fc-event-${event.category}`,
    borderColor: getCategoryColor(event.category || 'default').border,
    backgroundColor: getCategoryColor(event.category || 'default').background,
  }));

  // Get category colors
  function getCategoryColor(category: string) {
    const colors: { [key: string]: { background: string; border: string } } = {
      'concert': { background: '#ec4899', border: '#db2777' },
      'camping': { background: '#22c55e', border: '#16a34a' },
      'convention': { background: '#6366f1', border: '#4f46e5' },
      'screening': { background: '#3b82f6', border: '#2563eb' },
      'workshop': { background: '#9333ea', border: '#7c3aed' },
      'gaming': { background: '#f97316', border: '#ea580c' },
      'competition': { background: '#f59e0b', border: '#d97706' },
      'meetup': { background: '#14b8a6', border: '#0d9488' },
      'special': { background: '#f43f5e', border: '#e11d48' },
      'default': { background: '#ec4899', border: '#db2777' }
    };
    return colors[category] || colors.default;
  }

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

  return (
    <div className="space-y-6">
      {/* Header with export all functionality */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-pink-200 p-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-pink-600" size={24} />
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Event Calendar
            </h2>
            <p className="text-sm text-gray-600">{events.length} events</p>
          </div>
        </div>
        
        <div className="flex gap-2">
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
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-md"
          >
            <Download size={16} />
            Export All (.ics)
          </button>
          
          <button
            onClick={() => {
              const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=otaku.lt`;
              window.open(googleCalendarUrl, '_blank');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
          >
            <ExternalLink size={16} />
            Google Calendar
          </button>
        </div>
      </div>

      {/* FullCalendar */}
      <div className="otaku-fullcalendar bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-pink-200">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listYear'
          }}
          initialView='dayGridMonth'
          height='auto'
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
          eventContent={(eventInfo) => {
            const event = eventInfo.event;
            const isAllDay = event.allDay;
            const title = event.title;
            const isListView = eventInfo.view.type.includes('list');
            
            // Show time in list view always, or in month view only when multiple events on same day
            let showTime = false;
            if (isListView) {
              showTime = !isAllDay;
            } else if (eventInfo.view.type === 'dayGridMonth') {
              // Check if there are multiple events on the same day
              const dayEvents = eventInfo.view.calendar.getEvents().filter(e => {
                const eventDate = e.start?.toDateString();
                const currentDate = event.start?.toDateString();
                return eventDate === currentDate;
              });
              showTime = !isAllDay && dayEvents.length > 1;
            }
            
            return (
              <div className="fc-event-main-frame">
                <div className="fc-event-title-container">
                  <div className="fc-event-title fc-sticky">
                    {showTime && (
                      <span 
                        className="fc-event-time text-xs opacity-75 mr-1"
                        style={isListView ? { 
                          color: 'white', 
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                          opacity: 0.9 
                        } : {}}
                      >
                        {eventInfo.timeText}
                      </span>
                    )}
                    <span 
                      className={`fc-event-title-text ${isListView ? 'list-view-title' : ''}`}
                      style={isListView ? { 
                        color: 'white', 
                        fontWeight: '600',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' 
                      } : {}}
                    >
                      {title}
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
          expandRows={true}
          stickyHeaderDates={true}
          eventMouseEnter={(info) => {
            info.el.style.transform = 'scale(1.02)';
            info.el.style.zIndex = '10';
          }}
          eventMouseLeave={(info) => {
            info.el.style.transform = 'scale(1)';
            info.el.style.zIndex = '1';
          }}
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full border border-pink-200">
            <div className="bg-gradient-to-r from-pink-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              {selectedEvent.location && (
                <p className="text-pink-100 mt-2">📍 {selectedEvent.location}</p>
              )}
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Date & Time</p>
                  <p className="text-gray-900">
                    {selectedEvent.start.toLocaleDateString()} at {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Description</p>
                    <p className="text-gray-900">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.open(generateGoogleCalendarUrl(selectedEvent), '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all"
                >
                  <ExternalLink size={16} />
                  Google Calendar
                </button>
                
                <button
                  onClick={() => downloadICS(selectedEvent)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  <Download size={16} />
                  Download .ics
                </button>
              </div>
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
