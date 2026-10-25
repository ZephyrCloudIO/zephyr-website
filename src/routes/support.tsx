import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/support')({ component: Support });
const link = 'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-muted';

function Support() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-20 pb-24 sm:px-8 lg:pt-28 lg:pb-32">
      <header>
        <p className="mb-6 text-sm text-ink-faint">Zephyr Cloud</p>
        <h1 className="text-display m-0 text-ink">Support</h1>
        <p className="text-lead mt-7 mb-0 text-ink-muted">
          Help with your account, deployments, and connected assistants.
        </p>
      </header>
      <div className="mt-12 space-y-12 border-t border-line pt-10 text-ink-muted">
        <section>
          <h2 className="text-title mb-4 text-ink">Accounts and organizations</h2>
          <p className="leading-relaxed">
            Sign in or create an account at{' '}
            <a href="https://app.zephyr-cloud.io/" className={link}>
              the Zephyr dashboard
            </a>
            . Use your existing Zephyr account when connecting ChatGPT or Codex. If you belong to several organizations,
            choose which one owns the site before publishing. The plugin remembers that choice for subsequent builds of
            the same site. Ask it to remember an organization for this chat, project, or account to reuse that choice
            for new sites. If you say “remember” without a scope, it saves the choice for this chat. Existing sites keep
            their organization.
          </p>
          <p className="mt-4 leading-relaxed">
            New accounts without an organization can start with a personal site. Review{' '}
            <a href="/pricing" className={link}>
              plans and limits
            </a>{' '}
            before upgrading. Manage subscriptions and organization invitations in the dashboard; the publishing plugin
            does not purchase a plan or invite members.
          </p>
        </section>
        <section>
          <h2 className="text-title mb-4 text-ink">Contact us</h2>
          <p className="leading-relaxed">
            Email{' '}
            <a href="mailto:support@zephyr-cloud.io" className={link}>
              support@zephyr-cloud.io
            </a>{' '}
            with your organization and application name, affected URL, approximate time, and the error you saw. Never
            send passwords, access tokens, private keys, or signed file download URLs.
          </p>
        </section>
        <section>
          <h2 className="text-title mb-4 text-ink">Deployment help</h2>
          <p className="leading-relaxed">
            Find setup and troubleshooting steps in the{' '}
            <a href="https://docs.zephyr-cloud.io/" className={link}>
              documentation
            </a>
            . Check{' '}
            <a href="https://status.zephyr-cloud.io/" className={link}>
              service status
            </a>{' '}
            for known incidents.
          </p>
        </section>
        <section>
          <h2 className="text-title mb-4 text-ink">ChatGPT and Codex</h2>
          <p className="leading-relaxed">
            If your connection has expired or was revoked, reconnect Zephyr Cloud in the assistant’s plugin settings.
            Confirm the site’s organization before publishing. A new build has its own URL; an environment such as
            production serves the version selected for it. Updates can take time to reach every edge.
          </p>
          <p className="mt-4 leading-relaxed">
            For unexpected publication results, include the build number and environment name. Ask us about revoking
            access, deleting hosted content, or removing your account. Disconnecting a plugin does not itself remove
            your deployed sites.
          </p>
          <p className="mt-4 leading-relaxed">
            The publishing plugin accepts a static HTML file or a JSON bundle containing your site’s built files, with
            up to 200 files and 25 MiB per file. ZIP archives and server applications are not supported. If a publish
            times out, check build history before starting another upload. To change what visitors see at an existing
            environment URL, select a retained build and ask to promote it or roll back to it.
          </p>
        </section>
        <section>
          <h2 className="text-title mb-4 text-ink">Privacy and abuse reports</h2>
          <p className="leading-relaxed">
            For privacy requests, suspected abuse, or content you believe infringes your rights, email our support team
            with the relevant URL and a description. See our{' '}
            <a href="/privacy" className={link}>
              privacy policy
            </a>{' '}
            and{' '}
            <a href="/terms" className={link}>
              terms of service
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
