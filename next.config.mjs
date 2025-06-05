const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure compatibility with Next.js 14.2.26
  experimental: {
    // Remove any Next.js 15 specific experimental features
  },
}

export default nextConfig
