'use client';

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User, LogIn, LogOut, ArrowLeft } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getVisibleRoutes } from '@/config/routes';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  actions?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, actions }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navLinks = getVisibleRoutes().map(route => {
    let icon = <span className="inline-flex items-center justify-center w-4 h-4">🔗</span>;
    
    if (route.path === '/') {
      icon = <span className="inline-flex items-center justify-center w-4 h-4">🏠</span>;
    } else if (route.path === '/events' || route.path.startsWith('/events/')) {
      icon = <span className="inline-flex items-center justify-center w-4 h-4">📅</span>;
    } else if (route.path === '/submit') {
      icon = <span className="inline-flex items-center justify-center w-4 h-4">➕</span>;
    }
    
    return {
      name: route.label,
      href: route.path,
      icon: icon,
    };
  });

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#1e1e1e]/95 backdrop-blur-md border-b border-border/30 shadow-lg" 
          : "bg-[#1e1e1e]/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground/80 hover:text-foreground"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
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
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {title || 'otaku.lt'}
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                             (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-foreground/10 text-foreground shadow-sm border border-foreground/10'
                      : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground/90'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {actions && (
              <div className="hidden md:block">
                {actions}
              </div>
            )}
            
            <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground/20 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        } bg-[#1e1e1e] backdrop-blur-lg border-t border-foreground/10`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 border-t border-border/50">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.name}`}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href
                  ? "text-foreground bg-foreground/10"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <span className="mr-3 text-foreground/80">{React.cloneElement(link.icon, { className: 'w-4 h-4' })}</span>
              {link.name}
            </Link>
          ))}
          {/* Additional mobile-only links can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
