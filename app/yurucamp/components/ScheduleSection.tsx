'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  List, 
  Grid,
  Music,
  Film,
  Utensils,
  Gamepad2,
  Paintbrush,
  DoorOpen,
  MapPin,
  Globe,
  Users,
  Car
} from 'lucide-react';
import { ScheduleDay, ScheduleTimeslot, ScheduleEvent } from '@/types/yurucamp';
import Link from 'next/link';

// Zone color mapping with consistent opacity and styling
const zoneColors: Record<string, string> = {
  'Stage': 'border-blue-500 bg-blue-500/10',
  'Open Cinema': 'border-purple-500 bg-purple-500/10',
  'Kitchen': 'border-amber-500 bg-amber-500/10',
  'Fandom Area': 'border-green-500 bg-green-500/10',
  'Fandom Meetings': 'border-teal-500 bg-teal-500/10',
  'Creative Hub': 'border-pink-500 bg-pink-500/10',
  'Entrance': 'border-gray-500 bg-gray-500/10',
  'All Areas': 'border-foreground/50 bg-foreground/5',
  'Shuttle': 'border-indigo-500 bg-indigo-500/10'
};

// Zone icon mapping with more specific icons
const zoneIcons: Record<string, JSX.Element> = {
  'Stage': <Music className="text-blue-400" size={20} />,
  'Open Cinema': <Film className="text-purple-400" size={20} />,
  'Kitchen': <Utensils className="text-amber-400" size={20} />,
  'Fandom Area': <Gamepad2 className="text-green-400" size={20} />,
  'Fandom Meetings': <Users className="text-teal-400" size={20} />,
  'Creative Hub': <Paintbrush className="text-pink-400" size={20} />,
  'Entrance': <DoorOpen className="text-gray-400" size={20} />,
  'All Areas': <Globe className="text-foreground/70" size={20} />,
  'Shuttle': <Car className="text-indigo-400" size={20} />
};

