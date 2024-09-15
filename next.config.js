/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "export",
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.dribbble.com", "images.unsplash.com",],
  },
};

module.exports = nextConfig;
