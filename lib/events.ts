import type { Event } from '@/app/api/events/route';

export async function getKornihaEvents(): Promise<Event[]> {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
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
