// Define the possible event status values
export type EventStatus = 'upcoming' | 'past' | 'cancelled' | 'scheduled' | 'postponed' | 'completed';

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  status?: EventStatus;
  link?: string;
  category?: string;
  image?: string;
  // Add any other fields that might be used in your events
}

export interface SetlistDay {
  day?: number;
  type: 'Japanese' | 'Lithuanian';
}

export type Setlist = 'Japanese' | 'Lithuanian' | SetlistDay[];
