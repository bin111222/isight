/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/**' },
      { protocol: 'https', hostname: 'scontent-den2-1.cdninstagram.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ik.imagekit.io', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/pediatric-eye-care',
        destination: '/pediatric-eye-care-mumbai',
        permanent: true,
      },
      {
        source: '/pediatric-eye-care/',
        destination: '/pediatric-eye-care-mumbai',
        permanent: true,
      },
      {
        source: '/isighteyecare-doctors',
        destination: '/isight-eye-care-doctors',
        permanent: true,
      },
      {
        source: '/isighteyecare-doctors/',
        destination: '/isight-eye-care-doctors',
        permanent: true,
      },
      {
        source: '/retinalsurgerymumbai',
        destination: '/retinal-surgery-mumbai',
        permanent: true,
      },
      {
        source: '/retinalsurgerymumbai/',
        destination: '/retinal-surgery-mumbai',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
