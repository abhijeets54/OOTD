/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' line to enable dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  env: {
    HF_API_TOKEN: "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",
  },
};

module.exports = nextConfig;