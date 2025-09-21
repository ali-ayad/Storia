/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // hides the bottom-right overlay
  },
    images: {
    domains: ["img.freepik.com"], // allow Freepik images
  },
}

module.exports = nextConfig
