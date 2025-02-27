import { Body, Head, Html, Root } from '@modern-js/runtime/document';
import type React from 'react';
import { siteConfig } from './lib/site.config';

const GoogleAnalytics = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gtag_id}`}
    />
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        const id = '*_ze_id';

        function find_or_create_ze_id() {

const user_id = localStorage.getItem(id);

if (!user_id) {
  localStorage.setItem(id, Math.random().toString(36).substring(2, 15));
}

      }
        gtag('config', 'G-B7G266JZDH', {
        page_path: window.location.pathname,
            first_field_name: 'website',
            linker: {
              domains: ['app.zephyr-cloud.io', 'zephyr-cloud.io', 'docs.zephyr-cloud.io']
            }
        });
      gtag('set', 'linker', {
      accept_incoming: true,
    }

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
