import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      // Google 用戶頭像域名
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      // GitHub 用戶頭像域名
      'avatars.githubusercontent.com',
      // 其他可能的認證提供商域名
      'platform-lookaside.fbsbx.com', // Facebook
      'pbs.twimg.com', // Twitter
    ],
  },
};

export default nextConfig;
