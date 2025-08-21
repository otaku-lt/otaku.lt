'use client';

import { Music2, ExternalLink } from 'lucide-react';
import { Event } from '../types/event';

interface GigsSectionProps {
  events: Event[];
  title?: string;
  className?: string;
}

export function GigsSection({ events, title = 'Upcoming Shows', className = '' }: GigsSectionProps) {
  if (!events || events.length === 0) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl ${className}`}>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">No upcoming shows scheduled. Check back later!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`p-4 rounded-xl ${
                event.featured 
                  ? 'bg-purple-50 dark:bg-gray-700/50' 
                  : 'bg-white/50 dark:bg-gray-800/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{event.title}</h4>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric' 
                    })}`}
                    {event.time && ` at ${event.time}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                  {event.setlist && (
                    <div className="mt-2">
                      <span className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400">
                        <Music2 className="mr-1 h-4 w-4" />
                        {typeof event.setlist === 'string' ? (
                          <span>Setlist: {event.setlist}</span>
                        ) : event.setlist.type ? (
                          <span>Setlist: {event.setlist.type}</span>
                        ) : event.setlist.days && Array.isArray(event.setlist.days) ? (
                          event.setlist.days.map((day, i) => (
                            <span key={i} className="mr-2">
                              {i > 0 && ' • '}
                              {day.day ? `Day ${day.day}: ` : ''}{day.type}
                              {day.time ? ` at ${day.time}` : ''}
                            </span>
                          ))
                        ) : null}
                      </span>
                    </div>
                  )}
                </div>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      event.featured 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    More Info
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GigsSection;
