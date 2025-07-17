'use client';

import { Camera } from 'lucide-react';

export default function GallerySection() {
  return (
    <div className="space-y-6">
      {process.env.NODE_ENV === 'production' ? (
        <div className="bg-card-dark/80 backdrop-blur-sm rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground-dark">Gallery Coming Soon</h3>
          <p className="text-muted-foreground">Check back after the event to see photos from YuruCamp 2025!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="aspect-square bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-xl border border-border/50 hover:border-green-500/30"
            >
              <div className="text-center">
                <Camera size={48} className="text-green-400 mx-auto mb-2" />
                <p className="text-foreground font-semibold">Photo Gallery</p>
                <p className="text-muted-foreground text-sm">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
