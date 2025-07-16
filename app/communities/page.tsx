"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, MessageCircle, Youtube, Instagram, Facebook, ExternalLink, Star } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

interface Community {
  id: string;
  title: string;
  description: string;
  category: string;
  members: number;
  featured?: boolean;
  links: Array<{
    type: string;
    url: string;
  }>;
  features?: string[];
  activity?: string;
}

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'discord':
      return <MessageCircle size={24} />;
    case 'youtube':
      return <Youtube size={24} />;
    case 'instagram':
      return <Instagram size={24} />;
    case 'facebook':
      return <Facebook size={24} />;
    default:
      return <Users size={24} />;
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
        <ContentPageHeader 
          title="Otaku Communities" 
          description="Connect with fellow otaku across Lithuania! Join Discord servers, Facebook groups, and more to share your passion for anime and Japanese culture."
        />
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
      <ContentPageHeader 
        title="Otaku Communities"
        description="Connect with fellow otaku across Lithuania! Join Discord servers, Facebook groups, and more to share your passion for anime and Japanese culture."
      />
      
      <div className="container mx-auto px-4 py-12">
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
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{community.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity || 'medium')}`}>
                        {community.activity || 'Active'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{community.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users size={16} />
                      <span>{community.members.toLocaleString()} members</span>
                    </div>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      {community.category}
                    </span>
                  </div>
                  
                  {community.links?.[0]?.url && (
                    <a
                      href={community.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all text-sm"
                    >
                      Join Community <ExternalLink size={16} />
                    </a>
                  )}
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
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{community.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity || 'medium')}`}>
                        {community.activity || 'Active'}
                      </span>
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{community.members.toLocaleString()}</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {community.category}
                      </span>
                    </div>
                    {community.links?.[0]?.url && (
                      <a
                        href={community.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
                      >
                        Join <ExternalLink size={14} />
                      </a>
                    )}
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
