import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // --- temporary increase body size limit for server actions ---
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // ------------------------------------------------------------------
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
