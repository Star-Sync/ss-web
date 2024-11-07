import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import './App.css';
import './index.css';
import '../styles/globals.css';
import '../components/article/article.css';  // Add this import here for global styles like article.css
import '../components/brand/brand.css';
import '../components/cta/cta.css';
import '../components/feature/feature.css';
import '../components/navbar/navbar.css';

import '../containers/blog/blog.css';
import '../containers/features/features.css';
import '../containers/footer/footer.css';
import '../containers/header/header.css';
import '../containers/possibility/possibility.css';
import '../containers/whatScheduler/whatScheduler.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
);
}

export default MyApp;