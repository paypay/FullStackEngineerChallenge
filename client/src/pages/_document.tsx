import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { DEFAULT_LOCALE } from "../constants";

interface Props extends DocumentProps {
  lang: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: ctx.query.locale || DEFAULT_LOCALE };
  }

  render() {
    const { lang } = this.props;

    return (
      <Html lang={lang}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          {/* Script to generate icons based on the manifest */}
          <script
            async
            src="https://unpkg.com/pwacompat"
            crossOrigin="anonymous"
          />
          {/* It's recommended adding at least one high-quality shortcut icon, for search indexing */}
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/images/icons/icon-128x128.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
