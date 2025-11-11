const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "cdn.example.com",
      "res.cloudinary.com",
      "example.com",
      "perks-marketplace-backend.vercel.app", // Add backend domain for images
    ],
  },
  // Environment variables accessible in the browser
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://perks-marketplace-backend.vercel.app",
    NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Rewrites only work for same domain, not for cross-origin requests
  // Since backend is on different Vercel deployment, we'll handle API calls directly
  async rewrites() {
    // Only use rewrites in local development if you have local backend
    if (process.env.NODE_ENV === "development" && process.env.LOCAL_BACKEND) {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:3001/api/:path*", // Local backend
        },
      ];
    }
    return [];
  },
  // CORS headers - these only apply to routes served by this Next.js app
  // Your backend needs to handle CORS for cross-origin requests
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
