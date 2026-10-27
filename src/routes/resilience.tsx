import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/resilience')({ component: Resilience });
const link = 'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-muted';
const heading = 'text-headline m-0 text-ink';
const question = 'text-title m-0 text-ink';
const paragraph = 'm-0 mt-4 leading-relaxed text-ink-muted';

const SCENARIOS = [
  {
    down: 'Dashboard',
    users: 'No effect',
    builds: 'No effect; builds and uploads don’t use the dashboard',
    changes: 'Not in the dashboard; the API and CI tokens keep working',
  },
  {
    down: 'Sign-in service',
    users: 'No effect',
    builds: 'CI tokens keep working; interactive sign-in, personal tokens and connected assistants may not',
    changes: 'With a CI token, yes. Through the dashboard, no',
  },
  {
    down: 'Zephyr API or deploy gateway',
    users: 'No effect',
    builds: 'Your build still runs; the upload and deploy step can’t complete',
    changes: 'No. Environments keep serving the version they serve now',
  },
  {
    down: 'Zephyr-managed edge',
    users: 'Zephyr-hosted apps are affected. Apps on your own cloud are not',
    builds: 'Uploads to Zephyr-hosted targets fail; deploys to your own cloud aren’t affected',
    changes: 'Only for Zephyr-hosted environments',
  },
  {
    down: 'Your cloud provider',
    users: 'Your app is affected, with or without Zephyr',
    builds: 'Deploys to that provider fail',
    changes: 'Not until the provider recovers',
  },
];

const FAQ: { q: string; a: ReactNode[] }[] = [
  {
    q: 'If Zephyr Cloud has an outage, does our app keep running?',
    a: [
      'If you deploy to your own cloud account (bring your own cloud), yes. The code that serves your visitors runs in your account, reads the files and routing data stored there, and does not call Zephyr to answer a request. A Zephyr outage doesn’t interrupt it.',
      'If you use Zephyr-managed hosting, the serving code runs in an instance of Zephyr that we operate on Cloudflare, and that instance is the host. An outage of the dashboard, sign-in or API doesn’t stop a deployed app from being served. An outage of that edge instance does.',
    ],
  },
  {
    q: 'Is Zephyr on the critical serving path?',
    a: [
      'Not for apps on your own cloud. Zephyr is in the path that gets a release to your cloud: builds, uploads, and changes to which version an environment serves. It is not in the path that answers requests from your users.',
      'For Zephyr-managed hosting it is: our own instance of the serving code, running on Cloudflare, is what answers your visitors. Server-side rendering, currently in beta, also runs only on Zephyr-managed hosting.',
    ],
  },
  {
    q: 'Does the deployed app call Zephyr from the browser or server at runtime?',
    a: [
      'No. The runtime code Zephyr adds to a Module Federation app fetches your app’s own manifest. Remote addresses are resolved when you build, and written into that manifest. At runtime, the browser asks the hostnames your edge serves, not a Zephyr API.',
    ],
  },
  {
    q: 'Can we still run builds and deploy during an outage?',
    a: [
      'Your CI keeps running, because the build happens in your pipeline. The upload and deploy step needs Zephyr. By default, the Zephyr plugin logs the failure and lets the build finish, so a pipeline can succeed without a deployment.',
      <>
        If your process needs a failed Zephyr step to fail the pipeline, set{' '}
        <code className="text-ident">ZE_FAIL_BUILD=true</code>. Check your pipeline’s own handling of a failed or
        skipped deploy. Don’t assume a green build means a new version is live.
      </>,
    ],
  },
  {
    q: 'Can we promote a version or roll back during an outage?',
    a: [
      'Not while the part of Zephyr that assigns versions to environments is unavailable. Promotions and rollbacks go through Zephyr’s API, which pushes the change to your cloud, so they wait for service to return. The version an environment serves when the outage starts keeps being served until you change it.',
      'We don’t currently offer a supported way to change what an environment serves without Zephyr. If your change-management or incident process requires one, tell us. We want to know which requirements are real.',
    ],
  },
  {
    q: 'What if only the dashboard is down?',
    a: [
      'Builds, uploads and API calls don’t depend on the dashboard. Promoting through the API with a CI token isn’t affected by a dashboard-only outage.',
    ],
  },
  {
    q: 'What if the sign-in service is down?',
    a: [
      'Interactive sign-in and personal tokens depend on it. CI tokens are exchanged through the Zephyr API without it, so pipelines that use a CI token can keep working while the API itself is up. CI tokens are scoped to build and deploy endpoints. They can’t manage users, organizations or tokens.',
      'Connected assistants (the Zephyr MCP server) sign in through the same service and check the session on each request, so they are unavailable while it is down. Treat them as interactive tools. Use CI tokens for anything that has to run during an incident.',
    ],
  },
  {
    q: 'How should we prepare?',
    a: [
      'Use CI tokens in pipelines instead of personal tokens, and create and store them before you need them. Decide whether a failed Zephyr step should fail your pipeline. Know which environment points at which version, and keep your own record of what was last released. Follow our status page, and write down who in your organization decides to hold or proceed with a release when Zephyr is unavailable.',
    ],
  },
  {
    q: 'Do you hold credentials for our cloud account?',
    a: [
      'To deploy to your cloud, Zephyr uses the credentials you connect to create the serving resources and write files and routing data into your account. Rotate or revoke the credentials you gave us from your cloud provider at any time; doing so stops new deployments, not serving.',
    ],
  },
  {
    q: 'What availability does Zephyr commit to?',
    a: [
      'Contractual availability commitments, where they apply, are in your order form or agreement. This page describes how the product behaves, not a service level. Follow incidents on the status page below.',
    ],
  },
];

