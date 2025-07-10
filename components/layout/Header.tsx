'use client';

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Calendar, User, Home, LogIn, LogOut, ArrowLeft, Plus } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

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

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Events", href: "/events", icon: <Calendar className="w-5 h-5" /> },
    { 
      name: "Submit Event", 
      href: "/submit", 
      icon: <span className="flex items-center gap-1">
              Submit Event <Plus className="w-4 h-4 ml-1" />
            </span>
    },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-card/90 backdrop-blur-md border-b border-border/50 shadow-lg" 
          : "bg-card/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            )}
            
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src="/otaku_lt.png" 
                  alt="Otaku.lt Logo" 
                  className="w-8 h-8 group-hover:scale-105 transition-transform dark:invert"
                />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {title || 'otaku.lt'}
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
                    ? "text-foreground bg-accent/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
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
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
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
        className={`md:hidden transition-all duration-300 ease-in-out bg-card/95 backdrop-blur-lg ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 border-t border-border/50">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.name}`}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href
                  ? "text-foreground bg-accent/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          {/* Additional mobile-only links */}
          <div className="pt-2 mt-2 border-t border-border/30">
            <Link
              href="/communities"
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
            >
              <span className="mr-3"><User className="w-5 h-5" /></span>
              Communities
            </Link>
            <a
              href="#"
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
            >
              <span className="mr-3"><LogIn className="w-5 h-5" /></span>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
