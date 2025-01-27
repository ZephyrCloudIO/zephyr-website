import React from 'react';
import { Html, Root, Head, Body } from '@modern-js/runtime/document';

const GoogleAnalytics = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=G-B7G266JZDH`}
    />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B7G266JZDH');
      `,
      }}
    />
  </>
);

export default function Document(): React.ReactElement {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <GoogleAnalytics />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <meta name="theme-color" content="#000000" />

        {/* Primary Meta Tags */}
        <title>Zephyr Cloud | The only sane way to do micro-frontends</title>
        <meta
          name="description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Zephyr Cloud | The only sane way to do micro-frontends"
        />
        <meta
          property="og:description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />
        <meta
          property="og:image"
          content="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66981c766e352fe1f57191e2_Opengraph-zephyr.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta
          property="twitter:title"
          content="Zephyr Cloud | The only sane way to do micro-frontends"
        />
        <meta
          property="twitter:description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />
        <meta
          property="twitter:image"
          content="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66981c766e352fe1f57191e2_Opengraph-zephyr.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
