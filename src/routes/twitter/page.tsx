import { Helmet } from '@modern-js/runtime/head';

export default function TwitterPage() {
  return (
    <div>
      <Helmet>
        <title>Twitter</title>
        <meta
          httpEquiv="refresh"
          content="0; url=https://x.com/ZephyrCloudIO"
        />
      </Helmet>
    </div>
  );
}
