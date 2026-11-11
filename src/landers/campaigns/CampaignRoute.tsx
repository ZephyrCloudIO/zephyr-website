import logoUrl from '@/images/wordmark-light.svg';
import { getCampaign } from 'campaigns/pages';
import { useEffect, useMemo, useRef } from 'react';
import '../../../marketing/inbound-pages/fonts.css';

export function CampaignRoute({ pageId }: { pageId: string }) {
  const root = useRef<HTMLDivElement>(null);
  const page = useMemo(() => getCampaign(pageId, logoUrl), [pageId]);

  useEffect(() => {
    let cancelled = false;
    let stop: (() => void) | undefined;
    import('campaigns/capture')
      .then(({ mountCampaign }) => {
        if (!cancelled && root.current) stop = mountCampaign(root.current);
      })
      .catch(() => {
        if (cancelled) return;
        const status = root.current?.querySelector('[data-form-status]');
        if (status) {
          status.textContent = 'The form is unavailable. Refresh the page and try again.';
          status.setAttribute('role', 'alert');
        }
      });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [pageId]);

  return (
    <>
      <style>{page.css}</style>
      <div
        ref={root}
        className="zephyr-campaign"
        data-page-id={pageId}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </>
  );
}
