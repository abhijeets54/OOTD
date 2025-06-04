/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' line to enable dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;