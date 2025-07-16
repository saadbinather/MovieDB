/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "variety.com",
      "via.placeholder.com",
      "upload.wikimedia.org",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;
