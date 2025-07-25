'use client';

import { Calendar, MapPin, Music2, ExternalLink } from 'lucide-react';
import type { Event } from '@/app/korniha-band/types/event';
import { formatEventDate } from '@/app/korniha-band/types/featured-event';

interface FeaturedEventProps {
  event: Event | null;
  className?: string;
}

export function FeaturedEvent({ event, className = '' }: FeaturedEventProps) {
  if (!event) return null;

  return (
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 md:p-8 text-white shadow-lg transform transition-all hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden ${className}`}>
      {/* Widget Label */}
      <div className="absolute top-0 left-0 bg-white/10 px-4 py-1.5 rounded-br-lg text-sm font-medium text-white/80 backdrop-blur-sm">
        Next Performance
      </div>
      
      <div className="pt-6 mb-4">
        <h3 className="text-xl md:text-2xl font-semibold text-white/95 text-center">{event.title}</h3>
      </div>
      
      <p className="text-purple-100 mb-6 text-center text-sm md:text-base max-w-3xl mx-auto">{event.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
        <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
          <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white/80">When</p>
            <p className="text-white">
              {formatEventDate(event.date, event.endDate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
          <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white/80">Where</p>
            <p className="text-white">{event.location}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 bg-white/10 p-3 rounded-lg">
          <Music2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white/80">Setlist</p>
            <p className="text-white">
              {!event.setlist ? (
                'TBA'
              ) : typeof event.setlist === 'string' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs">
                  {event.setlist}
                </span>
              ) : (
                <span className="flex flex-wrap gap-1">
                  {event.setlist && 'days' in event.setlist && Array.isArray(event.setlist.days) && event.setlist.days.length > 0 ? (
                    event.setlist.days.map((day, i) => {
                      const dayInfo = day as { day?: number; type?: string };
                      return (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs">
                          {dayInfo?.day ? `Day ${dayInfo.day}: ` : ''}{dayInfo?.type || 'Performance'}
                        </span>
                      );
                    })
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-xs">
                      Performance
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href={`data:text/calendar;charset=utf8,${encodeURIComponent(
            `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${new Date(event.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${event.endDate ? new Date(event.endDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') : new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`
          )}`}
          download={`${event.title.replace(/\s+/g, '_')}.ics`}
          className="px-5 py-2.5 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all flex items-center text-sm md:text-base"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Add to Calendar
        </a>
        {event.link && (
          <a 
            href={event.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center text-sm md:text-base"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Event Details
          </a>
        )}
      </div>
    </div>
  );
}

export default FeaturedEvent;