export default function ScheduleSection() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'time' | 'space'>('time');

  // Function to get day slug (lowercase, no spaces)
  const getDaySlug = (index: number) => {
    if (!schedule[index]) return '';
    return schedule[index].day.toLowerCase().replace(/\s+/g, '-');
  };
  
  // Function to get day index from slug (case insensitive)
  const getDayIndex = (slug: string) => {
    if (!slug) return -1;
    return schedule.findIndex(day => 
      day.day.toLowerCase() === slug.toLowerCase() || 
      day.day.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
  };

  // Handle URL hash changes and scrolling
  useEffect(() => {
    if (schedule.length === 0) return;
    
    const handleHash = () => {
      // Get hash from URL or default to empty string
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      
      // If no hash but we have a schedule, use the first day
      if (!hash && schedule.length > 0) {
        setActiveDay(0);
        return;
      }
      
      // If we have a hash, try to find and set the corresponding day
      if (hash) {
        const dayIndex = getDayIndex(hash);
        if (dayIndex >= 0 && dayIndex < schedule.length) {
          setActiveDay(dayIndex);
          // Small delay to ensure the element is rendered
          setTimeout(() => {
            const element = document.getElementById(`day-${hash}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    // Handle initial hash on mount and when schedule loads
    handleHash();
    
    // Also handle hash changes
    const handleHashChange = () => handleHash();
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [schedule]);
  
  // Handle scroll to update active day
  useEffect(() => {
    if (schedule.length === 0) return;
    
    const handleScroll = () => {
      const dayElements = schedule.map((_, index) => 
        document.getElementById(`day-${getDaySlug(index)}`)
      ).filter(Boolean) as HTMLElement[];
      
      if (dayElements.length === 0) return;
      
      // Find which day is currently in view
      const scrollPosition = window.scrollY + 100; // Add some offset
      
      for (let i = 0; i < dayElements.length; i++) {
        const element = dayElements[i];
        const nextElement = dayElements[i + 1];
        
        const elementTop = element.offsetTop;
        const elementBottom = nextElement ? nextElement.offsetTop : elementTop + element.offsetHeight;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          const slug = getDaySlug(i);
          setActiveDay(i);
          // Update URL without adding to history
          if (window.location.hash !== `#${slug}`) {
            window.history.replaceState({}, '', `#${slug}`);
          }
          break;
        }
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [schedule]);

  // Fetch schedule data from the API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('/api/yurucamp/schedule');
        if (!response.ok) {
          throw new Error('Failed to fetch schedule data');
        }
        const data = await response.json();
        setSchedule(data);
        
        // After setting the schedule, check if we need to handle a hash
        if (typeof window !== 'undefined') {
          const hash = window.location.hash.replace('#', '');
          if (hash) {
            const dayIndex = getDayIndex(hash);
            if (dayIndex >= 0) {
              setActiveDay(dayIndex);
              // Small delay to ensure the element is rendered
              setTimeout(() => {
                const element = document.getElementById(`day-${getDaySlug(dayIndex)}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }
          }
        }
      } catch (err) {
        console.error('Error loading schedule data:', err);
        setError('Failed to load schedule data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 text-red-100 p-4 rounded-lg">
        <p className="font-semibold">Error loading schedule</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (schedule.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No schedule available at the moment. Please check back later.
      </div>
    );
  }

  // Add type safety for the current day
  const currentDay = schedule[activeDay] as ScheduleDay;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Day Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full sm:w-auto">
          {schedule.map((day, index) => (
            <Link
              key={index}
              href={`#${day.day.toLowerCase().replace(/\s+/g, '-')}`}
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                setActiveDay(index);
                const slug = day.day.toLowerCase().replace(/\s+/g, '-');
                window.history.pushState({}, '', `#${slug}`);
                const element = document.getElementById(`day-${slug}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeDay === index
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : 'bg-card-dark/50 text-foreground hover:bg-card-dark/70'
              }`}
            >
              {index > 0 && <ChevronRight className="inline-block w-4 h-4 mr-1 opacity-50" />}
              {day.day}
            </Link>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-card-dark/70 rounded-full p-1.5 ml-auto border border-border/20 shadow-sm">
          <button
            onClick={() => setViewMode('time')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'time'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
            }`}
          >
            <Clock size={16} className="flex-shrink-0" />
            <span>By Time</span>
          </button>
          <div className="h-6 w-px bg-border/30 mx-1"></div>
          <button
            onClick={() => setViewMode('space')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'space'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
            }`}
          >
            <MapPin size={16} className="flex-shrink-0" />
            <span>By Area</span>
          </button>
        </div>
      </div>

      {/* Schedule for Selected Day */}
      <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50">
        <div id={`day-${schedule[activeDay]?.day.toLowerCase().replace(/\s+/g, '-')}`} className="scroll-mt-20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            {currentDay.day}, {currentDay.date}
          </h3>
        </div>
        
        <div className="space-y-4">
          {viewMode === 'time' ? (
            /* Time-based View */
            currentDay.timeslots.map((timeslot: ScheduleTimeslot, index: number) => (
              <div key={index} className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-foreground/90 bg-card-dark/60 py-1.5 px-3 rounded-full w-fit">
                  <Clock size={16} className="text-green-400 flex-shrink-0" />
                  <span className="font-medium text-sm">{timeslot.time}</span>
                </div>
                
                <div className="grid gap-3 md:grid-cols-2">
                  {timeslot.events.map((event: ScheduleEvent, eventIndex: number) => (
                    <EventCard key={eventIndex} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* Space-based View */
            (() => {
              // Group events by zone for the current day
              const eventsByZone = currentDay.timeslots.reduce<Record<string, {zone: string, events: {time: string, activity: string}[]}>>((acc, timeslot) => {
                timeslot.events.forEach(event => {
                  if (!acc[event.zone]) {
                    acc[event.zone] = { zone: event.zone, events: [] };
                  }
                  acc[event.zone].events.push({
                    time: timeslot.time,
                    activity: event.activity
                  });
                });
                return acc;
              }, {});

              return Object.entries(eventsByZone).map(([zone, zoneData]) => {
                const zoneColor = zoneColors[zone] || 'border-gray-500 bg-gray-500/10';
                const zoneIcon = zoneIcons[zone] || <MapPin size={16} />;

                return (
                  <div key={zone} className="mb-8 group">
                    <div 
                      className={`flex items-center gap-3 mb-4 px-4 py-3 rounded-xl ${zoneColor.replace('border-', 'bg-').replace('/10', '/20')} bg-opacity-30 w-fit transition-all duration-200 group-hover:bg-opacity-40`}
                    >
                      <div className={`p-2 rounded-lg ${zoneColor.replace('border-', 'bg-').replace('/10', '/30')} bg-opacity-30`}>
                        {React.cloneElement(zoneIcon, { size: 20, className: zoneColor.replace('border-', 'text-').replace('/10', '') })}
                      </div>
                      <span className="font-bold text-foreground text-base">{zone}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {zoneData.events.map((event, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-xl bg-card/50 hover:bg-card/70 transition-all duration-200 backdrop-blur-sm border-l-4 ${zoneColor} border-opacity-50`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-sm font-mono text-muted-foreground min-w-[60px] pt-0.5 flex-shrink-0">
                              {event.time}
                            </div>
                            <div className="font-medium text-foreground">
                              {event.activity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>
      </div>
    </div>
  );
}

// Event card component
function EventCard({ event }: { event: ScheduleEvent }) {
  const zoneColor = zoneColors[event.zone] || 'border-gray-500 bg-gray-500/10';
  const zoneIcon = zoneIcons[event.zone] || <MapPin size={16} />;
  
  return (
    <div 
      className={`p-4 rounded-xl border-l-4 ${zoneColor} bg-card-dark/80 hover:bg-card-dark transition-all duration-200 backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-foreground">{event.activity}</h4>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <div className={`p-1 rounded-md ${zoneColor.replace('border-', 'bg-').replace('/10', '/20')} bg-opacity-30`}>
              {zoneIcon}
            </div>
            <span className="font-medium text-foreground/80">{event.zone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
