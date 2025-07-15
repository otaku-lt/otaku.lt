/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Handle API routes in static export
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/korniha-band': { page: '/korniha-band' },
      // Add other static pages here
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
