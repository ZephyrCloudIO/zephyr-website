declare module 'campaigns/pages' {
  export function getCampaign(pageId: string, logoUrl: string): { html: string; css: string };
}

declare module 'campaigns/capture' {
  export function mountCampaign(root: HTMLElement): () => void;
}
