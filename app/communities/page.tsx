"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Users, Youtube, Instagram, Facebook, ExternalLink, Star } from "lucide-react";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";

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
    <div className="min-h-screen bg-background text-foreground">
      <ContentPageHeader 
        title="Communities"
        backHref="/"
        backText="Back to Home"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Communities</h1>
          <p className="text-muted-foreground">Connect with like-minded anime and Japanese culture enthusiasts in Lithuania.</p>
        </div>
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-accent/10 text-muted-foreground"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div key={community.id} className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] border border-border/40">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{community.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{community.members}+</span>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{community.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Activity:</span>
                <div className="flex items-center">
                  {[1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= (community.activity === "Very Active" ? 3 : 2)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {community.activity}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {community.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {community.type === "discord" ? "Discord" : community.type === "facebook" ? "Facebook" : "YouTube"}
                  </span>
                  {getIcon(community.type)}
                </div>
                <a
                  href={community.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors"
                >
                  Join
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-primary-foreground text-center">
          <h3 className="text-2xl font-bold mb-4">Can't find your community?</h3>
          <p className="mb-6 text-primary-foreground/80 max-w-2xl mx-auto">
            Don't see a community that matches your interests? Start your own and connect with others who share your passion for anime and Japanese culture in Lithuania.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-3 bg-background text-foreground rounded-full hover:bg-background/90 transition-colors font-semibold text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}