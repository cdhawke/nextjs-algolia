import '../styles/main.scss';
import '@algolia/autocomplete-theme-classic';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import Head from 'next/head';
import { SearchProvider } from '../contexts/search';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Hawkesearch" />
      </Head>
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </>
  );
}

export default MyApp;
