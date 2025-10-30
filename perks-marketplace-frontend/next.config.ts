const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["cdn.example.com", "res.cloudinary.com", "example.com"], // Whitelist image domains
  },
  // Environment variables accessible in the browser
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  async rewrites() {
    return [
      // Rewrite /api requests to the backend (Next.js API route)
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
