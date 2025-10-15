"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventModal } from '@/components/events/EventModal';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { EventContent } from '@/components/calendar/EventContent';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import type { CalendarEvent, EventCalendarProps } from '@/types/calendar';
import type { Event } from '@/types/event';
import './Calendar.css';

export default function Calendar({ events = [], onSelectEvent, onSelectSlot, initialDate, onMonthChange }: EventCalendarProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  // Process events using custom hook
  const fullCalendarEvents = useCalendarEvents(events);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle event click
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    const calendarEvent = clickInfo.event.extendedProps.originalEvent as CalendarEvent;
    
    if (onSelectEvent && calendarEvent) {
      clickInfo.jsEvent.preventDefault();
      onSelectEvent(calendarEvent);
    } else if (!onSelectEvent) {
      setSelectedEvent(calendarEvent);
      setIsModalOpen(true);
    }
  }, [onSelectEvent]);

  // Handle date select
  const handleDateSelect = useCallback((selectInfo: any): void => {
    if (onSelectSlot) {
      onSelectSlot(selectInfo);
    }
  }, [onSelectSlot]);

  // Handle calendar navigation (month change)
  const handleDatesSet = useCallback((dateInfo: any) => {
    if (onMonthChange) {
      const currentDate = dateInfo.view.currentStart;
      onMonthChange(currentDate);
    }
  }, [onMonthChange]);

  // Event content renderer
  const eventContent = useCallback((arg: any) => {
    return <EventContent title={arg.event.title} />;
  }, []);
  

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <CalendarHeader events={events} />

      <div className="otaku-fullcalendar bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/40 p-4">
        <FullCalendar
          ref={calendarRef}
          key={`calendar-${fullCalendarEvents.length}`}
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={initialDate ? `${initialDate}-01` : undefined}
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
          datesSet={handleDatesSet}
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

      {!onSelectEvent && (
        <EventModal 
          event={(selectedEvent?.extendedProps?.originalEvent as Event) || null} 
          isOpen={isModalOpen && selectedEvent?.extendedProps?.originalEvent !== undefined} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
