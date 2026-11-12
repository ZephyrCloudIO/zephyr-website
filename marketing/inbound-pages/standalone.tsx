import { createRoot } from 'react-dom/client';

const root = document.getElementById('campaign-root');
if (root) {
  const id = root.dataset.pageId;
  import(`./pages/${id}.tsx`)
    .then(({ default: CampaignPage }) => {
      createRoot(root).render(<CampaignPage assetBaseUrl={location.href} />);
    })
    .catch(() => {
      root.textContent = 'This page is unavailable. Refresh the page and try again.';
    });
}
