import chivoUrl from '@fontsource-variable/chivo-mono/files/chivo-mono-latin-wght-normal.woff2';
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import baseCss from '../design/base.css?raw';
import formCss from '../design/form.css?raw';
import type { CampaignDesign } from '../design/types';
import type { CampaignId } from '../routes';
import { CampaignFooter, CampaignHeader } from './chrome';

const fonts = `@font-face { font-family: Inter; font-style: normal; font-weight: 100 900; font-display: swap; src: url('${interUrl}') format('woff2'); }
@font-face { font-family: 'Chivo Mono'; font-style: normal; font-weight: 100 900; font-display: swap; src: url('${chivoUrl}') format('woff2'); }`;

export function CampaignFrame({
  id,
  design,
  accents,
  children,
}: {
  id: CampaignId;
  design: CampaignDesign;
  accents: Record<`--${string}`, string>;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const form = root.current?.querySelector<HTMLFormElement>('[data-lead-form]');
    if (!form) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    import('@/lib/lead-form/mount')
      .then(({ mountLeadForm }) => {
        if (!cancelled) cleanup = mountLeadForm(form, id);
      })
      .catch(() => {
        const status = !cancelled && form.querySelector('[data-form-status]');
        if (status) {
          status.textContent = 'The form is unavailable. Refresh the page and try again.';
          status.setAttribute('role', 'alert');
        }
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [id]);

  return (
    <>
      <style>{fonts}</style>
      <style>{baseCss}</style>
      <style>{design.css}</style>
      <style>{formCss}</style>
      <div
        ref={root}
        className="zephyr-campaign"
        data-page-id={id}
        data-design={design.name}
        style={{ ...accents, '--campaign-mono': design.mono } as CSSProperties}
      >
        <div className="wrap">
          <CampaignHeader variant={design.name} />
          <main>{children}</main>
          <CampaignFooter variant={design.name} />
        </div>
      </div>
    </>
  );
}
