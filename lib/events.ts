// Client-side events management

export * from '@/types/event';

import type { Event } from '@/types/event';

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
export async function getEvents(): Promise<Event[]> {
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

// Get events by category
export async function getEventsByCategory(category: string): Promise<Event[]> {
  try {
    const events = await getEvents();
    return events.filter(event => 
      event.category === category && 
      (!event.status || event.status !== 'cancelled')
    );
  } catch (error) {
    console.error(`Error getting events for category ${category}:`, error);
    return [];
  }
}

// Get events by month
export async function getEventsByMonth(year: number, month: number): Promise<Event[]> {
  try {
    const events = await getEvents();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month - 1 && // months are 0-indexed in JS
        (!event.status || event.status !== 'cancelled')
      );
    });
  } catch (error) {
    console.error(`Error getting events for ${year}-${month}:`, error);
    return [];
  }
}

// Get featured events
export async function getFeaturedEvents(limit: number = 3): Promise<Event[]> {
  try {
    const events = await getEvents();
    const now = new Date();
    
    return events
      .filter(event => 
        event.featured && 
        new Date(event.date) >= now &&
        (!event.status || event.status !== 'cancelled')
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting featured events:', error);
    return [];
  }
}

// Get a single event by ID
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const events = await getEvents();
    return events.find(event => event.id === id) || null;
  } catch (error) {
    console.error(`Error getting event with ID ${id}:`, error);
    return null;
  }
}
