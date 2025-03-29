/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
      return [
        // App pages
        { source: '/dashboard', destination: '/app/dashboard' },
        { source: '/settings', destination: '/app/settings' },
        { source: '/calendar', destination: '/app/calendar' },
        { source: '/ground-station', destination: '/app/ground' },
        { source: '/satellite', destination: '/app/satellite' },
        

        // Web pages
        { source: '/', destination: '/web/' },
        { source: '/blog', destination: '/web/blog' },
        { source: '/articles', destination: '/web/articles' },
        { source: '/cta', destination: '/web/cta' },
        { source: '/feature', destination: '/web/feature' },
        { source: '/brand', destination: '/web/brand' },
        { source: '/possibility', destination: '/web/possibility' },
        { source: '/signin', destination: '/web/signin' },
        { source: '/signup', destination: '/web/signup' },

        // API Proxy to Backend
        { source: '/api/:path*', destination: process.env.NEXT_PUBLIC_API_URL+'/api/:path*' }
      ];
    },

    async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
              { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Accept' },
            ],
          },
        ]
      }

  };

  export default nextConfig;
