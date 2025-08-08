// Shared event categories configuration
export interface EventCategory {
  id: string;
  label: string;
  icon?: string; // Optional icon for display
}

// Main event categories used throughout the application
// Using the submit event categories list as it's more comprehensive
export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 'anime', label: 'Anime Events' },
  { id: 'cosplay', label: 'Cosplay' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'music', label: 'Music/Concerts' },
  { id: 'screening', label: 'Movie Screenings' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'meetup', label: 'Meetups' },
  { id: 'convention', label: 'Conventions' },
  { id: 'other', label: 'Other' }
];

// Submit form uses the same categories
export const SUBMIT_EVENT_CATEGORIES: EventCategory[] = EVENT_CATEGORIES;

// Helper function to get category by ID
export function getCategoryById(categoryId: string): EventCategory | undefined {
  return EVENT_CATEGORIES.find(cat => cat.id === categoryId);
}

// Helper function to get submit category by ID (same as above)
export function getSubmitCategoryById(categoryId: string): EventCategory | undefined {
  return SUBMIT_EVENT_CATEGORIES.find(cat => cat.id === categoryId);
}
