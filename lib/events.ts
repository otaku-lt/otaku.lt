// Client-side events management

export * from '@/types/event';

import type { Event } from '@/types/event';

// In-memory cache for events
let eventsCache: Event[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = process.env.NODE_ENV === 'development' ? 0 : 5 * 60 * 1000; // No cache in development, 5 minutes in production

// Import event data directly for static export
let staticEventsData: Event[] | null = null;

// Function to load events data for static export
async function loadStaticEventsData(): Promise<Event[]> {
  if (staticEventsData) {
    return staticEventsData;
  }
  
  try {
    // Auto-discover and import all YAML files in the monthly events directory
    // Using dynamic imports with a known pattern for static analysis
    // Covers multiple years to future-proof the system
    const importPromises = [];
    
    // Generate imports for years 2025-2030 to cover future events
    for (let year = 2025; year <= 2030; year++) {
      for (let month = 1; month <= 12; month++) {
        // Skip months before 2025-08 (our starting point)
        if (year === 2025 && month < 8) continue;
        
        const monthStr = String(month).padStart(2, '0');
        const filename = `${year}-${monthStr}.yaml`;
        importPromises.push(
          import(`@/data/events/monthly/${filename}`).catch(() => null)
        );
      }
    }
    
    const results = await Promise.all(importPromises);
    const validModules = results.filter(module => module !== null);
    
    // Flatten all events
    const allEvents: Event[] = [];
    validModules.forEach(module => {
      if (Array.isArray(module.default)) {
        module.default.forEach((event: any) => {
          // Handle comma-separated categories
          let categories: string[] = [];
          if (event.category) {
            // If category contains commas, split it into multiple categories
            if (typeof event.category === 'string' && event.category.includes(',')) {
              categories = event.category.split(',').map((cat: string) => cat.trim());
            } else {
              // Single category
              categories = [event.category];
            }
          }
          
          allEvents.push({
            id: event.id || '',
            title: event.title || 'Untitled Event',
            date: event.date || new Date().toISOString(),
            time: event.time,
            endDate: event.endDate,
            location: event.location || 'Location not specified',
            description: event.description || '',
            featured: Boolean(event.featured),
            status: event.status || 'upcoming',
            link: event.link,
            category: categories[0] || event.category, // Primary category
            categories: categories.length > 1 ? categories : undefined, // Only set if multiple categories
            image: event.image
          });
        });
      }
    });
    
    staticEventsData = allEvents;
    return allEvents;
  } catch (error) {
    console.error('Error loading static events data:', error);
    return [];
  }
}

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
    // Use static data loading for production (static export)
    if (process.env.NODE_ENV === 'production') {
      eventsCache = await loadStaticEventsData();
    } else {
      eventsCache = await fetchEventsFromApi();
    }
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
  const events = await getEvents();
  return events.find(event => event.id === id) || null;
}

// Get events specifically for Korniha band
export async function getKornihaEvents(): Promise<Event[]> {
  try {
    // Load Korniha-specific events from their dedicated YAML file
    const kornihaModule = await import('@/data/events/korniha.yaml');
    
    if (Array.isArray(kornihaModule.default)) {
      return kornihaModule.default.map((event: any) => ({
        id: event.id || '',
        title: event.title || 'Untitled Event',
        date: event.date || new Date().toISOString(),
        time: event.time,
        endDate: event.endDate,
        location: event.location || 'Location not specified',
        description: event.description || '',
        featured: Boolean(event.featured),
        status: event.status || 'upcoming',
        link: event.link,
        category: 'music',
        setlist: event.setlist
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error loading Korniha events:', error);
    return [];
  }
}

// Get a featured event (currently returns the next upcoming event)
export async function getFeaturedEvent(): Promise<Event | null> {
  const now = new Date();
  const events = await getEvents();
  
  // Sort events by date and find the next upcoming event
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcomingEvents[0] || null;
}
