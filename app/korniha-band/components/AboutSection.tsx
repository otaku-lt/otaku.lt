'use client';

import { Music, Users, Award } from 'lucide-react';
import { AboutSectionProps, StatItem } from '@/app/korniha-band/types/about';

export function AboutSection({ 
  className = '',
  stats = defaultStats,
  description = defaultDescription
}: AboutSectionProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-foreground">About Korniha Band</h3>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {description.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
            <div 
              className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <stat.icon className={stat.iconColor} size={32} />
            </div>
            <h4 className="text-lg font-bold mb-2 text-foreground">{stat.value}</h4>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Default values
const defaultStats: StatItem[] = [
  {
    icon: Music,
    value: "30+ Songs",
    label: "Performing anime covers in both Japanese and Lithuanian",
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    icon: Users,
    value: "3 Members",
    label: "Dedicated musicians passionate about anime music",
    iconColor: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30"
  },
  {
    icon: Award,
    value: "1 Year",
    label: "Passionately performing since 2024",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  }
];

const defaultDescription = [
  "Korniha Band was born from a shared passion for anime music and the desire to bring those incredible soundtracks to life. We're a group of Lithuanian musicians who grew up loving anime and wanted to share that love through music.",
  "From epic opening themes to emotional ending songs, we carefully arrange and perform both classic and modern anime music. Our goal is to create an authentic experience that captures the spirit and emotion of the original compositions.",
  "Whether you're a long-time anime fan or just discovering this amazing music, we invite you to join us for an unforgettable musical journey through the world of anime."
];

export default AboutSection;
