import logoUrl from '../design/zephyr-logo.svg';

export function BrandMark({ assetBaseUrl }: { assetBaseUrl: string }) {
  return <img className="logo" src={new URL(logoUrl, assetBaseUrl).href} alt="Zephyr Cloud" width="175" height="31" />;
}
