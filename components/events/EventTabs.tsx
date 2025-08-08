'use client';

import React from 'react';
import { Calendar, LayoutGrid } from 'lucide-react';

type Category = {
  id: string;
  label: string;
  count: number;
};

type ViewMode = 'calendar' | 'list';

interface EventTabsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showSearch?: boolean;
  showViewToggle?: boolean;
  showSubmitButton?: boolean;
  showCategoryFilters?: boolean;
  submitButtonHref?: string;
  submitButtonText?: string;
  className?: string;
}

export function EventTabs({
  categories,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange,
  showSearch = true,
  showViewToggle = true,
  showSubmitButton = true,
  showCategoryFilters = true,
  submitButtonHref = '/submit',
  submitButtonText = 'Submit Event',
  className = '',
}: EventTabsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Submit Button */}
      {(showSearch || showSubmitButton) && (
        <div className="flex flex-col md:flex-row gap-4">
          {showSearch && (
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border-0 bg-card/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground/60"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          )}

          {showSubmitButton && (
            <a
              href={submitButtonHref}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span>+</span>
              {submitButtonText}
            </a>
          )}
        </div>
      )}

      {/* View Toggle */}
      {showViewToggle && (
        <div className="flex justify-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <button
              onClick={() => onViewModeChange('calendar')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent/10'
              }`}
            >
              <Calendar size={16} className="inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent/10'
              }`}
            >
              <LayoutGrid size={16} className="inline mr-2" />
              List View
            </button>
          </div>
        </div>
      )}

      {/* Category Filters */}
      {showCategoryFilters && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card/80 text-muted-foreground hover:bg-accent/10'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
