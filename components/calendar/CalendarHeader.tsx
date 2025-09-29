import React from 'react';
import { Calendar as CalendarIcon, Download, ExternalLink } from 'lucide-react';
import { downloadAllEventsICS } from '@/utils/calendarUtils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarHeaderProps {
  events: CalendarEvent[];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ events }) => {
  const handleExportAll = () => {
    downloadAllEventsICS(events);
  };

  const handleOpenGoogleCalendar = () => {
    const googleCalendarUrl = 'https://calendar.google.com/calendar/render?cid=otaku.lt';
    window.open(googleCalendarUrl, '_blank');
  };

  return (
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
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          <Download size={16} />
          Export All (.ics)
        </button>
        
        <button
          onClick={handleOpenGoogleCalendar}
          className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all shadow-md border border-border"
        >
          <ExternalLink size={16} />
          Google Calendar
        </button>
      </div>
    </div>
  );
};
