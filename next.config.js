/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable trailing slashes for cleaner URLs
  trailingSlash: false,
}

module.exports = nextConfig
