import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Slot } from './slot';

const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const;

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};
type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
  };

type PrimitiveForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>>;

const Primitive = NODES.reduce((primitive, node) => {
  const Node = React.forwardRef(
    (
      props: PrimitivePropsWithRef<typeof node>,
      forwardedRef: React.Ref<Element>,
    ) => {
      const { asChild, ...primitiveProps } = props;
      const Comp: React.ElementType = asChild ? Slot : node;

      if (typeof window !== 'undefined') {
        (window as unknown as Window & { [key: symbol]: boolean })[
          Symbol.for('radix-ui')
        ] = true;
      }

      return <Comp {...primitiveProps} ref={forwardedRef} />;
    },
  );

  Node.displayName = `Primitive.${node}`;

  return Object.assign(primitive, { [node]: Node });
}, {} as Primitives);

function dispatchDiscreteCustomEvent<E extends CustomEvent>(
  target: E['target'],
  event: E,
) {
  if (target) {
    ReactDOM.flushSync(() => target.dispatchEvent(event));
  }
}

const Root = Primitive;

export {
  Primitive,
  //
  Root,
  //
  dispatchDiscreteCustomEvent,
};
export type { PrimitivePropsWithRef };
