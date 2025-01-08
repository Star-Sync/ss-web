import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AppLayout from '@/components/app/AppLayout';
import WebLayout from '@/components/web/WebLayout';

// Global styles
import '@/styles/globals.css';
import "@/styles/app/timeline-overrides.css";

// Web styles
import '@/styles/web/navbar.css';
import '@/styles/web/brand.css';
import '@/styles/web/cta.css';
import '@/styles/web/footer.css';
import '@/styles/web/header.css';
import '@/styles/web/possibility.css';
import '@/styles/web/feature.css';
import '@/styles/web/blog.css';
import '@/styles/web/whatscheduler.css';
import '@/styles/web/app.css';
import '@/styles/web/index.css';
import '@/styles/web/article.css';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Check if the current page is under `app`
    const isAppPage = router.pathname.startsWith('/app');

    // Dynamically choose the layout
    const Layout = isAppPage ? AppLayout : WebLayout;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
