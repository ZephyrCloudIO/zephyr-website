import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms')({ component: TermsOfService });
const heading = 'text-title mt-14 mb-4 text-ink';
const paragraph = 'm-0 mt-5 leading-relaxed text-ink-muted';
const list = 'm-0 mt-5 list-disc space-y-2 pl-6 leading-relaxed text-ink-muted';
// Contrasting type keeps the disclaimer and liability limits "conspicuous" for US law (UCC § 1-201(b)(10)).
const conspicuous = 'm-0 mt-5 leading-relaxed font-semibold text-ink';
const link = 'text-ink underline underline-offset-4';

// TODO(legal): fill in every [bracketed] value before merging. They render on the live page.
const LEGAL = {
  entity: 'Zephyr Cloud, Inc.',
  incorporation: '[TODO: state of incorporation, e.g. a Delaware corporation]',
  address: '[TODO: registered business address]',
  governingLaw: '[TODO: e.g. the State of Delaware]',
  venue: '[TODO: e.g. the state and federal courts located in Delaware]',
  euRepresentative: '[TODO: EU legal representative under Article 13 of the Digital Services Act, name and address]',
  dmcaAgent: '[TODO: designated DMCA agent name and address, as registered with the U.S. Copyright Office]',
  supportEmail: 'support@zephyr-cloud.io',
  effectiveDate: 'November 16, 2026',
  lastUpdated: 'October 16, 2026',
};

