/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gjhhdtbqqrjydpkyukht.supabase.co", // ✅ your Supabase domain
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com", // ✅ keep Freepik too
      },
    ],
  },
};

module.exports = nextConfig;
