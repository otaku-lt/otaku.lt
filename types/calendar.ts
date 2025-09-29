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
  link?: string;
  image?: string;
  className?: string;
  extendedProps?: {
    originalEvent?: CalendarEvent;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface EventCalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: any) => void;
  initialDate?: string; // YYYY-MM format
  onMonthChange?: (date: Date) => void;
}

export interface CategoryColors {
  bg: string;
  text: string;
  border: string;
}
