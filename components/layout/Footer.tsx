'use client';

import Link from 'next/link';
import { Mail, Facebook, Youtube, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { isRouteVisible } from '@/config/routes';

// Discord icon component
const DiscordIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.078-.01c3.928 1.8 8.18 1.8 12.062 0a.074.074 0 01.079.01c.12.098.246.192.373.292a.077.077 0 01-.008.128 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.104c.36.698.772 1.362 1.225 1.993a.076.076 0 00.085.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.95-2.42 2.158-2.42 1.21 0 2.175 1.09 2.157 2.42 0 1.334-.95 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.951-2.42 2.157-2.42 1.207 0 2.175 1.09 2.157 2.42 0 1.334-.95 2.42-2.157 2.42z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/otaku_lt.png"
                    alt="Otaku.lt Logo"
                    width={64}
                    height={64}
                    className="w-16 h-16 dark:invert"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  otaku.lt
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Lithuania's premier hub for otaku culture, bringing together anime fans, cosplayers, and Japanese pop culture enthusiasts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-pink-400 flex items-center gap-2">🏠 Home</Link></li>
              <li><Link href="/events" className="hover:text-pink-400 flex items-center gap-2">🎌 Event Calendar</Link></li>
              <li><Link href="/communities" className="hover:text-pink-400 flex items-center gap-2">👥 Communities</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Otaku.lt Events</h4>
            <ul className="space-y-2 text-gray-400">
              {isRouteVisible('/idol-stage') && (
                <li><Link href="/idol-stage" className="hover:text-pink-400 flex items-center gap-2">🎤 Idol Stage</Link></li>
              )}
              <li><Link href="/yurucamp" className="hover:text-pink-400 flex items-center gap-2">⛺ YuruCamp</Link></li>
              <li><Link href="/korniha-band" className="hover:text-pink-400 flex items-center gap-2">🎸 Korniha Band</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-pink-400 flex items-center gap-2"><Mail size={16} className="text-white" />Contact Us</Link></li>
              <li><a href="https://discord.gg/ZRjhsM6knJ" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2"><DiscordIcon size={16} className="text-white" />Discord</a></li>
              <li><a href="https://www.facebook.com/otakultu" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2"><Facebook size={16} className="text-white" />Facebook</a></li>
              <li><a href="https://www.instagram.com/y.m.c.a.lt/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>Instagram</a></li>
              <li><a href="#" className="hover:text-pink-400 flex items-center gap-2"><Youtube size={16} className="text-white" />YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 space-y-2">
          <p>&copy; 2025 Otaku.lt. Made with 💖 for Lithuania's otaku community.</p>
          <p className="text-sm">
            All artworks are copyrighted and belong to{' '}
            <a 
              href="https://instagram.com/king_fisher_arts" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-400 underline"
            >
              @king_fisher_arts
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
