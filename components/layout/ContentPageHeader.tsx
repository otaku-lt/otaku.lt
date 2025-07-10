'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface ContentPageHeaderProps {
  title: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

export function ContentPageHeader({
  title,
  showBackButton = true,
  backHref = '/',
  backText = 'Back to Home',
}: ContentPageHeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link 
              href={backHref} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              {backText}
            </Link>
          )}
          <div className="flex items-center gap-3">
            <Image 
              src="/otaku_lt.png" 
              alt="Otaku.lt Logo" 
              width={40}
              height={40}
              className="w-10 h-10 dark:invert"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
