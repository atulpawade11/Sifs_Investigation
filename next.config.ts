import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sifs.manageprojects.in',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'sifs.manageprojects.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
