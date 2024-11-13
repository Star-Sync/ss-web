/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            // App pages
            { source: '/dashboard', destination: '/app/dashboard' },
            { source: '/settings', destination: '/app/settings' },

            // Web pages
            { source: '/', destination: '/web/' },
            { source: '/blog', destination: '/web/blog' },
            { source: '/articles', destination: '/web/articles' },
            { source: '/cta', destination: '/web/cta' },
            { source: '/feature', destination: '/web/feature' },
            { source: '/brand', destination: '/web/brand' },
            { source: '/possibility', destination: '/web/possibility' },
        ];
    },
};

export default nextConfig;
