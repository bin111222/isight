/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/**' },
      { protocol: 'https', hostname: 'scontent-den2-1.cdninstagram.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
