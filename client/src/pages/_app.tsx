import "../styles/global.scss";

import { AppProps } from "next/app";
import React, { FC } from "react";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
