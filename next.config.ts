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
};

export default nextConfig;
