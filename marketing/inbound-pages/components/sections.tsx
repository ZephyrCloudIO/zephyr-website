import type { ComponentProps, ReactNode } from 'react';

type Children = { children: ReactNode };

export function Hero({ children }: Children) {
  return <div className="hero">{children}</div>;
}

export function ProofStrip({ children }: Children) {
  return <div className="proof">{children}</div>;
}

export function Benefits({ children }: Children) {
  return <div className="vals">{children}</div>;
}

export function Benefit({
  as: Tag = 'article',
  icon,
  title,
  children,
}: Children & {
  as?: 'article' | 'div';
  icon: ReactNode;
  title: ReactNode;
}) {
  return (
    <Tag className="card">
      <div className="g" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      {children}
    </Tag>
  );
}

export function Steps({ children }: Children) {
  return <div className="how">{children}</div>;
}

export function Step({ number, title, children }: Children & { number: string; title: ReactNode }) {
  return (
    <div>
      <span className="n">{number}</span>
      <b>{title}</b>
      {children}
    </div>
  );
}

export function CampaignSection({
  eyebrow,
  title,
  headingId,
  children,
  ...props
}: Omit<ComponentProps<'section'>, 'title'> & {
  eyebrow: ReactNode;
  title: ReactNode;
  headingId?: string;
}) {
  return (
    <section {...props}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2" id={headingId}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ComparisonCard({ tone, title, children }: Children & { tone: 'old' | 'new'; title: ReactNode }) {
  return (
    <div className={`card ${tone}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export function Testimonial({ attribution, children }: Children & { attribution: ReactNode }) {
  return (
    <figure className="card testimonial">
      <blockquote>{children}</blockquote>
      <figcaption>{attribution}</figcaption>
    </figure>
  );
}

export function LeadForm() {
  return (
    <form className="card" data-lead-form>
      <div data-form-fields />
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div data-turnstile data-action="turnstile-spin-v1" />
      <p data-form-status role="status" aria-live="polite">
        Loading the form…
      </p>
      <button className="btn primary" type="submit" disabled>
        Book a demo
      </button>
      <p className="alt">
        <a href="https://zephyr-cloud.io/privacy" target="_blank" rel="noopener">
          Privacy policy
        </a>
      </p>
      <noscript>Enable JavaScript to submit this form.</noscript>
    </form>
  );
}

export function DemoSection({ children, ...props }: ComponentProps<'section'>) {
  return (
    <section {...props}>
      <div className="glow" />
      <div>{children}</div>
      <LeadForm />
    </section>
  );
}
