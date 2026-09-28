import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy,
});

const h2 = 'text-title mt-14 mb-4 text-ink';
const p = 'm-0 mt-5 leading-relaxed text-ink-muted';

function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-20 pb-24 sm:px-8 lg:pt-28 lg:pb-32">
      <header>
        <p className="mb-6 text-sm text-ink-faint">Legal</p>
        <h1 className="text-display m-0 text-ink">Privacy policy</h1>
        <p className="text-lead mt-7 mb-0 text-ink-muted">
          This Privacy Notice describes how Zephyr (&ldquo;our,&rdquo; &ldquo;we&rdquo;) collects, uses, and shares
          personal information.
        </p>
      </header>

      <div className="mt-12 border-t border-line pt-7">
        <p className={p}>In particular, this Privacy Notice applies to:</p>
        <ul className="m-0 mt-5 list-none space-y-4 border-l border-line-strong p-0 pl-5">
          <li className="leading-relaxed text-ink-muted">
            Our website at Zephyr-Cloud.io as available to the general public, and any of our subdomains of
            zephyr-cloud.io (our &ldquo;Website&rdquo;). This Privacy Notice applies to visitors to our Website
            (&ldquo;Visitors&rdquo;).
          </li>
          <li className="leading-relaxed text-ink-muted">
            Our other online services we operate that post this Notice (&ldquo;Services&rdquo;). As a central part of
            our Services, we enable our customers and their employees (&ldquo;Customers&rdquo;) to track, observe and
            more effectively utilize software code and other developed components and content across their websites and
            online services. Through our Services, we may interact with our Customers&rsquo; online visitors to their
            websites and online services (&ldquo;Customers&rsquo; Audience&rdquo;).
          </li>
        </ul>

        <h2 className={h2}>Information we collect</h2>
        <p className={p}>
          To provide our Website and Services, we may collect data by which Visitors, Customers, and members of our
          Customers&rsquo; Audience may be identified. We may also collect information about the devices and equipment
          you use to access our Website and Services, including usage data.
        </p>

        <h2 className={h2}>How we collect information</h2>
        <p className={p}>We collect this information from a variety of sources, including:</p>
        <ul className="m-0 mt-4 list-disc space-y-2 pl-5 text-ink-muted marker:text-ink-faint">
          <li className="leading-relaxed">Directly from you when you provide it to us.</li>
          <li className="leading-relaxed">Indirectly through our provision of Services to our Customers.</li>
          <li className="leading-relaxed">Automatically as you utilize the Website or Services.</li>
          <li className="leading-relaxed">
            With respect to our Website, from third parties, including analytics providers.
          </li>
        </ul>

        <h2 className={h2}>Contact information</h2>
        <p className={p}>
          If you have any questions or concern about this privacy notice or the privacy practices at Zephyr, please
          contact us by emailing us at{' '}
          <a
            href="mailto:support@zephyr-cloud.io"
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-muted"
          >
            support@zephyr-cloud.io
          </a>
          .
        </p>
      </div>

      <p className="m-0 mt-14 border-t border-line pt-6 text-sm text-ink-faint">Last updated: 4/16/2024</p>
    </article>
  );
}
