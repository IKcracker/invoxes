import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind is compiled once by postcss.config.mjs in both development
  // and production. Leave CSS Modules to Next.js's built-in CSS pipeline.
};

export default nextConfig;
