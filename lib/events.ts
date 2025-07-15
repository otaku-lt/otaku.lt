// Client-side events management for the korniha-band page

// Define the Event type
export type Event = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  setlist?: any; // Can be a string or a more complex object
};

// In-memory cache for events
let eventsCache: Event[] | null = null;

// Function to fetch events from the API (client-side only)
export async function fetchEventsFromApi(): Promise<Event[]> {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching events from API:', error);
    return [];
  }
}

// Get all events (client-side only)
export async function getKornihaEvents(): Promise<Event[]> {
  // If we're not in a browser, return empty array
  if (typeof window === 'undefined') {
    return [];
  }

  // If we already have cached events, return them
  if (eventsCache) {
    return eventsCache;
  }
  
  try {
    eventsCache = await fetchEventsFromApi();
  } catch (error) {
    console.error('Error getting events:', error);
    eventsCache = [];
  }

  return eventsCache || [];
}

export async function getFeaturedEvent(): Promise<Event | null> {
  try {
    const events = await getKornihaEvents();
    if (!events || !Array.isArray(events)) {
      console.error('No events found or invalid format');
      return null;
    }

    const now = new Date();
    
    // Find the first upcoming featured event
    const upcomingEvents = events
      .filter(event => event && event.date && new Date(event.date) >= now)
      .filter(event => event.featured === true)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
    return upcomingEvents[0] || null;
  } catch (error) {
    console.error('Error getting featured event:', error);
    return null;
  }
}
