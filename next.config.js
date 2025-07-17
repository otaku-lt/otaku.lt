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
  // Handle subdomain rewrites
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
};

module.exports = nextConfig;
