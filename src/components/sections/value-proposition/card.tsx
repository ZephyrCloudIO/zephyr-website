import { LegacyRef } from 'react';

export default function ValuePropositionCard({
  icon,
  divRef,
  text,
  onMouseOver,
  onMouseLeave,
}: {
  icon: React.ReactNode;
  divRef:
    | LegacyRef<HTMLDivElement>
    | undefined
    | React.MutableRefObject<HTMLDivElement | null>;
  text: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className="flex flex-row items-center bg-zinc-900/50 text-zinc-200/80
                 font-outfit-light tracking-wide rounded-[2rem] cursor-auto border border-zinc-800
                 hover:border-zinc-700 transition-colors duration-300 w-full
                 backdrop-blur-sm shadow-lg p-2"
      ref={divRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      <p className="tracking-tight sm:text-sm md:text-lg break ml-4 pr-4">
        {text}
      </p>
    </div>
  );
}
