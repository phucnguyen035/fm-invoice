/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	experimental: {
		typedRoutes: true,
	},
}

module.exports = nextConfig
