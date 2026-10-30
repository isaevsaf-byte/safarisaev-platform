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
  // The portfolio and case studies moved under /[lang]/ so their
  // Russian versions have real, indexable addresses. These keep every previously
  // published URL working and pass the signal to the English version.
  async redirects() {
    return [
      { source: '/portfolio', destination: '/en/portfolio', permanent: true },
      { source: '/portfolio/:slug', destination: '/en/portfolio/:slug', permanent: true },
      // These pages no longer exist. Old links land on the home page.
      { source: '/:lang(en|ru)/offer/:path*', destination: '/', permanent: true },
      { source: '/:lang(en|ru)/protocols', destination: '/', permanent: true },
      { source: '/:lang(en|ru)/resources', destination: '/', permanent: true },
      { source: '/:lang(en|ru)/intelligence', destination: '/', permanent: true },
      { source: '/offer/:path*', destination: '/', permanent: true },
      { source: '/protocols', destination: '/', permanent: true },
      { source: '/resources', destination: '/', permanent: true },
      { source: '/intelligence', destination: '/', permanent: true },
      { source: '/ai-velocity-index', destination: '/en/ai-velocity-index', permanent: true },
      // /en and /ru on their own are not pages: the home page keeps the clean root.
      // They used to be prerendered pages that called redirect(), and a static build
      // turns that into a 307 with no Location header: "moved", without saying
      // where. Here they are real redirects. Temporary on purpose, so that giving
      // the Russian home page its own address later does not fight a cached 308.
      { source: '/en', destination: '/', permanent: false },
      { source: '/ru', destination: '/', permanent: false },
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
