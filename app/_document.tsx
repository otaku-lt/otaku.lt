import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          {/* Preload critical CSS */}
          <link
            rel="preload"
            href="/_next/static/css/4d354ec73cf6d042.css"
            as="style"
          />
          {/* Preload critical font */}
          <link
            rel="preload"
            href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
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
