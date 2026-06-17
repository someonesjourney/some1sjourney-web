import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dooth0ops/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/app",
        destination: "/app/index.html",
      },
      {
        source: "/app/:path*",
        destination: "/app/index.html",
      },
    ];
  },
};

export default nextConfig;
