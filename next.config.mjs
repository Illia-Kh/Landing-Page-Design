/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig