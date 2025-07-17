/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Only use 'export' in production
  ...(isProd ? { output: 'export' } : {}),
  
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
  
  // Only include rewrites in development
  ...(!isProd ? {
    async rewrites() {
      return [
        // Handle korniha.otaku.lt -> otaku.lt/korniha-band
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'korniha.otaku.lt',
            },
          ],
          destination: '/korniha-band/:path*',
        },
        // Handle yurucamp.otaku.lt -> otaku.lt/yurucamp
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'yurucamp.otaku.lt',
            },
          ],
          destination: '/yurucamp/:path*',
        },
      ];
    },
  } : {}),
};

// For production, we'll use Cloudflare Pages Functions for routing
if (isProd) {
  nextConfig.assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  nextConfig.basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
}

module.exports = nextConfig;
