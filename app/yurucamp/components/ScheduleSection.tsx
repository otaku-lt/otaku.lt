'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { ScheduleDay } from '@/types/yurucamp';

export default function ScheduleSection() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      {schedule.map((day, index) => (
        <div key={index} className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border-dark/50 hover:border-green-500/30 transition-colors">
          <h3 className="text-2xl font-bold mb-4 text-foreground-dark flex items-center gap-2">
            <Calendar className="text-green-600" size={24} />
            {day.day} - {day.date}
          </h3>
          <div className="space-y-3">
            {day.events.map((event, eventIndex) => (
              <div key={eventIndex} className="flex items-center gap-4 p-3 bg-card/50 hover:bg-card/70 rounded-lg border border-border/30 transition-colors group">
                <div className="w-16 text-sm font-semibold text-green-400 flex-shrink-0">
                  {event.time}
                </div>
                <div className="text-foreground group-hover:text-green-300 transition-colors">{event.activity}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
