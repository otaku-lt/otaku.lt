'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getVisibleRoutes } from '@/config/routes';

export function Navigation() {
  const pathname = usePathname();
  const visibleRoutes = getVisibleRoutes();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {visibleRoutes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === route.path ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
