/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ["src"],
  },

  reactStrictMode: true,

  // add domain whitelist
  images: {
    domains: [
      "img.freepik.com",
      "www.google.com",
      "bitcoin.org",
      "images.unsplash.com",
      "afyogsdrobmrjhqrhlsr.supabase.co",
    ],
  },

  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
