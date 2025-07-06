"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Users, Youtube, Instagram, Facebook, ExternalLink, Star } from "lucide-react";

export default function CommunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const communities = [
    {
      id: 1,
      name: "Anime Lithuania Discord",
      type: "discord",
      category: "anime",
      members: 1200,
      description: "Main Lithuanian anime community for discussions, memes, and events",
      activity: "Very Active",
      features: ["Daily discussions", "Anime recommendations", "Event announcements", "Art sharing"],
      link: "#"
    },
    {
      id: 2,
      name: "Cosplay LT",
      type: "facebook",
      category: "cosplay",
      members: 800,
      description: "Facebook group for Lithuanian cosplayers to share photos and tips",
      activity: "Active",
      features: ["Cosplay showcases", "Tutorial sharing", "Event coordination", "Buy/sell costumes"],
      link: "#"
    },
    {
      id: 3,
      name: "Otaku Gaming Lithuania",
      type: "discord",
      category: "gaming",
      members: 650,
      description: "Gaming community focused on anime games and Japanese gaming culture",
      activity: "Active",
      features: ["Game nights", "Tournament organization", "New game discussions", "Streaming"],
      link: "#"
    },
    {
      id: 4,
      name: "Anime Reviews LT",
      type: "youtube",
      category: "content",
      members: 450,
      description: "YouTube channel reviewing anime and manga with Lithuanian commentary",
      activity: "Weekly uploads",
      features: ["Anime reviews", "Manga discussions", "Industry news", "Community polls"],
      link: "#"
    },
    {
      id: 5,
      name: "J-Pop Lithuania",
      type: "instagram",
      category: "music",
      members: 300,
      description: "Instagram community sharing J-Pop news and concert updates",
      activity: "Daily posts",
      features: ["Music sharing", "Concert news", "Artist updates", "Fan art"],
      link: "#"
    },
    {
      id: 6,
      name: "Manga Club Vilnius",
      type: "facebook",
      category: "manga",
      members: 250,
      description: "Book club for manga enthusiasts in Vilnius area",
      activity: "Monthly meetups",
      features: ["Monthly discussions", "Manga recommendations", "Book exchanges", "Reading groups"],
      link: "#"
    },
    {
      id: 7,
      name: "r/japonija",
      type: "reddit",
      category: "culture",
      members: 2100,
      description: "Reddit community for Japanese culture discussions (includes anime)",
      activity: "Very Active",
      features: ["Cultural discussions", "Language exchange", "Travel advice", "Anime threads"],
      link: "#"
    },
    {
      id: 8,
      name: "Anime Art Lithuania",
      type: "discord",
      category: "art",
      members: 180,
      description: "Art community for anime-style artists and enthusiasts",
      activity: "Active",
      features: ["Art sharing", "Critique sessions", "Collaboration", "Art challenges"],
      link: "#"
    }
  ];

  const categories = [
    { id: "all", label: "All Communities", count: communities.length },
    { id: "anime", label: "Anime", count: communities.filter(c => c.category === "anime").length },
    { id: "cosplay", label: "Cosplay", count: communities.filter(c => c.category === "cosplay").length },
    { id: "gaming", label: "Gaming", count: communities.filter(c => c.category === "gaming").length },
    { id: "music", label: "Music", count: communities.filter(c => c.category === "music").length },
    { id: "art", label: "Art", count: communities.filter(c => c.category === "art").length },
    { id: "manga", label: "Manga", count: communities.filter(c => c.category === "manga").length }
  ];

  const filteredCommunities = selectedCategory === "all" 
    ? communities 
    : communities.filter(c => c.category === selectedCategory);

  const getIcon = (type: string) => {
    switch (type) {
      case "discord": return <MessageCircle className="text-indigo-600" size={24} />;
      case "facebook": return <Facebook className="text-blue-600" size={24} />;
      case "youtube": return <Youtube className="text-red-600" size={24} />;
      case "instagram": return <Instagram className="text-pink-600" size={24} />;
      case "reddit": return <MessageCircle className="text-orange-600" size={24} />;
      default: return <Users className="text-gray-600" size={24} />;
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "Very Active": return "bg-green-100 text-green-600";
      case "Active": return "bg-blue-100 text-blue-600";
      case "Weekly uploads": return "bg-purple-100 text-purple-600";
      case "Monthly meetups": return "bg-yellow-100 text-yellow-600";
      case "Daily posts": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <img 
                src="/otaku_lt.png" 
                alt="Otaku.lt Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                👥 Communities
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Otaku Communities 👥
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow otaku across Lithuania! Join Discord servers, Facebook groups, 
            YouTube channels, and more to share your passion for anime and Japanese culture.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Communities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Featured Communities
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCommunities.slice(0, 3).map((community) => (
              <div key={community.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl ring-2 ring-yellow-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    {getIcon(community.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{community.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity)}`}>
                      {community.activity}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users size={16} />
                    <span className="text-sm">{community.members.toLocaleString()} members</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {community.category}
                  </span>
                </div>
                <a
                  href={community.link}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all text-sm"
                >
                  <ExternalLink size={16} />
                  Join Community
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* All Communities */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Communities</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIcon(community.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{community.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(community.activity)}`}>
                      {community.activity}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{community.description}</p>

                <div className="space-y-2 mb-4">
                  {community.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{community.members.toLocaleString()}</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {community.category}
                    </span>
                  </div>
                  <a
                    href={community.link}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    Join <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Community CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center mt-12">
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