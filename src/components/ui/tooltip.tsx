import {
  type ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  multiline?: boolean;
}

export const Tooltip = ({
  content,
  children,
  position = 'right',
  multiline = false,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const child = cloneElement(children as React.ReactElement, {
    className: `inline-flex ${
      (children as React.ReactElement).props.className || ''
    }`,
  });

  useEffect(() => {
    const positionTooltip = () => {
      if (!tooltipRef.current || !wrapperRef.current) {
        return;
      }

      const tooltip = tooltipRef.current.getBoundingClientRect();
      const wrapper = wrapperRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = -tooltip.height - 8;
          left = (wrapper.width - tooltip.width) / 2;
          break;
        case 'bottom':
          top = wrapper.height + 8;
          left = (wrapper.width - tooltip.width) / 2;
          break;
        case 'left':
          top = (wrapper.height - tooltip.height) / 2;
          left = -tooltip.width - 8;
          break;
        case 'right':
          top = (wrapper.height - tooltip.height) / 2;
          left = wrapper.width + 8;
          break;
        default:
          top = (wrapper.height - tooltip.height) / 2;
          left = wrapper.width + 8;
          break;
      }

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    };

    if (isOpen) {
      requestAnimationFrame(positionTooltip);
    }
  }, [isOpen, position]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {child}
      {isOpen && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-[9999] px-2 py-1 text-sm text-gray-300 bg-gray-900 rounded shadow-lg pointer-events-none
            ${multiline ? 'max-w-xs w-max' : 'whitespace-nowrap'}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
