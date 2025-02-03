import { Helmet } from '@modern-js/runtime/head';

export default function LinkedinPage() {
  return (
    <div>
      <Helmet>
        <title>Twitter</title>
        <meta
          httpEquiv="refresh"
          content="0; url=https://www.linkedin.com/company/zephyr-cloud"
        />
      </Helmet>
    </div>
  );
}
