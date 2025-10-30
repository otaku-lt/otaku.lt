import { useMemo } from 'react';
import type { CalendarEvent } from '@/types/calendar';
import { getCategoryColor } from '@/utils/categoryColors';

export const useCalendarEvents = (events: CalendarEvent[]) => {
  return useMemo(() => {
    const processed = events
      .map((event: CalendarEvent) => {
        try {
          const category = event.category || 'default';
          const colors = getCategoryColor(category);
          const startDate = event.start 
            ? (event.start instanceof Date ? event.start : new Date(event.start)) 
            : new Date();
          const endDate = event.end 
            ? (event.end instanceof Date ? event.end : new Date(event.end)) 
            : undefined;
          
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
              // Use the originalEvent from extendedProps if it exists, otherwise use the event itself
              originalEvent: event.extendedProps?.originalEvent || event,
              // Include all screenings if this is a screening event
              screenings: event.screenings || []
            }
          };
        } catch (error) {
          console.error('Error processing event:', error, event);
          return null;
        }
      })
      .filter((event): event is NonNullable<typeof event> => event !== null);
    
    return processed;
  }, [events]);
};
