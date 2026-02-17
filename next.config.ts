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
        protocol: 'https',
        hostname: 'forensicinstitute.in', 
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'forensicinstitute.in', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;