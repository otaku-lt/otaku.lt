"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, MessageCircle, Youtube, Instagram, Facebook, ExternalLink, Star } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

interface CommunityLink {
  type: 'discord' | 'youtube' | 'instagram' | 'facebook' | 'website';
  url: string;
}

interface Community {
  id: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  links: CommunityLink[];
  features?: string[];
  activity?: 'high' | 'medium' | 'low';
}

// Social Media Icons
interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DiscordIcon = ({ size = 24, className = "", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.078-.01c3.928 1.8 8.18 1.8 12.062 0a.074.074 0 01.079.01c.12.098.246.192.373.292a.077.077 0 01-.008.128 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.104c.36.698.772 1.362 1.225 1.993a.076.076 0 00.085.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.95-2.42 2.158-2.42 1.21 0 2.175 1.09 2.157 2.42 0 1.334-.95 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.951-2.42 2.157-2.42 1.207 0 2.175 1.09 2.157 2.42 0 1.334-.95 2.42-2.157 2.42z" />
  </svg>
);

const FacebookIcon = ({ size = 24, className = "", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);


const YoutubeIcon = ({ size = 24, className = "", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WebIcon = ({ size = 24, className = "", style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const RedditIcon = ({ size = 24, className = "", style }: IconProps) => (
  <div style={{ 
    display: 'inline-flex',
    filter: 'invert(1)' 
  }}>
    <img 
      src="/icons/reddit.png" 
      alt="Reddit" 
      className={className}
      style={{ 
        width: size, 
        height: size,
        objectFit: 'contain',
        ...style 
      }} 
    />
  </div>
);

const getIcon = (type: string, size = 24, className = "", style = {}) => {
  const iconStyle = { width: size, height: size };
  
  switch (type.toLowerCase()) {
    case 'discord':
      return <DiscordIcon size={size} className={className} style={style} />;
    case 'facebook':
      return <FacebookIcon size={size} className={className} style={style} />;
    case 'instagram':
      return <InstagramIcon size={size} className={className} style={style} />;
    case 'youtube':
      return <YoutubeIcon size={size} className={className} style={style} />;
    case 'reddit':
      return <RedditIcon size={size} className={className} style={style} />;
    case 'web':
      return <WebIcon size={size} className={className} style={style} />;
    default:
      return <ExternalLink size={size * 0.75} style={iconStyle} />;
  }
};

const getActivityColor = (activity: string) => {
  switch (activity?.toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CommunitiesPage() {
  // Add dark theme class to html element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/api/communities');
        if (!response.ok) throw new Error('Failed to fetch communities');
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error('Error loading communities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Get all unique categories with counts
  const categories = [
    { id: 'all', label: 'All', count: communities.length },
    ...Array.from(new Set(communities.map(c => c.category))).map(category => ({
      id: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      count: communities.filter(c => c.category === category).length
    }))
  ];

  // Filter communities based on search and category
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <ContentPageHeader title="Otaku Communities" />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            {/* Search and Filter Skeleton */}
            <div className="max-w-2xl mx-auto">
              <div className="h-12 bg-white/50 dark:bg-gray-800/50 rounded-full"></div>
            </div>
            
            {/* Categories Skeleton */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-24 bg-white/50 dark:bg-gray-800/50 rounded-full"></div>
              ))}
            </div>
            
            {/* Featured Communities Skeleton */}
            <div>
              <div className="h-8 w-48 bg-white/50 dark:bg-gray-800/50 rounded mb-6"></div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-100 dark:bg-gray-700/50 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ContentPageHeader title="Otaku Communities" />
      
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with fellow otaku across Lithuania! Join Discord servers, Facebook groups, and more to share your passion for anime and Japanese culture.
        </p>
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700/80'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Communities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Featured Communities
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCommunities
              .filter(community => community.featured)
              .slice(0, 3)
              .map((community) => (
                <div key={community.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl ring-2 ring-yellow-200 dark:ring-yellow-800/30 hover:shadow-2xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white">
                      {community.links?.[0]?.type ? getIcon(community.links[0].type) : <Users size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{community.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity || 'medium')}`}>
                          {community.activity || 'Active'}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                          {community.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{community.description}</p>
                  

                  
                  <div className="flex flex-wrap gap-2">
  {community.links?.map((link, index) => (
    <a
      key={index}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
      aria-label={`${community.title} on ${link.type}`}
      title={`${link.type}: ${community.title}`}
    >
      {getIcon(link.type, 20)}
    </a>
  ))}
</div>
                </div>
              ))}
          </div>
        </div>

        {/* All Communities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">All Communities</h2>
          {filteredCommunities.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <div key={community.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300">
                      {community.links?.[0]?.type ? getIcon(community.links[0].type) : <Users size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{community.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity || 'medium')}`}>
                          {community.activity || 'Active'}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                          {community.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{community.description}</p>

                  <div className="space-y-2 mb-4">
                    {community.features?.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
  {community.links?.map((link, index) => (
    <a
      key={index}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`${community.title} on ${link.type}`}
      title={`${link.type}: ${community.title}`}
    >
      {getIcon(link.type, 16)}
    </a>
  ))}
</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No communities found matching your search.</p>
            </div>
          )}
        </div>

        {/* Create Community CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Own Community</h3>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Have an idea for a new otaku community? We'd love to help you get started and feature it here!
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-semibold text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
