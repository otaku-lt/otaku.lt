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
  setlist?: {
    days?: Array<{
      day?: number;
      type: string;
    }>;
  };
};

// In-memory cache for events
let eventsCache: Event[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = process.env.NODE_ENV === 'development' ? 0 : 5 * 60 * 1000; // No cache in development, 5 minutes in production

// Function to fetch events from the API (client-side only)
async function fetchEventsFromApi(): Promise<Event[]> {
  try {
    // Add a timestamp to bypass cache in development
    const timestamp = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : '';
    const response = await fetch(`/api/events${timestamp}`, {
      cache: 'no-store' // Don't use browser cache
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.success || !Array.isArray(data.events)) {
      throw new Error('Invalid events data format');
    }
    
    return data.events;
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

  const now = Date.now();
  
  // Return cached events if they're still fresh
  if (eventsCache && (now - lastFetchTime) < CACHE_DURATION) {
    return eventsCache;
  }
  
  try {
    eventsCache = await fetchEventsFromApi();
    lastFetchTime = now;
  } catch (error) {
    console.error('Error getting events:', error);
    eventsCache = [];
  }

  return eventsCache || [];
}

// Get the next featured event
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
