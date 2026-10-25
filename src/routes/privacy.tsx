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

        <h2 className={h2}>Connected assistants and site publishing</h2>
        <p className={p}>
          When you connect Zephyr to an assistant such as ChatGPT or Codex, we process your Zephyr account identifier,
          available profile details such as name and email, organization memberships, and authorization credentials to
          authenticate you and check which resources you can access. We save your selected organization, project,
          application, and environment so later requests can use the same site configuration. When you request an
          organization default, we also store that preference for your account or with an identifier used to associate
          it with a particular chat or project. You can ask the connected assistant to clear a saved default.
        </p>
        <p className={p}>
          When you request a deployment, we receive the file or bundle provided to the publishing tool, including its
          contents, filenames, and download reference. We process those files to validate and host the site, and retain
          build identifiers, file hashes, deployment results, and environment selections to support build history,
          retries, and rollbacks. We also process operational logs to run and troubleshoot the service.
        </p>
        <h2 className={h2}>How publishing information is shared</h2>
        <p className={p}>
          We return requested organization, build, environment, and deployment information to the connected assistant.
          Our infrastructure providers, including Cloudflare for the plugin’s built-in hosting, process information
          needed to authenticate requests, store configuration, and serve deployments. The assistant provider handles
          information it receives under its own privacy policy.
        </p>
        <p className={p}>
          Files published through the plugin are accessible at public deployment URLs. Changing the build served by an
          environment does not delete older builds or their individual URLs. Do not include secrets or information you
          intend to keep private in a public deployment.
        </p>
        <h2 className={h2}>Retention and your choices</h2>
        <p className={p}>
          Hosted builds and saved site configuration persist beyond an individual assistant session. Disconnecting the
          plugin does not itself delete those records or take a site offline. Contact{' '}
          <a href="/support" className="text-ink underline underline-offset-4">
            support
          </a>{' '}
          for help revoking access, obtaining your information, deleting hosted content or saved configuration, or
          closing an account. Applicable agreements, security needs, and legal obligations may affect what we can delete
          and when.
        </p>
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

      <p className="m-0 mt-14 border-t border-line pt-6 text-sm text-ink-faint">Last updated: October 1, 2026.</p>
    </article>
  );
}
