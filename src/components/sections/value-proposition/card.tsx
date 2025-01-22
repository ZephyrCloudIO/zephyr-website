// @ts-expect-error
import Lottie from 'react-lottie';
import { LegacyRef } from 'react';
import { Options } from '@/types';

export default function ValuePropositionCard({
  lottieOptions,
  divRef,
  text,
  onMouseOver,
  onMouseLeave,
}: {
  lottieOptions: Options;
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
                 backdrop-blur-sm shadow-lg pr-4"
      ref={divRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <Lottie options={lottieOptions} height={60} width={60} />
      </div>
      <p className="tracking-tight sm:text-sm md:text-lg break">{text}</p>
    </div>
  );
}
