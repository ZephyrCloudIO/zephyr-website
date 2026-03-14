import type { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

type Params = Record<string, string | number | boolean | undefined>;

type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
    params?: Params;
  }
>;

function buildHref(to: string, params?: Params) {
  if (!params) {
    return to;
  }

  return Object.entries(params).reduce((result, [key, value]) => {
    const normalized = value == null ? '' : encodeURIComponent(String(value));
    return result.replace(`$${key}`, normalized);
  }, to);
}

export function Link({ to, params, children, ...rest }: LinkProps) {
  return (
    <a href={buildHref(to, params)} {...rest}>
      {children}
    </a>
  );
}

export function createFileRoute(_path: string) {
  return <T extends Record<string, unknown>>(options: T) => ({
    ...options,
    useParams: () => ({}) as Record<string, string>,
  });
}

export function createRootRoute(options: Record<string, unknown>) {
  return options;
}

export function Outlet(): ReactNode {
  return null;
}

export function useLocation() {
  if (typeof window === 'undefined') {
    return { pathname: '/' };
  }

  return { pathname: window.location.pathname };
}
