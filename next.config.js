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
        source: '/consultation',
        destination: '/consult',
        permanent: true,
      },
      {
        source: '/consultation/',
        destination: '/consult',
        permanent: true,
      },
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
      // Cataract money-page consolidation → cost hub
      {
        source: '/post/cataract-surgery-cost-mumbai-lenses',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cataract-surgery-cost-mumbai-lenses/',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cataract-surgery-mumbai-guide',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cataract-surgery-mumbai-guide/',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cataract-surgery-mumbai',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cataract-surgery-mumbai/',
        destination: '/post/cataract-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/cataract-eye-surgery-mumbai',
        destination: '/cataract-surgery-mumbai',
        permanent: true,
      },
      {
        source: '/cataract-eye-surgery-mumbai/',
        destination: '/cataract-surgery-mumbai',
        permanent: true,
      },
      // LASIK cost near-dupes → cost hub
      {
        source: '/post/lasik-laser-eye-surgery-cost-in-india',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-laser-eye-surgery-cost-in-india/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/how-much-does-lasik-eye-surgery-cost-india',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/how-much-does-lasik-eye-surgery-cost-india/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-cost-in-mumbai-packages-emi-and-pricing-factors',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-cost-in-mumbai-packages-emi-and-pricing-factors/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cost-of-lasik-eye-surgery-mumbai-worth-it',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/cost-of-lasik-eye-surgery-mumbai-worth-it/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },

      // Additional LASIK cost near-dupes
      {
        source: '/post/lasik-eye-surgery-cost-mumbai',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-eye-surgery-cost-mumbai/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/how-much-does-lasik-cost-mumbai',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/how-much-does-lasik-cost-mumbai/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/laser-eye-surgery-mumbai-cost',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/laser-eye-surgery-mumbai-cost/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/what-is-lasik-eye-surgery-cost-india',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/what-is-lasik-eye-surgery-cost-india/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-surgery-cost-mumbai-reddit',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      {
        source: '/post/lasik-surgery-cost-mumbai-reddit/',
        destination: '/post/lasik-surgery-cost-mumbai',
        permanent: true,
      },
      // Dry eye / fruits near-dupes
      {
        source: '/post/dry-eye-therapy-mumbai',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/dry-eye-therapy-mumbai/',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/dry-eye-treatment-mumbai-guide',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/dry-eye-treatment-mumbai-guide/',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/dry-eye-disease-treatment-mumbai',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/dry-eye-disease-treatment-mumbai/',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/ipl-treatment-dry-eye-mumbai-guide',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/ipl-treatment-dry-eye-mumbai-guide/',
        destination: '/dry-eye-treatment-mumbai',
        permanent: true,
      },
      {
        source: '/post/which-fruits-good-for-eyesight',
        destination: '/post/best-fruits-for-eyes',
        permanent: true,
      },
      {
        source: '/post/which-fruits-good-for-eyesight/',
        destination: '/post/best-fruits-for-eyes',
        permanent: true,
      },
      {
        source: '/post/best-fruits-for-eyesight-improvement-natural-vision-boosters',
        destination: '/post/best-fruits-for-eyes',
        permanent: true,
      },
      {
        source: '/post/best-fruits-for-eyesight-improvement-natural-vision-boosters/',
        destination: '/post/best-fruits-for-eyes',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
