import type { ComponentType } from 'react';

type RouteLike = {
  component?: ComponentType;
};

export function RouteRenderer({ route }: { route: RouteLike }) {
  const Component = route.component;

  if (!Component) {
    return null;
  }

  return <Component />;
}
