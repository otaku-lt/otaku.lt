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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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
    const calendarEvent = clickInfo.event.extendedProps.originalEvent as Event;
    
    if (onSelectEvent) {
      clickInfo.jsEvent.preventDefault();
      onSelectEvent(clickInfo.event as any);
    } else {
      // Get the clicked date in YYYY-MM-DD format
      const clickedDate = clickInfo.event.start;
      const clickedDateStr = clickedDate ? clickedDate.toISOString().split('T')[0] : null;
      
      // Format the event date to YYYY-MM-DD string
      let selectedDate = clickedDateStr;
      if (calendarEvent.date) {
        const dateValue = calendarEvent.date as any;
        // Check if it's a Date object or string
        if (dateValue instanceof Date) {
          selectedDate = dateValue.toISOString().split('T')[0];
        } else if (typeof dateValue === 'string') {
          // If it's already a string, extract just the date part
          selectedDate = dateValue.split('T')[0];
        }
      }
      
      // The event already has the correct date from expandedEventsForCalendar
      // We just need to pass it as selectedScreeningDate to the modal
      const eventWithScreeningDate = {
        ...calendarEvent,
        // Use the formatted date as the selectedScreeningDate
        selectedScreeningDate: selectedDate
      };
      
      // Set the selected event with the clicked date as the selectedScreeningDate
      setSelectedEvent(eventWithScreeningDate);
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

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedScreeningDate={selectedEvent.selectedScreeningDate}
        />
      )}
    </div>
  );
}
