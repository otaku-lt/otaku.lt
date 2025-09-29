import { format } from 'date-fns';
import type { CalendarEvent } from '@/types/calendar';

// Helper to escape ICS content
export const escapeICS = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
};

// Format date for ICS
export const formatICSDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) {
    console.error('Invalid date in ICS generation:', date);
    return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
};

// Generate ICS content for a single event
export const generateICSContent = (event: CalendarEvent): string => {
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

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//otaku.lt//NONSGML Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@otaku.lt`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    event.description ? `DESCRIPTION:${escapeICS(event.description)}` : '',
    event.location ? `LOCATION:${escapeICS(event.location)}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');
};

// Generate Google Calendar URL
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
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
};

// Download event as ICS file
export const downloadEventICS = (event: CalendarEvent): void => {
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
};

// Download all events as ICS file
export const downloadAllEventsICS = (events: CalendarEvent[]): void => {
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
};

// Format date for display
export const formatEventDate = (date: Date | string | undefined, formatStr: string): string => {
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
};

// Format date range for display
export const formatDateRange = (start: Date | string | undefined, end?: Date | string | undefined): string => {
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
};
