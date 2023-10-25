/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:1337/api/:path*', // Proxy to Backend
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:1337/uploads/:path*', // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
