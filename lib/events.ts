// Define the Event type locally
export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  setlist: {
    days: Array<{
      day?: number;
      type: 'Japanese' | 'Lithuanian';
      songs: string[];
    }>;
  };
}

// In-memory cache for events
let cachedEvents: Event[] | null = null;

// Function to load events from YAML file at build time
async function loadEventsFromYaml(): Promise<Event[]> {
  try {
    // Using dynamic import to avoid including fs in the client bundle
    const fs = await import('fs/promises');
    const path = await import('path');
    const yaml = await import('js-yaml');
    
    const filePath = path.join(process.cwd(), 'data/events/korniha.yaml');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const events = yaml.load(fileContents) as Event[];
    
    // Sort events by date
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error('Error loading events from YAML:', error);
    return [];
  }
}

export async function getKornihaEvents(): Promise<Event[]> {
  // If we're in a browser environment, try to fetch from the API
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        cachedEvents = data;
        return data;
      }
      console.warn('Failed to fetch events from API, using fallback data');
    } catch (error) {
      console.warn('Error fetching events from API:', error);
    }
  }
  
  // If we're in a server environment or API fetch failed, use the cached events or load from YAML
  if (cachedEvents) {
    return cachedEvents;
  }
  
  try {
    cachedEvents = await loadEventsFromYaml();
    return cachedEvents;
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
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
