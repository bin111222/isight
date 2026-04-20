/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // HSTS only on Vercel so local `next dev` / `next start` is not pinned to HTTPS incorrectly.
    if (process.env.VERCEL !== "1") {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
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
      {
        source: '/eye-treatment-mumbai-international-patients',
        destination: '/post/eye-treatment-mumbai-international-patients',
        permanent: true,
      },
      {
        source: '/eye-treatment-mumbai-international-patients/',
        destination: '/post/eye-treatment-mumbai-international-patients',
        permanent: true,
      },
      {
        source: '/lasik-eye-surgery-mumbai',
        destination: '/lasik-surgery-mumbai',
        permanent: true,
      },
      {
        source: '/lasik-eye-surgery-mumbai/',
        destination: '/lasik-surgery-mumbai',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
