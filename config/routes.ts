// Environment variables are accessed directly from process.env in Next.js

type RouteConfig = {
  path: string;
  label: string;
  isProtected?: boolean; // If true, will be hidden in production
  isEnabled?: boolean; // If false, will be hidden everywhere
};

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Home',
    isEnabled: true,
  },
  {
    path: '/idol-stage',
    label: 'Idol Stage',
    isProtected: true, // Will be hidden in production
    isEnabled: true,
  },
  {
    path: '/korniha-band',
    label: 'Korniha Band',
    isEnabled: true,
  },
  {
    path: '/yurucamp',
    label: 'YuruCamp',
    isProtected: true, // Hidden in production
    isEnabled: true,
  },
  {
    path: '/events',
    label: 'Event Calendar',
    isEnabled: true,
  },
  // Add more routes here as needed
];

// Filter routes based on environment and enabled status
export const getVisibleRoutes = () => {
  return routes.filter(route => {
    // If route is disabled, hide it
    if (route.isEnabled === false) return false;
    
    // If in production and route is protected, hide it
    if (process.env.NODE_ENV === 'production' && route.isProtected) {
      return false;
    }
    
    return true;
  });
};

// Helper function to check if a route is visible
export const isRouteVisible = (path: string): boolean => {
  return getVisibleRoutes().some(route => route.path === path);
};
