import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <title>Nextjs Auth App</title>
      </Head>
      <ColorModeScript />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
