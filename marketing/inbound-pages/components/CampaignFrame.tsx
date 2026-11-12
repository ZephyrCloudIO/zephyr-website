import chivoUrl from '@fontsource-variable/chivo-mono/files/chivo-mono-latin-wght-normal.woff2';
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import type { CampaignId } from '../../../campaigns';
import baseCss from '../design/base.css?raw';
import formCss from '../design/form.css?raw';
import type { CampaignDesign } from '../design/types';
import { CampaignFooter, CampaignHeader } from './chrome';

export function CampaignFrame({
  id,
  assetBaseUrl,
  design,
  accents,
  children,
}: {
  id: CampaignId;
  assetBaseUrl: string;
  design: CampaignDesign;
  accents: Record<`--${string}`, string>;
  children: ReactNode;
}) {
  const fonts = `@font-face { font-family: Inter; font-style: normal; font-weight: 100 900; font-display: swap; src: url('${new URL(interUrl, assetBaseUrl).href}') format('woff2'); }
@font-face { font-family: 'Chivo Mono'; font-style: normal; font-weight: 100 900; font-display: swap; src: url('${new URL(chivoUrl, assetBaseUrl).href}') format('woff2'); }`;
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    import('../capture.mjs')
      .then(({ mountCampaign }) => {
        if (!cancelled && root.current) cleanup = mountCampaign(root.current);
      })
      .catch(() => {
        const status = !cancelled && root.current?.querySelector('[data-form-status]');
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
          <CampaignHeader variant={design.name} assetBaseUrl={assetBaseUrl} />
          <main>{children}</main>
          <CampaignFooter variant={design.name} assetBaseUrl={assetBaseUrl} />
        </div>
      </div>
    </>
  );
}
