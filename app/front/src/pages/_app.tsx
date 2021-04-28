import React from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AnimateSharedLayout } from 'framer-motion';
import { GlobalStyles } from 'global-styles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'global-styles/defaultTheme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AnimateSharedLayout>
        <GlobalStyles />
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ThemeProvider>
  );
}

export default App;
