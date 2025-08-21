export type Song = {
  id: string;
  title: string;
  original: string;
  artist?: string;
  type: 'ost' | 'game' | 'citypop' | 'jpop' | 'vocaloid' | 'character song';
  lang: ('jp' | 'lt' | 'en')[];
  alt_title?: string;
};

export type SortConfig = {
  key: 'title' | 'type' | 'lang';
  direction: 'asc' | 'desc';
};

export type LanguageFlags = Record<string, { emoji: string; title: string }>;

export type TypeConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};