function Mail({ to = LEGAL.supportEmail }: { to?: string }) {
  return (
    <a href={`mailto:${to}`} className={link}>
      {to}
    </a>
  );
}

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
          These terms describe the relationship between {LEGAL.entity}, {LEGAL.incorporation}, with its address at{' '}
          {LEGAL.address} (“Zephyr,” “we,” or “us”) and the person or organization using our services (“you”). By
          accepting these terms or using the services after they are presented to you, you agree to them. If you use
          Zephyr for an organization, you must have authority to act for it, and “you” means that organization. A
          separately signed agreement or order governs wherever it conflicts with these terms.
        </p>
        <p className={paragraph}>
          The services are built for developers and businesses. You must be at least 18 years old, or the age of
          majority where you live, to create an account. Some terms below apply differently to consumers, meaning
          individuals using the services outside their trade, business, or profession; where they do, we say so.
        </p>

        <h2 className={heading}>2. Accounts, credentials, and automation</h2>
        <p className={paragraph}>
          Provide accurate account information, protect your credentials, and use only accounts and organizations you
          are authorized to access. Organization administrators manage membership and permissions. Tell us promptly if
          you suspect unauthorized access. Connecting an assistant or other integration authorizes it to perform the
          actions you request within your Zephyr permissions; it does not give you access to another customer’s data.
        </p>
        <p className={paragraph}>
          Each user account belongs to one individual. Do not share your login credentials, session tokens, or personal
          access tokens with anyone else, and do not let more than one person use the same account. Everyone who builds,
          deploys, or manages releases through Zephyr for your organization needs their own account.
        </p>
        <p className={paragraph}>
          Builds and deployments that run without a person directing each one, such as CI/CD pipelines, scripts, and
          bots, must authenticate with CI or service tokens issued to your organization, not with a person’s login,
          session, or personal access token. Do not store personal credentials in CI systems, build environments, or
          shared secret stores.
        </p>
        <p className={paragraph}>
          Activity under an account is attributed to its account holder, and activity under a CI or service token is
          attributed to the organization that issued it. You are responsible for all activity under your accounts and
          tokens, including activity by anyone you let use them.
        </p>

        <h2 className={heading}>3. Deployment authorship verification</h2>
        <p className={paragraph}>
          To protect your organization from deployments it did not authorize, Zephyr links every build to the people and
          tokens behind it. A build is accepted into your organization only when both of these are true:
        </p>
        <ul className={list}>
          <li>
            it was uploaded by a registered member of the organization with permission to deploy, or with a CI or
            service token issued by the organization; and
          </li>
          <li>
            the commit it was built from was authored by a registered member of the organization, or by an automation
            identity, such as a dependency bot, that an administrator of the organization has approved.
          </li>
        </ul>
        <p className={paragraph}>
          A CI or service token therefore deploys only commits from members of your organization or from automation you
          have approved. It does not let anyone else deploy through your account.
        </p>
        <p className={paragraph}>
          Other builds may be rejected, or held until an administrator approves them or invites the commit author to the
          organization. To make this check, we compare the authenticated account or token with build metadata, including
          git commit author and committer details. We use the same signals to detect stolen or shared credentials. Our{' '}
          <a href="/privacy" className={link}>
            privacy policy
          </a>{' '}
          describes this processing. Commit metadata can be edited by anyone with access to a repository, so this check
          supplements, and does not replace, your own repository and CI access controls.
        </p>

        <h2 className={heading}>4. Your content</h2>
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
        <p className={paragraph}>If you send us feedback or suggestions, we may use them without obligation to you.</p>

        <h2 className={heading}>5. Builds, environments, and connected services</h2>
        <p className={paragraph}>
          Zephyr keeps builds so you can select which retained version an environment serves. Changing an environment
          can change the content visitors see. Distribution and cache propagation can take time. Retention, storage,
          bandwidth, and other limits depend on your service configuration and plan; keep independent copies of content
          you need to preserve.
        </p>
        <p className={paragraph}>
          When you bring your own cloud, your content is stored and served by your cloud provider under your account
          with them. That provider’s terms, charges, and retention apply, and deleting content there is in your control.
        </p>
        <p className={paragraph}>
          Integrations such as ChatGPT and Codex are also governed by their providers’ terms. Disconnecting an
          integration does not itself delete previously published sites or cancel a Zephyr subscription. Use Zephyr’s
          account controls or contact support to revoke access, remove content, or manage your subscription.
        </p>
        <p className={paragraph}>
          Features we label as beta, preview, or experimental may change or be withdrawn, and are provided without any
          service level commitment.
        </p>

        <h2 className={heading}>6. Acceptable use</h2>
        <p className={paragraph}>
          Do not use Zephyr to distribute malware, conduct phishing or fraud, infringe intellectual property or privacy
          rights, publish unlawful content, send unlawful spam, interfere with the service, or access systems without
          authorization. Do not bypass access controls or authorship verification, use another person’s account or
          credentials, or evade service limits, including by sharing accounts to reduce the number of editing users on
          your plan.
        </p>

        <h2 className={heading}>7. Reporting illegal content and copyright infringement</h2>
        <p className={paragraph}>
          Anyone can report content hosted on Zephyr that they believe is illegal or violates these terms by emailing{' '}
          <Mail /> with the URL, an explanation of why the content is illegal or infringing, your name and email address
          (unless the report concerns child sexual abuse material), and a statement that the report is accurate and made
          in good faith. We review reports promptly and diligently, confirm receipt, and tell you what we decided.
        </p>
        <p className={paragraph}>
          For copyright claims under the U.S. Digital Millennium Copyright Act, send a notice meeting 17 U.S.C.{' '}§
          {' '}512(c)(3) to our designated agent: {LEGAL.dmcaAgent}, or by email to <Mail />. If your content was
          removed and you believe that was a mistake, you can send a counter-notice to the same address. We terminate,
          in appropriate circumstances, the accounts of repeat infringers.
        </p>

        <h2 className={heading}>8. Plans and charges</h2>
        <p className={paragraph}>
          Paid plans, usage charges, billing cycles, and renewal terms are those disclosed in your applicable order or
          checkout and account settings. You must authorize a paid purchase or plan change. Connecting the Zephyr plugin
          or publishing through it does not, by itself, authorize a paid upgrade.
        </p>
        <p className={paragraph}>
          Plans include a set number of editing users. Every individual who builds, deploys, publishes, or manages
          releases through Zephyr needs their own editing user; view-only users cannot do these things. Sharing an
          account to stay within your editing user limit is evading a service limit.
        </p>
        <p className={paragraph}>
          Paid subscriptions renew automatically for the same period until cancelled. You can cancel online at any time
          in your account settings; cancellation takes effect at the end of the current billing period. Prices exclude
          taxes, including VAT, unless stated, and we will add taxes we are required to collect. We will tell you at
          least 30 days before a price increase applies to your subscription.
        </p>
        <p className={paragraph}>
          If you are a consumer in the European Union, the European Economic Area, the United Kingdom, or Switzerland,
          you may withdraw from a paid subscription within 14 days of purchase without giving a reason. If you asked us
          to start the paid service during that period, you pay only for the service provided until you withdraw. Any
          other mandatory consumer cancellation or refund rights also remain available.
        </p>

        <h2 className={heading}>9. Privacy and data protection</h2>
        <p className={paragraph}>
          Our{' '}
          <a href="/privacy" className={link}>
            privacy policy
          </a>{' '}
          explains how we handle personal information. You are responsible for appropriate notices, permissions, and
          safeguards for information you collect through your own sites. Where we process personal data on your behalf,
          we will enter into a data processing agreement with you on request; contact <Mail />.
        </p>

        <h2 className={heading}>10. Service changes, suspension, and enforcement</h2>
        <p className={paragraph}>
          We may change service features and may remove content or restrict access to address security threats, unlawful
          content, violations of these terms, or unpaid amounts under an applicable agreement. We decide based on the
          report, the content, and the context, using automated tools for some security and abuse signals and human
          review for decisions about an account.
        </p>
        <p className={paragraph}>
          If we remove your content or restrict your account, we will tell you what we did, why, which term or law we
          relied on, and whether automated means were involved, unless the law or a request from a competent authority
          prohibits telling you. You can contest any decision by replying to that notice or contacting <Mail />. A
          person who did not make the original decision will review it, and we will reverse it if it was wrong.
        </p>
        <p className={paragraph}>
          If your use does not match your plan, for example several people deploying through one editing user or
          automation running on a personal account, we will tell you and give you at least 14 days to add editing users,
          change plan, or move automation to CI or service tokens. If it is not resolved, we may limit deployments until
          it is. Where shared or exposed credentials create an immediate security risk, we may revoke them or restrict
          access right away and will tell you promptly.
        </p>

        <h2 className={heading}>11. Ending the agreement, export, and switching</h2>
        <p className={paragraph}>
          You can close your account at any time. We may end these terms for convenience with 30 days’ notice, or sooner
          if you seriously or repeatedly breach them or if the law requires it. If we end a paid subscription for
          convenience, we refund prepaid amounts for the unused period.
        </p>
        <p className={paragraph}>
          You can export your content, including builds, assets, configuration, and deployment metadata, in commonly
          used machine-readable formats while your account is active, and for at least 30 days after it closes, unless
          the content is unlawful or the law prohibits it. After that period we delete your content, except copies we
          must keep by law and backups that expire on their normal schedule.
        </p>
        <p className={paragraph}>
          If you want to move to another provider or to your own infrastructure, including under the EU Data Act, tell
          us with up to two months’ notice. We will support a transition period of 30 days, extended if a full switch is
          not technically feasible in that time, and the agreement ends when the switch is complete. We do not charge
          switching or data export fees for leaving Zephyr.
        </p>
        <p className={paragraph}>
          Terms that by their nature should survive, including sections 4, 12 to 16, and 18, survive the end of the
          agreement.
        </p>

        <h2 className={heading}>12. Disclaimer</h2>
        <p className={conspicuous}>
          Except for commitments in a separate agreement and rights that cannot lawfully be excluded, the services are
          provided “as is” and “as available.” To the extent permitted by law, we disclaim all implied warranties,
          including merchantability, fitness for a particular purpose, and non-infringement. We do not promise
          uninterrupted or error-free operation, error-free generated content, or that every deployment will suit a
          particular purpose. Agreed service levels or remedies remain governed by your separate agreement.
        </p>

        <h2 className={heading}>13. Limitation of liability</h2>
        <p className={conspicuous}>
          To the extent permitted by law, neither Zephyr nor its suppliers will be liable for indirect, incidental,
          special, consequential, or punitive damages, or for lost profits, revenue, data, or goodwill. Our total
          liability arising out of or relating to these terms or the services is limited to the greater of the amounts
          you paid us for the services in the 12 months before the event giving rise to the claim and USD 100.
        </p>
        <p className={paragraph}>
          These limits do not apply to liability for death or personal injury caused by negligence, fraud, intentional
          misconduct, or gross negligence, or to any liability that cannot be limited by law. They do not affect your
          statutory rights as a consumer, including your rights if the services do not conform to these terms.
        </p>

        <h2 className={heading}>14. Indemnity</h2>
        <p className={paragraph}>
          If you use the services for a business, you will defend Zephyr against third-party claims arising from your
          content, your sites, or your breach of these terms or the law, and pay the resulting damages and reasonable
          costs. We will notify you promptly of the claim, let you control its defense, and cooperate reasonably. This
          section does not apply to consumers.
        </p>

        <h2 className={heading}>15. Export controls and sanctions</h2>
        <p className={paragraph}>
          You may not use the services in violation of U.S., EU, UK, or other applicable export control or sanctions
          laws. You confirm that you are not located in, organized under the laws of, or ordinarily resident in a
          country or region subject to comprehensive sanctions, and that you are not on, or owned or controlled by
          anyone on, a government restricted-party list.
        </p>

        <h2 className={heading}>16. Governing law and disputes</h2>
        <p className={paragraph}>
          These terms are governed by the laws of {LEGAL.governingLaw}, United States, excluding its conflict-of-laws
          rules and the United Nations Convention on Contracts for the International Sale of Goods. Disputes will be
          resolved exclusively in {LEGAL.venue}, and both parties consent to their jurisdiction. Before filing a claim,
          please contact <Mail /> so we can try to resolve it informally.
        </p>
        <p className={paragraph}>
          If you are a consumer, you also keep the protection of the mandatory laws of your country of residence, and
          you may bring proceedings in the courts where you live.
        </p>

        <h2 className={heading}>17. Changes to these terms</h2>
        <p className={paragraph}>
          We will post updated terms with their effective date. For material changes that affect you adversely, we will
          give at least 30 days’ notice by email or in the product, unless a change is required sooner by law or to
          address security or abuse. If you do not agree, you may stop using the services and close your account before
          the change takes effect; if you are a consumer, we will refund prepaid amounts for the unused period. Changes
          will not alter accrued rights retroactively.
        </p>

        <h2 className={heading}>18. General</h2>
        <ul className={list}>
          <li>
            These terms, together with any order and the documents they reference, are the entire agreement on their
            subject.
          </li>
          <li>
            If a provision is unenforceable, the rest remains in effect, and the provision is applied to the extent the
            law allows.
          </li>
          <li>Not enforcing a provision is not a waiver of it.</li>
          <li>
            You may not assign these terms without our consent, except to a successor of your whole business. We may
            assign them to an affiliate or a successor of our business, and will tell you if we do.
          </li>
          <li>
            Neither party is liable for delays caused by events beyond its reasonable control, except for payment
            obligations.
          </li>
          <li>
            We may send notices by email to your account address or in the product. The English version of these terms
            controls if a translation differs.
          </li>
        </ul>

        <h2 className={heading}>19. Contact</h2>
        <p className={paragraph}>
          {LEGAL.entity}, {LEGAL.address}. For questions, account issues, reports, or a concern about these terms,
          contact <Mail />. This address is also our point of contact for users and for authorities under the EU Digital
          Services Act; we communicate in English. Our legal representative in the European Union is{' '}
          {LEGAL.euRepresentative}.
        </p>
      </div>
      <p className="m-0 mt-14 border-t border-line pt-6 text-sm text-ink-faint">
        Effective: {LEGAL.effectiveDate}. Last updated: {LEGAL.lastUpdated}.
      </p>
    </article>
  );
}
