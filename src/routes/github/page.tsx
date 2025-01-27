import React from 'react';
import { Helmet } from '@modern-js/runtime/head';

export default function GithubPage() {
  return (
    <div>
      <Helmet>
        <title>Github</title>
        <meta
          http-equiv="refresh"
          content="0; url=https://github.com/ZephyrCloudIO"
        ></meta>
      </Helmet>
    </div>
  );
}
