import React, { useCallback, useEffect, useState } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { GlobalStyles } from 'global-styles';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'global-styles/defaultTheme';
import Head from 'next/head';
import { destroyCookie, parseCookies } from 'nookies';
import { APP_COOKIES, EmployeeNoPasswordType } from 'api/withAuth';
import { useRouter } from 'next/router';
import { Button } from 'components';

const PageWrap = styled.div<{ noNav?: boolean }>`
  width: 100%;
  max-width: 920px;
  padding-top: ${(p) => (p.noNav ? '0' : '64px')};
  margin: 0 auto;
  height: 100%;
`;

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  h3 {
    margin: 0;
  }
  section {
    display: flex;
    align-items: center;
    button {
      margin-left: 16px;
    }
  }
`;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [sessData, setSess] = useState<EmployeeNoPasswordType | null>(null);

  const session = parseCookies()[APP_COOKIES['APP_SESSION']] || null;

  const handleLogout = useCallback(() => {
    destroyCookie(null, APP_COOKIES['APP_SESSION']);
    destroyCookie(null, APP_COOKIES['APP_DESTINATION'], {
      path: '/',
      maxAge: 480
    });

    router.push('/');
  }, []);

  useEffect(() => {
    if (session) {
      const e = JSON.parse(session);
      setSess(e);
    } else {
      setSess(null);
    }
  }, [session]);

  // passing to all component childrens
  const mergedPageProps = {
    session: sessData,
    ...pageProps
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AnimateSharedLayout>
        <GlobalStyles />
        {router.pathname !== '/' && (
          <Nav initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section className="left-section">
              <h3>Human Resource</h3>
            </section>
            <section className="right-section">
              {sessData?.name}
              <Button onClick={() => handleLogout()}>Logout</Button>
            </section>
          </Nav>
        )}
        <PageWrap>
          <Component {...mergedPageProps} />
        </PageWrap>
      </AnimateSharedLayout>
    </ThemeProvider>
  );
}

export default App;
