// Define the possible event status values
export type EventStatus = 'upcoming' | 'past' | 'cancelled' | 'scheduled' | 'postponed' | 'completed';

// Optional sub-entries for multiple screenings of the same movie/event
export interface Screening {
  date?: string; // If omitted, inherit parent event date
  time?: string; // If omitted, inherit parent event time
  cinema?: string; // Cinema or venue name for this specific screening
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
  link?: string; // Single link (legacy support)
  links?: Array<{ name: string; url: string }>; // Multiple links with names (e.g., different cinema booking links)
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
  // Setlist information for band performances
  setlist?: EventSetlist | string;
  // Used to highlight a specific screening date in the modal
  selectedScreeningDate?: string | null;
  // Add any other fields that might be used in your events
}

export interface SetlistDay {
  day?: number;
  date?: string;
  time?: string;
  type: 'Japanese' | 'Lithuanian';
  songs?: string[];
}

export interface EventSetlist {
  days?: SetlistDay[];
  type?: string;
}

export type Setlist = 'Japanese' | 'Lithuanian' | SetlistDay[];
