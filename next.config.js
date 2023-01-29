/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_KEY_Backup: process.env.RAPID_API_KEY_Backup,
  },
};

module.exports = nextConfig;
