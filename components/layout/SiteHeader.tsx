'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Calendar, LogIn } from 'lucide-react';

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Event Calendar", href: "/events", icon: <Calendar className="w-5 h-5" /> },
    ...(process.env.NODE_ENV !== 'production' ? [
      { name: "Submit Event", href: "/submit", icon: <LogIn className="w-5 h-5" /> }
    ] : []),
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-card/90 backdrop-blur-md border-b border-border/50 shadow-lg" 
        : "bg-card/80 backdrop-blur-sm border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/otaku_lt.png"
                  alt="Otaku.lt Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 dark:invert"
                  priority
                />
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  otaku.lt
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                  pathname === link.href
                    ? "text-white bg-pink-600/90"
                    : "text-gray-200 hover:text-white hover:bg-pink-500/20"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
