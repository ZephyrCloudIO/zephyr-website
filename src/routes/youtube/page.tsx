import { Helmet } from '@modern-js/runtime/head';

const YoutubePage = () => {
  return (
    <div>
      <Helmet>
        <title>Zephyr Cloud YouTube</title>
        <meta
          httpEquiv="refresh"
          content="0; url=https://www.youtube.com/@ZephyrCloud"
        />
      </Helmet>
      <p>Redirecting to YouTube...</p>
    </div>
  );
};

export default YoutubePage;
