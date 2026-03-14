import type { ComponentType } from 'react';

type RouteLike = {
  component?: ComponentType;
  options?: {
    component?: ComponentType;
  };
};

export function RouteRenderer({ route }: { route: RouteLike }) {
  const Component = route.component ?? route.options?.component;

  if (!Component) {
    return null;
  }

  return <Component />;
}
