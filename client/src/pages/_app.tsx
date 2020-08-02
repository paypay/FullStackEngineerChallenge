import "../styles/global.scss";

import { ApolloProvider } from "@apollo/react-hooks";
import { i18n } from "@lingui/core";
import { I18nProvider, useLingui } from "@lingui/react";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React, { FC, Fragment, useEffect } from "react";
import { UIDReset } from "react-uid";

import { AuthProvider } from "../contexts/AuthContext";
import { useApollo } from "../graphql/setupApollo";
import { getLocale } from "../helpers/getLocale";
import { activate } from "../helpers/i18n";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    activate(getLocale());
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <UIDReset>
        <SnackbarProvider maxSnack={1}>
          <AuthProvider>
            <I18nProvider i18n={i18n}>
              <I18nWatchLocale>
                <Component {...pageProps} />
              </I18nWatchLocale>
            </I18nProvider>
          </AuthProvider>
        </SnackbarProvider>
      </UIDReset>
    </ApolloProvider>
  );
};

const I18nWatchLocale: FC = ({ children }) => {
  const { i18n } = useLingui();

  // Skip render when locale isn't loaded
  if (!i18n.locale) return null;

  // Force re-render when locale changes. Otherwise string translations (e.g.
  // t`Macro`) won't be updated.
  return <Fragment key={i18n.locale}>{children}</Fragment>;
};

export default App;
