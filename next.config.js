/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    domains: [
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'loremflickr.com',
      'picsum.photos',
    ],
  },
}

module.exports = nextConfig
