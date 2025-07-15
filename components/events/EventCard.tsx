import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';

type EventCardProps = {
  id: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  featured?: boolean;
  showCategory?: boolean;
  className?: string;
  href?: string;
  getCategoryEmoji?: (category: string) => string;
  getCategoryColors?: (category: string) => string;
};

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  description,
  featured = false,
  showCategory = true,
  className = '',
  href = `#`,
  getCategoryEmoji = (cat: string) => '🎌',
  getCategoryColors = () => 'bg-primary/10 text-primary',
}: EventCardProps) {
  const cardContent = (
    <div className={`h-full flex flex-col bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] border border-border/40 hover:border-primary/30 ${className}`}>
      {featured && (
        <div className="flex justify-between items-start mb-4">
          <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
          {showCategory && (
            <div className="text-2xl">
              {getCategoryEmoji(category)}
            </div>
          )}
        </div>
      )}

      <h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{location}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

      {showCategory && (
        <div className="mt-auto pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColors(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="text-primary text-sm font-medium hover:underline leading-normal pb-0.5">
              Learn More →
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    <div className="h-full">
      {cardContent}
    </div>
  );
}
