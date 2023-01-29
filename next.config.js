/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_RAPID_API_KEY: process.env.NEXT_PUBLIC_RAPID_API_KEY,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_RAPID_API_KEY: process.env.NEXT_PUBLIC_RAPID_API_KEY,
  },
};

module.exports = nextConfig;
