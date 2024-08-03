/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com','static.ipms247.com']
    }
}

module.exports = nextConfig

// next.config.js

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/booking',
          destination: 'https://live.ipms247.com/booking/reservation_api/listing.php',
        },        
      ];
    },
  };

    