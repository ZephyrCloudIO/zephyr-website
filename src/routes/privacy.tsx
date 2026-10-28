import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy,
});

const h2 = 'text-title mt-14 mb-4 text-ink';
const h3 = 'mt-10 mb-0 text-lg font-semibold text-ink';
const p = 'm-0 mt-5 leading-relaxed text-ink-muted';
const ul = 'm-0 mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted marker:text-ink-faint';
const link = 'text-ink underline underline-offset-4';
const code = 'text-ident text-[0.92em] text-ink';

const SUPPORT_EMAIL = 'support@zephyr-cloud.io';
const LAST_UPDATED = 'October 28, 2026';

function Mail() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className={link}>
      {SUPPORT_EMAIL}
    </a>
  );
}

function Field({ children }: { children: ReactNode }) {
  return <code className={code}>{children}</code>;
}

type ToolRow = { tool: string; receives: ReactNode; returns: ReactNode };

// Keep in sync with the tools served at https://mcp.zephyr-cloud.io/sites/mcp (ZephyrCloudIO/zephyr-api-mcp,
// src/sites/mcp.ts and src/sites/service.ts). OpenAI reviews this list against actual tool inputs and outputs.
const TOOLS: ToolRow[] = [
  {
    tool: 'list_organizations',
    receives: (
      <>
        Optional project or chat context IDs (<Field>projectId</Field>, <Field>chatId</Field>). The plugin is told to
        generate these at random; they are not meant to be your assistant conversation ID.
      </>
    ),
    returns: (
      <>
        Your Zephyr user ID (<Field>userId</Field>); the organizations you belong to, with their ID, name, and display
        name, and whether the list is complete; and your saved organization defaults, each with whether you can still
        access it.
      </>
    ),
  },
  {
    tool: 'set_organization_default',
    receives:
      'The organization to remember, or none to clear it, and whether it applies to your account or to a project or chat context ID.',
    returns:
      'Whether the default was saved or cleared, the organization’s ID and name, the context ID it applies to, and all of your saved organization defaults.',
  },
  {
    tool: 'configure_site',
    receives:
      'A site ID created by the plugin; the organization ID or name, project, application, and environment; and optional project or chat context IDs.',
    returns:
      'The saved site configuration, including the organization’s ID and name, and whether a personal organization is still being set up. If an organization must be chosen first, the organizations you belong to, with their ID, name, and display name.',
  },
  {
    tool: 'publish_site, publish_artifact, publish_site_content',
    receives: (
      <>
        The file, bundle, or content you ask to publish, including file names and contents; a request ID; and, for files
        shared by the assistant, a temporary download link (<Field>download_url</Field>) plus the assistant’s file ID,
        file name, and file type, which we accept but do not use. For artifacts, the artifact type, title, and
        dependency names and versions.
      </>
    ),
    returns: (
      <>
        The build ID, snapshot ID, and public URL of the deployment, whether it needs verification, and whether
        production changed. For artifacts, also the hosts the page loads code from and any dependencies without a pinned
        version. A repeated request returns the earlier result. Snapshot IDs and URLs include your Zephyr username.
      </>
    ),
  },
  {
    tool: 'list_builds',
    receives: 'A site ID and page number.',
    returns: (
      <>
        Every build of the application with its ID, version, snapshot ID, URL, status, and publish time. This includes
        builds made by other members of your organization, so the versions, snapshot IDs, and URLs show their Zephyr
        usernames.
      </>
    ),
  },
  {
    tool: 'list_environments',
    receives: 'A site ID.',
    returns: 'Each environment’s name, the build it serves, its stable URL, and whether it is locked.',
  },
  {
    tool: 'promote_build',
    receives: 'A site ID, the build to serve, the build you expect it to replace, and the environment.',
    returns: 'The environment, the build it now serves, its stable URL, and whether the change is still propagating.',
  },
  {
    tool: 'connection_status',
    receives: 'Nothing.',
    returns:
      'Whether your connection, Zephyr access, and organization access are working, how many organizations you can access, the server address and version, the supported protocol versions, the tools the server offers, and the next step to fix a problem.',
  },
];

