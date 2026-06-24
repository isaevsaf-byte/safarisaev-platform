/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cellar',
        destination: '/cellar/index.html',
      },
    ]
  },
}

module.exports = nextConfig

