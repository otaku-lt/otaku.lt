'use client';

import { useState, useMemo } from 'react';
import { Music2 } from 'lucide-react';
import { Song, SortConfig, LanguageFlags, TypeConfig } from '@/app/korniha-band/types/song';

interface SongsSectionProps {
  songs: Song[];
  className?: string;
}

export function SongsSection({ songs, className = '' }: SongsSectionProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'title',
    direction: 'asc'
  });

  // Language flag components
  const languageFlags: LanguageFlags = {
    jp: { emoji: '🇯🇵', title: 'Japanese' },
    lt: { emoji: '🇱🇹', title: 'Lithuanian' },
    en: { emoji: '🇬🇧', title: 'English' },
  };

  // Song type labels and colors
  const typeConfig: TypeConfig = {
    ost: { 
      label: 'Anime', 
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' 
    },
    game: { 
      label: 'Game', 
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
    },
    citypop: { 
      label: 'City Pop', 
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
    },
    jpop: { 
      label: 'J-Pop', 
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
    },
    vocaloid: { 
      label: 'Vocaloid', 
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
    },
  };

  // Sort songs based on sortConfig
  const sortedSongs = useMemo(() => {
    const sortableItems = [...songs];
    if (!sortConfig.key) return sortableItems;
    
    sortableItems.sort((a, b) => {
      // Special handling for language sorting
      if (sortConfig.key === 'languages') {
        const aLangs = a.languages;
        const bLangs = b.languages;
        
        // If both have multiple languages, sort by number of languages (descending)
        if (aLangs.length > 1 || bLangs.length > 1) {
          if (aLangs.length !== bLangs.length) {
            return sortConfig.direction === 'asc' 
              ? bLangs.length - aLangs.length 
              : aLangs.length - bLangs.length;
          }
          // If same number of languages, sort alphabetically by first language
          return sortConfig.direction === 'asc'
            ? aLangs[0].localeCompare(bLangs[0])
            : bLangs[0].localeCompare(aLangs[0]);
        }
        
        // For single language, sort by language code
        return sortConfig.direction === 'asc'
          ? aLangs[0]?.localeCompare(bLangs[0] || '') || 0
          : bLangs[0]?.localeCompare(aLangs[0] || '') || 0;
      }
      
      // For other columns, use standard string comparison
      const aValue = String(a[sortConfig.key as keyof Song] || '');
      const bValue = String(b[sortConfig.key as keyof Song] || '');
      
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    
    return sortableItems;
  }, [songs, sortConfig]);

  const requestSort = (key: 'title' | 'type' | 'languages') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (!songs || songs.length === 0) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl ${className}`}>
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Repertoire</h3>
        <p className="text-gray-600 dark:text-gray-300">No songs available at the moment. Please check back later!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Repertoire</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th 
                  className="pb-3 font-medium cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => requestSort('title')}
                >
                  <div className="flex items-center">
                    Song
                    {sortConfig.key === 'title' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="pb-3 font-medium text-center cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => requestSort('type')}
                >
                  <div className="flex items-center justify-center">
                    Type
                    {sortConfig.key === 'type' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="pb-3 font-medium text-center cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => requestSort('languages')}
                >
                  <div className="flex items-center justify-center">
                    Languages
                    {sortConfig.key === 'languages' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedSongs.map((song, index) => (
                <tr 
                  key={song.id || index} 
                  className="hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {song.alt_title || song.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {song.original}
                      {song.artist && <span className="ml-2 text-gray-500">• {song.artist}</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                      typeConfig[song.type]?.color || 'bg-gray-200/70 dark:bg-gray-600/50'
                    }`}>
                      {typeConfig[song.type]?.label || song.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-1">
                      {song.languages.map((lang) => (
                        <span 
                          key={lang} 
                          title={languageFlags[lang]?.title} 
                          className="text-xl mx-0.5 transform hover:scale-125 transition-transform"
                          aria-label={languageFlags[lang]?.title}
                        >
                          {languageFlags[lang]?.emoji}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SongsSection;
