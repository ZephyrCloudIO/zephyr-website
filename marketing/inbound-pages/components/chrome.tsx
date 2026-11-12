import { BrandMark } from './BrandMark';

export function CampaignHeader({ variant, assetBaseUrl }: { variant: 'modern' | 'classic'; assetBaseUrl: string }) {
  return variant === 'modern' ? (
    <header className="top">
      <a href="https://zephyr-cloud.io" aria-label="Zephyr Cloud home">
        <BrandMark assetBaseUrl={assetBaseUrl} />
      </a>
      <nav aria-label="Main">
        <a href="https://docs.zephyr-cloud.io">Docs</a>
        <a href="https://zephyr-cloud.io/pricing">Pricing</a>
        <a className="btn small" href="#demo">
          Book a demo
        </a>
      </nav>
    </header>
  ) : (
    <header className="top">
      <BrandMark assetBaseUrl={assetBaseUrl} />
      <nav>
        <a href="#how">How it works</a>
        <a href="https://docs.zephyr-cloud.io">Docs</a>
        <a className="btn primary small" href="#demo">
          Book a demo
        </a>
      </nav>
    </header>
  );
}
export function CampaignFooter({ variant, assetBaseUrl }: { variant: 'modern' | 'classic'; assetBaseUrl: string }) {
  return variant === 'modern' ? (
    <footer>
      <a href="https://zephyr-cloud.io" aria-label="Zephyr Cloud home">
        <BrandMark assetBaseUrl={assetBaseUrl} />
      </a>
      <nav aria-label="Footer">
        <a href="https://docs.zephyr-cloud.io">Docs</a>
        <a href="https://zephyr-cloud.io/pricing">Pricing</a>
        <a href="https://zephyr-cloud.io/privacy">Privacy</a>
        <a href="https://zephyr-cloud.io/terms">Terms</a>
      </nav>
    </footer>
  ) : (
    <footer>
      <BrandMark assetBaseUrl={assetBaseUrl} />
      <span>© 2026 Zephyr Cloud</span>
    </footer>
  );
}
