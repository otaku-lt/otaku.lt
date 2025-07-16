export type SetlistDay = {
  day?: number;
  type: 'Japanese' | 'Lithuanian';
  songs: string[];
};

export type EventSetlist = {
  days: SetlistDay[];
};

export type Event = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  setlist?: EventSetlist | string;
};
