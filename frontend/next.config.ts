import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Evora Capital — premium hospitality investment */
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    root: __dirname,
  },
  // Allow the Emergent preview hostnames so HMR / hydration works through the ingress.
  allowedDevOrigins: [
    "*.preview.emergentagent.com",
    "*.preview.emergentcf.cloud",
    "151db2b3-9cfa-464b-ba95-fff73aaf66fe.preview.emergentagent.com",
    "repositories-2.cluster-0.preview.emergentcf.cloud",
  ],
};

export default nextConfig;
