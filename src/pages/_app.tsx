import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
