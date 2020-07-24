import "../styles/global.scss";

import { I18nProvider } from "@lingui/react";
import { AppProps } from "next/app";
import React, { FC } from "react";

import { useApollo } from "../graphql/setupApollo";
import { getLocale } from "../helpers/getLocale";
import * as catalogs from "../locales";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <I18nProvider language={getLocale()} catalogs={catalogs}>
      <Component {...pageProps} />
    </I18nProvider>
  );
};

export default App;
