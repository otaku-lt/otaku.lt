// Shared event categories configuration
export interface EventCategory {
  id: string;
  label: string;
  icon?: string; // Optional icon for display
  color?: string; // Optional color classes for display
}

// Main event categories used throughout the application
// Using the submit event categories list as it's more comprehensive
export const EVENT_CATEGORIES: EventCategory[] = [
  { id: 'anime', label: 'Anime Events', icon: '🎌', color: 'bg-red-500/10 text-red-400' },
  { id: 'cosplay', label: 'Cosplay', icon: '👤', color: 'bg-pink-500/10 text-pink-400' },
  { id: 'gaming', label: 'Gaming', icon: '🎮', color: 'bg-orange-500/10 text-orange-400' },
  { id: 'music', label: 'Music/Concerts', icon: '🎵', color: 'bg-purple-500/10 text-purple-400' },
  { id: 'screening', label: 'Movie Screenings', icon: '🎬', color: 'bg-blue-500/10 text-blue-400' },
  { id: 'workshop', label: 'Workshops', icon: '🎨', color: 'bg-green-500/10 text-green-400' },
  { id: 'meetup', label: 'Meetups', icon: '👥', color: 'bg-yellow-500/10 text-yellow-400' },
  { id: 'convention', label: 'Conventions', icon: '🏢', color: 'bg-indigo-500/10 text-indigo-400' },
  { id: 'camping', label: 'Camping', icon: '🎌', color: 'bg-green-500/10 text-green-400' },
  { id: 'social', label: 'Social Events', icon: '💬', color: 'bg-teal-500/10 text-teal-400' },
  { id: 'other', label: 'Other', icon: '❓', color: 'bg-gray-500/10 text-gray-400' }
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