function Resilience() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-20 pb-24 sm:px-8 lg:pt-28 lg:pb-32">
      <header>
        <p className="mb-6 text-sm text-ink-faint">Security and reliability</p>
        <h1 className="text-display m-0 text-ink">What happens if Zephyr Cloud is down?</h1>
        <p className="text-lead mt-7 mb-0 text-ink-muted">
          For apps on your own cloud, your users keep being served. What stops is shipping new releases and changing
          which version is live. This page says which is which, so you can plan for it.
        </p>
        <p className="mt-5 mb-0 text-sm text-ink-faint">Last reviewed October 2026</p>
      </header>

      <div className="mt-12 space-y-16 border-t border-line pt-12">
        <section aria-labelledby="two-paths">
          <h2 id="two-paths" className={heading}>
            Two paths, kept apart.
          </h2>
          <p className={paragraph}>
            <strong className="font-medium text-ink">Getting a release live</strong> runs through Zephyr. Your build
            uploads files and a record of the build, and Zephyr’s API assigns that build to an environment such as
            production. Zephyr then writes the result into your cloud account.
          </p>
          <p className={paragraph}>
            <strong className="font-medium text-ink">Serving a request</strong> doesn’t. With bring your own cloud
            (Cloudflare, AWS, Fastly or Akamai), a request reaches serving code in your account. It looks up the version
            for that hostname in storage in your account, and returns files from your account. Nothing in that code
            calls a Zephyr service to answer.
          </p>
          <p className={paragraph}>
            That is the reason a Zephyr outage affects how fast you can ship and fix, and not whether your visitors are
            served. Your cloud provider’s availability still applies. If it is down, your app is down.
          </p>
          <p className={paragraph}>
            With Zephyr-managed hosting, the same serving code runs in an instance of Zephyr that we operate on
            Cloudflare, so that instance is on the path that answers your visitors. Everything below about the
            dashboard, sign-in and API still applies. Only the “no effect on users” column changes.
          </p>
        </section>

        <section aria-labelledby="scenarios">
          <h2 id="scenarios" className={heading}>
            What each kind of outage affects.
          </h2>
          <p className={paragraph}>
            “Down” can mean different things. This table is for apps on your own cloud, and shows each part of Zephyr on
            its own.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-ink-faint">
                  <th scope="col" className="p-4 font-normal">
                    If this is down
                  </th>
                  <th scope="col" className="p-4 font-normal">
                    Your users
                  </th>
                  <th scope="col" className="p-4 font-normal">
                    Builds from CI
                  </th>
                  <th scope="col" className="p-4 font-normal">
                    Promote or roll back
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((row) => (
                  <tr key={row.down} className="border-b border-line align-top last:border-b-0">
                    <th scope="row" className="p-4 font-medium text-ink">
                      {row.down}
                    </th>
                    <td className="p-4 text-ink-muted">{row.users}</td>
                    <td className="p-4 text-ink-muted">{row.builds}</td>
                    <td className="p-4 text-ink-muted">{row.changes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="m-0 mt-4 text-sm text-ink-faint">
            Anything already cached by a CDN or browser keeps being served on its own cache lifetime. Releases and
            rollbacks reach users as fast as each edge’s cache allows, once Zephyr can push them.
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className={heading}>
            Questions reviewers ask.
          </h2>
          <div className="mt-10 space-y-10">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className={question}>{item.q}</h3>
                {item.a.map((text, i) => (
                  <p key={i} className={paragraph}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="scope">
          <h2 id="scope" className={heading}>
            Scope of this page.
          </h2>
          <p className={paragraph}>
            This describes how Zephyr’s products behave today. It isn’t a service level, and it doesn’t cover how your
            own cloud provider, CDN or DNS behave. If you are completing a vendor-risk review and need something this
            page doesn’t answer, email{' '}
            <a href="mailto:support@zephyr-cloud.io" className={link}>
              support@zephyr-cloud.io
            </a>
            . Follow incidents at{' '}
            <a href="https://status.zephyr-cloud.io/" target="_blank" rel="noopener" className={link}>
              status.zephyr-cloud.io
            </a>
            . See also our{' '}
            <a href="/blog/soc2" className={link}>
              SOC 2 announcement
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
