import { cn } from '@/lib/utils';
import React from 'react';

interface FeatureSectionProps {
  children: React.ReactNode;
  className?: string;
  hasGradient?: boolean;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ children, className, hasGradient = false }) => {
  return (
    <section className={cn('py-20 md:py-28 relative', className)}>
      {hasGradient && <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 to-black"></div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">{children}</div>
    </section>
  );
};

interface FeatureHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ children, className }) => {
  return <div className={cn('text-center mb-16', className)}>{children}</div>;
};

interface FeatureTitleProps {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
}

export const FeatureTitle: React.FC<FeatureTitleProps> = ({ children, prefix, className }) => {
  return (
    <h2 className={cn('text-5xl font-bold text-white', className)}>
      {prefix}
      {children}
    </h2>
  );
};

interface FeatureDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const FeatureDescription: React.FC<FeatureDescriptionProps> = ({ children, className }) => {
  return <p className={cn('mt-4 text-lg text-neutral-400 max-w-2xl mx-auto', className)}>{children}</p>;
};

interface FeatureContentProps {
  children: React.ReactNode;
  className?: string;
  layout?: 'left-right' | 'right-left';
  highlightColumn?: 'left' | 'right';
}

export const FeatureContent: React.FC<FeatureContentProps> = ({
  children,
  className,
  layout = 'left-right',
  highlightColumn,
}) => {
  const childrenArray = React.Children.toArray(children);

  const renderColumns = (order: number[], colSpans: string[]) => (
    <>
      <div className={colSpans[0]}>{childrenArray[order[0]]}</div>
      <div className={colSpans[1]}>{childrenArray[order[1]]}</div>
    </>
  );

  if (childrenArray.length !== 2) {
    return <div className={cn('grid md:grid-cols-2 gap-12 items-start', className)}>{children}</div>;
  }

  const isLeftRight = layout === 'left-right';
  const order = isLeftRight ? [0, 1] : [1, 0];

  if (highlightColumn) {
    const isHighlightLeft = highlightColumn === 'left';
    const colSpans = isHighlightLeft
      ? ['col-span-12 md:col-span-8', 'col-span-12 md:col-span-4']
      : ['col-span-12 md:col-span-4', 'col-span-12 md:col-span-8'];
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto items-start', className)}>
        {renderColumns(order, colSpans)}
      </div>
    );
  }

  return (
    <div className={cn('grid md:grid-cols-2 gap-12 items-start', className)}>{renderColumns(order, ['', ''])}</div>
  );
};

interface FeatureColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const FeatureColumn: React.FC<FeatureColumnProps> = ({ children, className }) => {
  return <div className={cn('space-y-6', className)}>{children}</div>;
};