function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-20 pb-24 sm:px-8 lg:pt-28 lg:pb-32">
      <header>
        <p className="mb-6 text-sm text-ink-faint">Legal</p>
        <h1 className="text-display m-0 text-ink">Privacy policy</h1>
        <p className="text-lead mt-7 mb-0 text-ink-muted">
          What personal information Zephyr Cloud collects, why, who receives it, how long we keep it, and the choices
          you have.
        </p>
      </header>

      <div className="mt-12 border-t border-line pt-7">
        <h2 className={h2}>1. Who we are and what this covers</h2>
        <p className={p}>
          Zephyr Cloud, Inc., a Delaware corporation at 1226 King St, Wilmington, DE 19801, USA (“Zephyr,” “we,” or
          “us”), is responsible for the personal information described here. This policy covers our website at
          zephyr-cloud.io and its subdomains, the Zephyr Cloud platform and dashboard, our command-line and build tools,
          and our plugins and connectors for assistants such as ChatGPT, Codex, and Claude (together, the “services”).
        </p>
        <p className={p}>
          When you deploy a site, the content you publish and information about your own site’s visitors belong to you.
          For that information we act as your service provider (a “processor”), and your own privacy notice applies to
          your visitors.
        </p>

        <h2 className={h2}>2. Information we collect and why</h2>

        <h3 className={h3}>Account and organization information</h3>
        <ul className={ul}>
          <li>
            Your name, email address, username, user ID, and sign-in details, to create your account, authenticate you,
            and contact you about the services.
          </li>
          <li>
            Your organizations, their names, your role in each, and the projects, applications, and environments you can
            access, to decide what you are allowed to see and change.
          </li>
          <li>Billing and subscription details, to charge for paid plans and keep tax and accounting records.</li>
        </ul>

        <h3 className={h3}>Content, builds, and deployments</h3>
        <ul className={ul}>
          <li>
            The files, bundles, and content you publish, their names, sizes, and hashes, to validate, store, and serve
            your sites.
          </li>
          <li>
            Build and deployment records: build IDs, versions, snapshot IDs, URLs, status, environment selections, and
            timestamps, to give you build history, retries, and rollbacks.
          </li>
          <li>
            Who created each build. Build records include the creator’s username and email address, and deployment URLs
            and versions include the creator’s username, so your organization can see who published what.
          </li>
        </ul>

        <h3 className={h3}>Deployment authorship and security signals</h3>
        <p className={p}>
          To check that a build comes from a member of your organization or from automation it has approved, as our{' '}
          <a href="/terms" className={link}>
            terms of service
          </a>{' '}
          describe, we compare the account or token that uploaded a build with build metadata, including git commit
          author and committer names and email addresses. We use the same signals, together with sign-in and request
          details such as IP address and time, to detect stolen or shared credentials and abuse.
        </p>

        <h3 className={h3}>Website visits and support</h3>
        <ul className={ul}>
          <li>
            Product analytics on our website through PostHog: pages viewed, clicks, referrer, approximate location, and
            device and browser details, to understand how the website is used. PostHog stores this with a cookie or
            similar identifier and builds a person profile only if you identify yourself to us.
          </li>
          <li>
            Support email: what you write to us, your contact details, and the conversation history, to answer you.
          </li>
        </ul>

        <h3 className={h3}>Operational logs</h3>
        <p className={p}>
          Our servers and our hosting provider record requests, errors, and request traces, including IP address, time,
          requested URL, response status, and error details, to run, secure, and troubleshoot the services. Request
          traces include the full addresses of requests our servers make. For assistant connections, these addresses can
          contain one-time sign-in codes, refresh tokens, the temporary link to a file you asked to publish, and
          published file names. Only engineers who operate the services can access logs and traces.
        </p>

        <h2 className={h2}>3. ChatGPT, Codex, and other connected assistants</h2>
        <p className={p}>
          When you connect Zephyr to an assistant, you sign in to Zephyr and approve the assistant. We receive your
          Zephyr user ID, name, and email address from that sign-in, plus access and refresh tokens that let the
          assistant act within your Zephyr permissions. We use the user ID to identify you on each request. We keep your
          name and email with the connection only so you and we can recognize which account it belongs to.
        </p>
        <p className={p}>
          We do not receive your conversation history, prompts, memory, or other files from the assistant. We receive
          only what the assistant sends when it calls one of the tools in this section, and we send back only what the
          tool returns. The assistant provider handles what it receives under its own privacy policy, for example{' '}
          <a href="https://openai.com/policies/privacy-policy/" className={link} target="_blank" rel="noopener">
            OpenAI’s
          </a>{' '}
          or{' '}
          <a href="https://www.anthropic.com/legal/privacy" className={link} target="_blank" rel="noopener">
            Anthropic’s
          </a>
          .
        </p>
        <h3 className={h3}>Site publishing plugin</h3>
        <p className={p}>Our site publishing plugin, at mcp.zephyr-cloud.io/sites/mcp, offers these tools:</p>
        <div className="mt-6 space-y-6">
          {TOOLS.map((row) => (
            <div key={row.tool} className="border-l border-line-strong pl-5">
              <p className="m-0 text-ident text-ink">{row.tool}</p>
              <p className="m-0 mt-2 leading-relaxed text-ink-muted">
                <span className="text-ink">We receive: </span>
                {row.receives}
              </p>
              <p className="m-0 mt-1 leading-relaxed text-ink-muted">
                <span className="text-ink">We return: </span>
                {row.returns}
              </p>
            </div>
          ))}
        </div>
        <p className={p}>
          When one of these tools fails, it returns an error code, an HTTP status, a suggested next step, and when to
          retry, or a short error message, for example why a download link or file was rejected. These errors do not
          include tokens or stack traces.
        </p>
        <p className={p}>
          To support later requests, we store on our side: your saved organization defaults, the configuration of each
          site you set up, an automatically created name for your personal organization, and a record of each publish
          request (a fingerprint of the request and its result) so a repeated request does not publish twice. We fetch
          files from the assistant’s temporary download link without sending any Zephyr credentials. We do not save the
          link with your data; it can appear in request traces, as described under operational logs.
        </p>
        <p className={p}>
          Files you publish are available to anyone at their public deployment URLs. Pages published as React or Mermaid
          artifacts load code from public CDNs (esm.sh, cdn.tailwindcss.com, and cdn.jsdelivr.net) when someone views
          them, so those CDNs receive the viewer’s IP address and browser details. Do not publish secrets or information
          you want to keep private.
        </p>

        <h3 className={h3}>Zephyr API connector</h3>
        <p className={p}>
          Our separate Zephyr API connector, at mcp.zephyr-cloud.io/mcp, offers <Field>search</Field> and{' '}
          <Field>execute</Field> tools. <Field>search</Field> receives code the assistant writes and returns matching
          parts of our public API description. <Field>execute</Field> receives code the assistant writes, runs it in an
          isolated sandbox against the Zephyr API with your permissions, and returns whatever that code reads. That can
          be any Zephyr data you can access, including information about your organization and its members, such as
          their names, usernames, and email addresses. Its errors can include up to 2,000 characters of the Zephyr API’s
          response. For each call we send PostHog your Zephyr user ID, the tool name, whether it succeeded, and how long
          it took, to understand how the connector is used.
        </p>

        <h2 className={h2}>4. Legal bases (EEA, UK, and Switzerland)</h2>
        <ul className={ul}>
          <li>
            <span className="text-ink">Contract:</span> running your account, the platform, connected assistants, and
            the deployments you ask for.
          </li>
          <li>
            <span className="text-ink">Legitimate interests:</span> security, deployment authorship checks, preventing
            fraud and abuse, enforcing our terms, improving the services, and business communication. We weigh these
            against your rights, and you can object.
          </li>
          <li>
            <span className="text-ink">Consent:</span> where the law requires it, for example for some cookies. You can
            withdraw consent at any time.
          </li>
          <li>
            <span className="text-ink">Legal obligation:</span> tax and accounting records, and responses to lawful
            requests.
          </li>
        </ul>

        <h2 className={h2}>5. Who receives your information</h2>
        <p className={p}>
          We do not sell your personal information or share it for cross-context behavioral advertising.
        </p>
        <ul className={ul}>
          <li>
            <span className="text-ink">Cloudflare</span> hosts our servers, the plugin’s built-in site hosting, sign-in
            records, saved settings, and logs.
          </li>
          <li>
            <span className="text-ink">PostHog</span> provides website analytics and usage events for the Zephyr API
            connector.
          </li>
          <li>
            <span className="text-ink">Other service providers</span> that help us run the services, such as payment,
            email, and cloud infrastructure providers, process information only on our instructions.
          </li>
          <li>
            <span className="text-ink">The assistant you connect</span> receives what our tools return to it.
          </li>
          <li>
            <span className="text-ink">Your organization:</span> its administrators and members can see builds and who
            created them.
          </li>
          <li>
            <span className="text-ink">Cloud providers you choose</span> when you bring your own cloud.
          </li>
          <li>
            <span className="text-ink">The public</span> can see what you publish and the usernames in deployment URLs.
          </li>
          <li>
            <span className="text-ink">Authorities and others</span> where the law requires it, or to protect the
            rights, safety, and security of our users, the public, or Zephyr.
          </li>
          <li>
            <span className="text-ink">A buyer or successor</span> if we are involved in a merger, acquisition, or sale
            of assets, under this policy’s protections.
          </li>
        </ul>

        <h2 className={h2}>6. How long we keep it</h2>
        <ul className={ul}>
          <li>Sign-in requests and consent screens for connecting an assistant: 10 minutes.</li>
          <li>
            Assistant access tokens: up to 1 hour. The connection record, which holds your Zephyr access and refresh
            tokens, user ID, name, and email: while your account exists, unless you ask us to revoke it. Disconnecting
            in the assistant stops it from using the connection but does not yet delete this record.
          </li>
          <li>
            The record that you approved an assistant (which assistant, its redirect address, permissions, and when):
            while your account exists, as a security record.
          </li>
          <li>Saved organization defaults: until you clear them or close your account.</li>
          <li>
            Site configuration, your personal organization name, and publish request records: while your account exists,
            unless you ask us to delete them.
          </li>
          <li>
            Builds, published content, and deployment records: until you or your organization delete them, or up to 30
            days after your account closes, so you can export them.
          </li>
          <li>Operational logs: up to 30 days.</li>
          <li>Website analytics and connector usage events: up to 24 months.</li>
          <li>Support conversations: while your account exists, and up to 24 months after our last contact.</li>
          <li>Billing records: as long as tax and accounting laws require, typically up to 10 years.</li>
        </ul>
        <p className={p}>
          Backups expire on their normal schedule after deletion. We may keep information longer when the law requires
          it or to resolve a dispute.
        </p>

        <h2 className={h2}>7. Your choices and rights</h2>
        <ul className={ul}>
          <li>
            Ask a connected assistant to clear a saved organization default; the <Field>set_organization_default</Field>{' '}
            tool deletes it immediately.
          </li>
          <li>
            Disconnect Zephyr in the assistant’s settings. Disconnecting does not delete published sites, builds, saved
            site settings, or the connection record; email us to delete or revoke them.
          </li>
          <li>Opt out of website analytics with your browser’s cookie or tracking-protection settings.</li>
          <li>Unsubscribe from marketing email using the link in any message.</li>
        </ul>
        <p className={p}>
          Depending on where you live, you can ask to access, correct, delete, or receive a copy of your personal
          information, restrict or object to how we use it, and withdraw consent. US state privacy laws give similar
          rights to know, correct, delete, and opt out. Email <Mail /> from your account address; we will verify your
          request, answer within one month or the period your law sets, and not treat you differently for using these
          rights. If you are in the EEA, UK, or Switzerland, you can also complain to your data protection authority.
        </p>

        <h2 className={h2}>8. International transfers</h2>
        <p className={p}>
          We are based in the United States and our providers operate around the world, so your information may be
          processed outside your country. When we transfer personal information from the EEA, UK, or Switzerland, we use
          safeguards the law recognizes, such as the European Commission’s Standard Contractual Clauses.
        </p>

        <h2 className={h2}>9. Security</h2>
        <p className={p}>
          We protect information with encryption in transit, access controls, and monitoring, and we limit access to
          people who need it. No system is perfectly secure. To report a vulnerability, email <Mail /> with “Security”
          in the subject; we will acknowledge it and keep you informed.
        </p>

        <h2 className={h2}>10. Children</h2>
        <p className={p}>
          The services are for adults and are not directed to children. We do not knowingly collect information from
          anyone under 18; if you believe we have, contact us and we will delete it.
        </p>

        <h2 className={h2}>11. Changes</h2>
        <p className={p}>
          We will post updates here with a new date. If a change materially affects how we use your information, we will
          tell you by email or in the product before it applies.
        </p>

        <h2 className={h2}>12. Contact</h2>
        <p className={p}>
          Zephyr Cloud, Inc., 1226 King St, Wilmington, DE 19801, USA. Email <Mail /> with any privacy question or
          request.
        </p>
      </div>

      <p className="m-0 mt-14 border-t border-line pt-6 text-sm text-ink-faint">Last updated: {LAST_UPDATED}.</p>
    </article>
  );
}
