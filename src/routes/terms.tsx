import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms')({ component: TermsOfService });
const heading = 'text-title mt-14 mb-4 text-ink';
const paragraph = 'm-0 mt-5 leading-relaxed text-ink-muted';

function TermsOfService() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-20 pb-24 sm:px-8 lg:pt-28 lg:pb-32">
      <header>
        <p className="mb-6 text-sm text-ink-faint">Legal</p>
        <h1 className="text-display m-0 text-ink">Terms of service</h1>
        <p className="text-lead mt-7 mb-0 text-ink-muted">
          Terms for using Zephyr Cloud’s websites, deployment services, and connected tools.
        </p>
      </header>
      <div className="mt-12 border-t border-line pt-7">
        <h2 className={heading}>1. Our agreement</h2>
        <p className={paragraph}>
          These terms describe the relationship between Zephyr Cloud, Inc. (“Zephyr,” “we,” or “us”) and the person or
          organization using our services (“you”). By accepting these terms or using the services after they are
          presented to you, you agree to them. If you use Zephyr for an organization, you must have authority to act for
          it. A separately signed agreement or order governs wherever it conflicts with these terms.
        </p>
        <h2 className={heading}>2. Accounts and organization access</h2>
        <p className={paragraph}>
          Provide accurate account information, protect your credentials, and use only accounts and organizations you
          are authorized to access. Organization administrators manage membership and permissions. Tell us promptly if
          you suspect unauthorized access. Connecting an assistant or other integration authorizes it to perform the
          actions you request within your Zephyr permissions; it does not give you access to another customer’s data.
        </p>
        <h2 className={heading}>3. Your content</h2>
        <p className={paragraph}>
          You retain ownership of the code, files, and other content you submit. You grant Zephyr the rights necessary
          to store, copy, process, transmit, and serve that content to operate the services you request, including
          through our infrastructure providers. You are responsible for having the necessary rights to your content and
          for complying with applicable laws and third-party licenses.
        </p>
        <p className={paragraph}>
          Publishing makes the selected files available at deployment URLs according to the site’s access settings. Do
          not upload credentials, private keys, confidential files, or personal information intended to remain private
          to a public site. Review generated code and deployment targets before publishing.
        </p>
        <h2 className={heading}>4. Builds, environments, and connected assistants</h2>
        <p className={paragraph}>
          Zephyr keeps builds so you can select which retained version an environment serves. Changing an environment
          can change the content visitors see. Distribution and cache propagation can take time. Retention, storage,
          bandwidth, and other limits depend on your service configuration and plan; keep independent copies of content
          you need to preserve.
        </p>
        <p className={paragraph}>
          Integrations such as ChatGPT and Codex are also governed by their providers’ terms. Disconnecting an
          integration does not itself delete previously published sites or cancel a Zephyr subscription. Use Zephyr’s
          account controls or contact support to revoke access, remove content, or manage your subscription.
        </p>
        <h2 className={heading}>5. Acceptable use</h2>
        <p className={paragraph}>
          Do not use Zephyr to distribute malware, conduct phishing or fraud, infringe intellectual property or privacy
          rights, publish unlawful content, send unlawful spam, interfere with the service, or access systems without
          authorization. Do not bypass access controls, misuse another user’s credentials, or evade service limits.
          Report suspected abuse to support@zephyr-cloud.io with the relevant URL and details.
        </p>
        <h2 className={heading}>6. Plans and charges</h2>
        <p className={paragraph}>
          Paid plans, usage charges, billing cycles, renewal terms, and cancellation conditions are those disclosed in
          your applicable order or checkout and account settings. You must authorize a paid purchase or plan change.
          Connecting the Zephyr plugin or publishing through it does not, by itself, authorize a paid upgrade. Any
          mandatory consumer cancellation or refund rights remain available.
        </p>
        <h2 className={heading}>7. Privacy</h2>
        <p className={paragraph}>
          Our{' '}
          <a href="/privacy" className="text-ink underline underline-offset-4">
            privacy policy
          </a>{' '}
          explains how we handle personal information. You are responsible for appropriate notices, permissions, and
          safeguards for information you collect through your own sites. A separately agreed data processing agreement
          applies where applicable.
        </p>
        <h2 className={heading}>8. Service changes, suspension, and closure</h2>
        <p className={paragraph}>
          We may change service features and may restrict access to address security threats, unlawful content,
          violations of these terms, or unpaid amounts under an applicable agreement. Where practical and lawful, we
          will explain the reason and how to resolve it. Contact support to dispute a restriction, request account
          closure, or ask about exporting or deleting content. Separate agreements and legal retention obligations may
          affect those requests.
        </p>
        <h2 className={heading}>9. Availability and your rights</h2>
        <p className={paragraph}>
          Except for commitments in a separate agreement and rights that cannot lawfully be excluded, the services are
          provided as available. We do not promise uninterrupted operation, error-free generated content, or that every
          deployment will suit a particular purpose. These terms do not exclude liability or limit rights where doing so
          would be unlawful. Any agreed service levels or remedies remain governed by your separate agreement.
        </p>
        <h2 className={heading}>10. Changes and contact</h2>
        <p className={paragraph}>
          We will identify the effective date of an updated version and provide notice of material changes as required
          by applicable law or your agreement. Changes will not alter accrued rights retroactively. For questions,
          account issues, or a concern about these terms, contact{' '}
          <a href="mailto:support@zephyr-cloud.io" className="text-ink underline underline-offset-4">
            support@zephyr-cloud.io
          </a>
          .
        </p>
      </div>
      <p className="m-0 mt-14 border-t border-line pt-6 text-sm text-ink-faint">Last updated: October 1, 2026.</p>
    </article>
  );
}
