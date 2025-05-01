/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'truth.bahamut.com.tw',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig; 