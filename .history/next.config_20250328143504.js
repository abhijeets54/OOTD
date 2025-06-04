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
  // LAST RESORT OPTION: You can hardcode your token below if .env.local isn't working
  huggingFaceApiToken: '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', // ← Replace with your token
  // huggingFaceApiToken: process.env.HF_API_TOKEN || '',
};

module.exports = nextConfig;