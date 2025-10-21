import type { CategoryColors } from '@/types/calendar';

export const getCategoryColor = (category: string): CategoryColors => {
  const colors: Record<string, CategoryColors> = {
    default: {
      bg: 'bg-gray-100/10',
      text: 'text-gray-100',
      border: 'border-gray-500/30',
    },
    screening: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    meetup: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    workshop: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    conference: {
      bg: 'bg-pink-500/10',
      text: 'text-pink-400',
      border: 'border-pink-500/30',
    },
    social: {
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
    presentation: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
  };

  return colors[category] || colors.default;
};
