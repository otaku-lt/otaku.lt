/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure API routes are not included in static export
  skipTrailingSlashRedirect: true,
  // Enable experimental features if needed
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Generate static pages for all routes
  generateStaticParams: async function() {
    return {
      // This will be handled by the App Router's generateStaticParams
    };
  },
};

module.exports = nextConfig;
