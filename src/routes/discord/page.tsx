import { Helmet } from '@modern-js/runtime/head';

const DiscordPage = () => {
  return (
    <div>
      <Helmet>
        <title>Discord</title>
        <meta
          httpEquiv="refresh"
          content="0; url=https://discord.gg/pSxWRVayEu"
        ></meta>
      </Helmet>
      <p>Redirecting to Discord...</p>
    </div>
  );
};

export default DiscordPage;
