import React from 'react';
import { X, Calendar as CalendarIcon, MapPin, Tag } from 'lucide-react';
import type { Event } from '@/types/event';

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
          </div>
          <p className="opacity-90 flex items-center gap-2 text-foreground/80">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{event.location}</span>
          </p>
        </div>
        
        <div className="p-6 space-y-4 mt-2">
          <div className="space-y-4">
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
                <p className="text-foreground">{event.location}</p>
              </div>
            </div>
            
            {event.category && (
              <div className="flex items-start">
                <Tag className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-foreground">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
                </div>
              </div>
            )}
            
            {event.description && (
              <div className="pt-4 mt-2 border-t border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-foreground whitespace-pre-line">{event.description}</p>
              </div>
            )}
            
            {event.link && (
              <div className="pt-4 mt-2 border-t border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-2">More Information</p>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
