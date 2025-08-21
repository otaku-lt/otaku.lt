export type SetlistDay = {
  day?: number;
  date?: string;
  time?: string;
  type: 'Japanese' | 'Lithuanian';
  songs?: string[];
};

export type EventSetlist = {
  days?: SetlistDay[];
  type?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  setlist?: EventSetlist | string;
};
