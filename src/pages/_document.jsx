import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  let shortDescription = "A talk from Dr. Farzam Arbab about our contributions to the advancement of knowledge and civilization."
  let title = "The Intellectual Life of the Bahá’í Community - Farzam Arbab"

  return (
    <Html className="antialiased bg-white" lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <meta charSet="utf-8"></meta>
     
      {/* <link rel="icon" href="/rose.svg" /> */}
      <meta name="description" content={shortDescription}></meta>
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://farzam.ridvan.org/" />
      {/* <link rel="apple-touch-icon" href="/rose.svg"></link> */}
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <html dir="ltr" lang="en"></html>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://farzam.ridvan.org" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:image" content="/poster.jpg"></meta>
        <meta name="image" property="og:image" content="/poster.jpg" />
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630"></meta> */}

      <meta name="twitter:card" content={shortDescription} />
      {/* <meta name="twitter:site" content="@site_account" />
      <meta name="twitter:creator" content="@individual_account" /> */}
      <meta name="twitter:url" content="https://www.farzam.ridvan.org" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={shortDescription}
      />
      <script async defer data-domain="farzam.ridvan.org" src="https://stats.ridvan.org/js/plausible.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
