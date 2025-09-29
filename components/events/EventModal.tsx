import React from 'react';
import { X, Calendar as CalendarIcon, MapPin, Tag } from 'lucide-react';
import type { Event, Screening } from '@/types/event';
import { EVENT_CATEGORIES } from '@/config/event-categories';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-2xl border border-border scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-card/80 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Event Image */}
        {event.image && (
          <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}
        
        <div className={`${event.image ? 'pt-4' : 'pt-2'} px-6`}>
          <div className="flex items-center gap-2 mb-2">
            {event.featured && (
              <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
            {(event.categories || [event.category]).length > 0 && (
              <div className="text-2xl">
                {(() => {
                  const firstCategory = event.categories?.[0] || event.category;
                  const categoryConfig = EVENT_CATEGORIES.find(cat => cat.id === firstCategory);
                  return categoryConfig?.icon || '🎌';
                })()}
              </div>
            )}
          </div>
          {!event.screenings || event.screenings.length === 0 ? (
            <p className="opacity-90 flex items-center gap-2 text-foreground/80">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{event.location}</span>
            </p>
          ) : null}
        </div>
        
        <div className="p-6 space-y-4 mt-2">
          <div className="space-y-4">
            {event.screenings && event.screenings.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-3 flex-shrink-0 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Screenings by Cinema</p>
                  </div>
                  
                  {/* Group screenings by cinema */}
                  {(() => {
                    // Create a map to group screenings by cinema
                    const screeningsByCinema = event.screenings.reduce<Record<string, Screening[]>>((acc, screening) => {
                      const cinema = screening.cinema || 'Other';
                      if (!acc[cinema]) {
                        acc[cinema] = [];
                      }
                      acc[cinema].push(screening);
                      return acc;
                    }, {});
                    
                    const cinemaElements = Object.entries(screeningsByCinema).map(([cinema, cinemaScreenings]) => (
                      <div key={cinema} className="space-y-2 pl-8">
                        <h4 className="font-medium text-foreground flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          {cinema}
                        </h4>
                        <div className="space-y-2">
                          {cinemaScreenings
                            .sort((a, b) => 
                              new Date(a.date || event.date).getTime() - new Date(b.date || event.date).getTime()
                            )
                            .map((screening, index) => (
                              <div key={index} className="flex justify-between items-center bg-muted/30 rounded-lg p-3">
                                <div>
                                  <p className="font-medium text-foreground">
                                    {new Date(screening.date || event.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {screening.time || event.time || 'Time TBA'}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ));
                    
                    return <>{cinemaElements}</>;
                  })()}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">When</p>
                    <p className="text-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      {event.time && event.time !== 'All day' && ` at ${event.time}`}
                      {event.endDate && (
                        ` - ${new Date(event.endDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}`
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="text-foreground">{event.location || 'Location TBA'}</p>
                  </div>
                </div>
              </>
            )}
            
            {(event.category || (event.categories && event.categories.length > 0)) && (
              <div className="flex items-start">
                <Tag className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {(event.categories || [event.category]).map((category, index) => (
                      <span key={index} className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {event.description && (
              <div className="pt-4 mt-2 border-t border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-foreground whitespace-pre-line">{event.description}</p>
              </div>
            )}
            
            {((event.links && event.links.length > 0) || event.link) && (
              <div className="pt-4 mt-2 border-t border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-2">More Information</p>
                <div className="space-y-2">
                  {/* Multiple links */}
                  {event.links && event.links.length > 0 ? (
                    event.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 block"
                      >
                        {link.name}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))
                  ) : event.link ? (
                    /* Single link fallback */
                    <a 
                      href={event.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View Event Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
