import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
