import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Each brand compiles to its own directory. NEXT_PUBLIC_* values are inlined
  // at compile time, so a shared .next lets one brand's cached modules be
  // served alongside another's — which surfaces as a hydration mismatch
  // (server renders one brand, client renders the other).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "first-of-all-media.s3.eu-west-3.amazonaws.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
