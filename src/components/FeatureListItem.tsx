import React from 'react';

interface FeatureListItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  diagramQuery?: string;
  diagramAlt?: string;
}

export const FeatureListItem: React.FC<FeatureListItemProps> = ({
  icon: Icon,
  title,
  description,
  diagramQuery,
  diagramAlt,
}) => (
  <div className="border-t border-neutral-700 py-6">
    <div className="flex items-start gap-4">
      <Icon className="w-5 h-5 mt-1 text-emerald-700 shrink-0" />
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-neutral-400 text-sm mt-1">{description}</p>
      </div>
      {diagramQuery && (
        <img
          src={`/placeholder.svg?width=120&height=80&query=${encodeURIComponent(diagramQuery)}`}
          alt={diagramAlt || title}
          width={120}
          height={80}
          className="rounded-sm object-contain ml-auto shrink-0 bg-neutral-800 border border-neutral-700"
        />
      )}
    </div>
  </div>
);
