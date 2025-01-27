import React from 'react';
import { Helmet } from '@modern-js/runtime/head';

const DiscordPage = () => {
  return (
    <div>
      <Helmet>
        <title>Discord</title>
        <meta
          http-equiv="refresh"
          content="0; url=https://discord.gg/pSxWRVayEu"
        ></meta>
      </Helmet>
      <p>Redirecting to Discord...</p>
    </div>
  );
};

export default DiscordPage;
