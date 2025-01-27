import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/AppLayout'
import WebLayout from '@/components/layout/WebLayout';

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
import LayoutWrapper from "@/components/layout/LayoutWrapper";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
            <LayoutWrapper>
                <Component {...pageProps} />
            </LayoutWrapper>
    );
}

export default MyApp;
