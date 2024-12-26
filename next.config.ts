// next.config.js
module.exports = {
  output: 'export', // Enables static export mode
  experimental: {
    turbo: true, // Enable Turbopack
    // ignoreDuringBuilds: true,
    // ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

