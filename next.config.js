/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/'
  }
}

module.exports = nextConfig
