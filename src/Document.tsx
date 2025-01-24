import React, { useContext } from 'react';
import {
  Html,
  Root,
  Head,
  Body,
  Comment,
  DocumentContext,
} from '@modern-js/runtime/document';

export default function Document(): React.ReactElement {
  const {
    config: { output: htmlConfig },
    entryName,
    templateParams,
  } = useContext(DocumentContext);

  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
