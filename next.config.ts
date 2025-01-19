import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**", // Adjust if you need to be more specific
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**", // Adjust if you need to be more specific
      },
    ],
  },
};

export default nextConfig;
