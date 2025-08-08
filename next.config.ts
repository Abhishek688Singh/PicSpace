import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN: This will ignore type errors during build
    ignoreBuildErrors: true,
  },
};



export default nextConfig;
