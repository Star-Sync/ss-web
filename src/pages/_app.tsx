import React from 'react';
import { AppProps } from 'next/app';
import AppLayout from '../components/app/AppLayout';

// Styles
import '../styles/globals.css';
import '../styles/web/navbar.css';
import '../styles/web/brand.css';
import '../styles/web/cta.css';
import '../styles/web/footer.css';
import '../styles/web/header.css';
import '../styles/web/possibility.css';
import '../styles/web/feature.css';
import '../styles/web/blog.css';
import '../styles/web/whatscheduler.css';
import '../styles/web/app.css';
import '../styles/web/index.css';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
);
}
export default MyApp;
