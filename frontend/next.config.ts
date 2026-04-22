import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Evora Capital — premium hospitality investment */
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
