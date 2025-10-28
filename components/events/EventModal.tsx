import React, { useState, useMemo } from 'react';
import { X, Calendar as CalendarIcon, MapPin, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import type { Event, Screening } from '@/types/event';
import { EVENT_CATEGORIES } from '@/config/event-categories';
import { cn } from '@/lib/utils';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  selectedScreeningDate?: string | null;
}

export function EventModal({ event, isOpen, onClose, selectedScreeningDate }: EventModalProps) {
  if (!event) return null;
  
  // Format date to YYYY-MM-DD for consistent comparison
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      // Handle both YYYY-MM-DD and full ISO strings
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return '';
    }
  };

  const [expandedCinemas, setExpandedCinemas] = useState<Record<string, boolean>>({});

  // Get the selectedScreeningDate from props or from the event object
  const actualSelectedScreeningDate = useMemo(() => {
    // First try to get from props
    if (selectedScreeningDate) return selectedScreeningDate;
    
    // Then try to get from event object
    if ((event as any).selectedScreeningDate) return (event as any).selectedScreeningDate;
    
    // If no selected date, use the first screening date or event date
    if (event.screenings && event.screenings.length > 0) {
      return event.screenings[0].date || event.date;
    }
    
    return event.date;
  }, [selectedScreeningDate, event]);

  // Group all cinemas and their screenings
  const cinemasWithScreenings = useMemo(() => {
    if (!event.screenings || event.screenings.length === 0) {
      return {};
    }

    const selectedDateStr = formatDate(actualSelectedScreeningDate);
    const cinemas: Record<string, { all: Screening[]; hasOnSelectedDate: boolean }> = {};
    
    // Group all screenings by cinema and check which have screenings on selected date
    event.screenings.forEach(screening => {
      const cinema = screening.cinema || 'Other';
      if (!cinemas[cinema]) {
        cinemas[cinema] = { 
          all: [], 
          hasOnSelectedDate: false 
        };
      }
      
      // Add to all screenings
      cinemas[cinema].all.push(screening);
      
      // Check if this screening is for the selected date
      const screeningDateStr = formatDate(screening.date || event.date);
      if (screeningDateStr === selectedDateStr) {
        cinemas[cinema].hasOnSelectedDate = true;
      }
    });
    
    // Sort screenings within each cinema by date
    Object.values(cinemas).forEach(cinema => {
      cinema.all.sort((a, b) => 
        new Date(a.date || event.date).getTime() - new Date(b.date || event.date).getTime()
      );
    });
    
    return cinemas;
  }, [event.screenings, actualSelectedScreeningDate, event.date]);

  // Toggle cinema expansion
  const toggleCinema = (cinema: string) => {
    setExpandedCinemas(prev => ({
      ...prev,
      [cinema]: !prev[cinema]
    }));
  };

  // Expand cinemas with screenings for the selected date by default
  React.useEffect(() => {
    const initialExpandedState = Object.entries(cinemasWithScreenings).reduce<Record<string, boolean>>(
      (acc, [cinema, { hasOnSelectedDate }]) => {
        // Only expand if there are screenings for the selected date
        acc[cinema] = hasOnSelectedDate;
        return acc;
      },
      {}
    );
    setExpandedCinemas(initialExpandedState);
  }, [cinemasWithScreenings]);

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
                    <p className="text-sm font-medium text-muted-foreground">
                      Screenings on {new Date(actualSelectedScreeningDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {Object.keys(cinemasWithScreenings).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(cinemasWithScreenings).map(([cinema, { all, hasOnSelectedDate }]) => (
                        <div key={cinema} className="space-y-2">
                          <button
                            type="button"
                            onClick={() => toggleCinema(cinema)}
                            className="flex items-center w-full text-left p-2 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                            <span className="font-medium text-foreground">{cinema}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {all.length} {all.length === 1 ? 'screening' : 'screenings'}
                              {hasOnSelectedDate && (
                                <span className="ml-1 text-primary">• {all.filter(s => formatDate(s.date || event.date) === formatDate(actualSelectedScreeningDate)).length} on this date</span>
                              )}
                            </span>
                            <div className="ml-auto">
                              {expandedCinemas[cinema] ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          </button>
                          
                          {expandedCinemas[cinema] !== false && (
                            <div className="pl-6 space-y-2">
                              {all.map((screening, index) => {
                                const isSelectedDate = formatDate(screening.date || event.date) === formatDate(actualSelectedScreeningDate);
                                return (
                                  <div 
                                    key={index} 
                                    className={cn(
                                      'flex justify-between items-center rounded-lg p-3',
                                      isSelectedDate 
                                        ? 'bg-primary/10 ring-1 ring-primary/20' 
                                        : 'bg-muted/30 hover:bg-muted/50',
                                      'transition-colors'
                                    )}
                                  >
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium text-foreground">
                                          {new Date(screening.date || event.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                          })}
                                        </p>
                                        {isSelectedDate && (
                                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                            Selected date
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {screening.time || event.time || 'Time TBA'}
                                        {screening.auditorium && ` • ${screening.auditorium}`}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No screenings available.
                    </div>
                  )}
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
                <p className="text-sm font-medium text-muted-foreground mb-3">More Information</p>
                <div className="flex flex-wrap gap-2">
                  {/* Multiple links */}
                  {event.links && event.links.length > 0 ? (
                    event.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm"
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm"
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
