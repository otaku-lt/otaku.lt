// Define the possible event status values
export type EventStatus = 'upcoming' | 'past' | 'cancelled' | 'scheduled' | 'postponed' | 'completed';

// Optional sub-entries for multiple screenings of the same movie/event
export interface Screening {
  date?: string; // If omitted, inherit parent event date
  time?: string; // If omitted, inherit parent event time
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  category?: string;
  categories?: string[];
  image?: string;
  tags?: string[];
  organizer?: string;
  venue?: string;
  city?: string;
  price?: number | string;
  // Multiple screenings of the same event (e.g., a movie)
  screenings?: Screening[];
  // Add any other fields that might be used in your events
}

export interface SetlistDay {
  day?: number;
  type: 'Japanese' | 'Lithuanian';
}

export type Setlist = 'Japanese' | 'Lithuanian' | SetlistDay[];
