'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { ScheduleDay, ScheduleTimeslot, ScheduleEvent } from '@/types/yurucamp';
import Link from 'next/link';

// Zone color mapping
const zoneColors: Record<string, string> = {
  'Stage': 'border-blue-500 bg-blue-500/10',
  'Cinema': 'border-purple-500 bg-purple-500/10',
  'Kitchen': 'border-amber-500 bg-amber-500/10',
  'Fandom': 'border-green-500 bg-green-500/10',
  'Creative Hub': 'border-pink-500 bg-pink-500/10',
  'Entrance': 'border-gray-500 bg-gray-500/10',
  'All Areas': 'border-white bg-white/10'
};

// Zone icon mapping
const zoneIcons: Record<string, JSX.Element> = {
  'Stage': <MapPin className="text-blue-400" size={16} />,
  'Cinema': <MapPin className="text-purple-400" size={16} />,
  'Kitchen': <MapPin className="text-amber-400" size={16} />,
  'Fandom': <MapPin className="text-green-400" size={16} />,
  'Creative Hub': <MapPin className="text-pink-400" size={16} />,
  'Entrance': <MapPin className="text-gray-400" size={16} />,
  'All Areas': <MapPin className="text-white" size={16} />
};

export default function ScheduleSection() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);

  // Handle scroll to update active day
  useEffect(() => {
    if (schedule.length === 0) return;
    
    const handleScroll = () => {
      const dayElements = schedule.map((_, index) => 
        document.getElementById(`day-${index}`)
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
          setActiveDay(i);
          // Update URL without scrolling
          window.history.replaceState({}, '', `#day-${i}`);
          break;
        }
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check URL hash on initial load
    const handleHashChange = () => {
      const hash = window.location.hash;
      const dayMatch = hash.match(/day-(\d+)/);
      if (dayMatch) {
        const dayIndex = parseInt(dayMatch[1], 10);
        if (!isNaN(dayIndex) && dayIndex >= 0 && dayIndex < schedule.length) {
          setActiveDay(dayIndex);
          // Small delay to ensure the element is rendered
          setTimeout(() => {
            const element = document.getElementById(`day-${dayIndex}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };
    
    // Initial check
    handleScroll();
    handleHashChange();
    
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
      } catch (err) {
        console.error('Error loading schedule data:', err);
        setError('Failed to load schedule data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-12 text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground-dark">Schedule Coming Soon</h3>
        <p className="text-muted-foreground">We're finalizing the schedule details. Check back later for updates!</p>
      </div>
    );
  }

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
      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {schedule.map((day, index) => (
          <Link
            key={index}
            href={`#day-${index}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveDay(index);
              // Scroll to the day's section
              const element = document.getElementById(`day-${index}`);
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

      {/* Schedule for Selected Day */}
      <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50">
        <div id={`day-${activeDay}`} className="scroll-mt-20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            {currentDay.day}, {currentDay.date}
          </h3>
        </div>
        
        <div className="space-y-4">
          {currentDay.timeslots.map((timeslot: ScheduleTimeslot, index: number) => (
            <div key={index} className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-foreground/90 bg-card-dark/60 py-1.5 px-3 rounded-full w-fit">
                <Clock size={16} className="text-green-400 flex-shrink-0" />
                <span className="font-medium text-sm">{timeslot.time}</span>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2">
                {timeslot.events.map((event: ScheduleEvent, eventIndex: number) => {
                  const zoneColor = zoneColors[event.zone] || 'border-gray-500 bg-gray-500/10';
                  const zoneIcon = zoneIcons[event.zone] || <MapPin size={16} />;
                  
                  return (
                    <div 
                      key={eventIndex}
                      className={`p-4 rounded-xl border-l-4 ${zoneColor} bg-card/50 hover:bg-card/70 transition-all duration-200 backdrop-blur-sm`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foreground">{event.activity}</h4>
                          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                            <div className={`p-1 rounded-md ${zoneColor.replace('border-', 'bg-').replace('/10', '/20')} bg-opacity-30`}>
                              {zoneIcon}
                            </div>
                            <span className="font-medium">{event.zone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
