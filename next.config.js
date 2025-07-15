/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Handle API routes in static export
  exportPathMap: async function() {
    return {
      // Main pages
      '/': { page: '/' },
      '/communities': { page: '/communities' },
      '/contact': { page: '/contact' },
      '/events': { page: '/events' },
      '/idol-stage': { page: '/idol-stage' },
      '/korniha-band': { page: '/korniha-band' },
      '/submit': { page: '/submit' },
      '/yurucamp': { page: '/yurucamp' },
      // API routes will be handled by the serverless functions
    };
  },
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure API routes are not included in static export
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  experimental: {
    // Enable server actions
    serverActions: true,
  },
};

module.exports = nextConfig;
