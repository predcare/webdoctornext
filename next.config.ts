import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devine11.dedicateddevelopers.us',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  devIndicators: {
    position: 'bottom-right',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_PROJECT_NAME: process.env.NEXT_APP_PROJECT_NAME,
    NEXT_APP_TOKEN_NAME: process.env.NEXT_APP_TOKEN_NAME,
    NEXT_APP_REFRESH_TOKEN_NAME: process.env.NEXT_APP_REFRESH_TOKEN_NAME,
    NEXT_APP_FRONTEND_URL: process.env.NEXT_APP_FRONTEND_URL,
    NEXT_PUBLIC_FILE_URL: process.env.NEXT_PUBLIC_FILE_URL,
  },
};

export default nextConfig;
