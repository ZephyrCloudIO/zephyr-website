// @ts-expect-error
import Lottie from 'react-lottie';
import { LegacyRef } from 'react';
import { Options } from '@/types';

export default function ValuePropositionCard({
  lottieOptions,
  divRef,
  text,
}: {
  lottieOptions: Options;
  divRef:
    | LegacyRef<HTMLDivElement>
    | undefined
    | React.MutableRefObject<HTMLDivElement | null>;
  text: string;
}) {
  return (
    <div
      className="flex start text-zinc-200/80 font-outfit-light tracking-wide items-center border-zinc-100/20 shadow-sm shadow-zinc-100/20 rounded-lg cursor-auto border px-4 content-start justify-start gap-2 sm:min-w-[280px]"
      ref={divRef}
    >
      <Lottie options={lottieOptions} height={80} width={80} />
      <p>{text}</p>
    </div>
  );
}
