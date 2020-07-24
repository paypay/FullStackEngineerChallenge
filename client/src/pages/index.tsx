import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";

import { getLocale } from "../helpers/getLocale";

const Index = () => {
  const { replace } = useRouter();

  useEffect(() => {
    //When no language is passed on the url, redirect to valid one
    replace(`/${getLocale()}/login/`);
  });

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Index;
