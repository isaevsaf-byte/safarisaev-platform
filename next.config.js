/** @type {import('next').NextConfig} */

// Only HSTS was set (by the host). These are the low-risk headers that don't need
// per-page tuning. A Content-Security-Policy is the next step but has to be written
// against the inline JSON-LD / theme script and Google Fonts, so it is deliberately
// left out here rather than shipped half-configured.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig = {
  poweredByHeader: false,
  // The portfolio, case studies and service pages moved under /[lang]/ so their
  // Russian versions have real, indexable addresses. These keep every previously
  // published URL working and pass the signal to the English version.
  async redirects() {
    return [
      { source: '/portfolio', destination: '/en/portfolio', permanent: true },
      { source: '/portfolio/:slug', destination: '/en/portfolio/:slug', permanent: true },
      { source: '/protocols', destination: '/en/protocols', permanent: true },
      { source: '/resources', destination: '/en/resources', permanent: true },
      { source: '/intelligence', destination: '/en/intelligence', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
