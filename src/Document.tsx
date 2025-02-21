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
      </Head>
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
