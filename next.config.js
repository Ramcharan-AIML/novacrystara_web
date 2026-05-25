/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack caching in development to permanently prevent styles from corrupting
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
