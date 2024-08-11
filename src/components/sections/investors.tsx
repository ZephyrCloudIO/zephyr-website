// @ts-expect-error this file exists
import trueVenture from '@/images/truev.avif';

export default function Investors() {
  return (
    <div className="flex flex-col min-h-[30vh] items-center gap-3">
      <h2 className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-zinc-600 via-zinc-500 to-zinc-400 font-[100]">
        Backed by
      </h2>
      <div className="w-60">
        {' '}
        <img src={trueVenture} alt="True venture logo - Zephyr Investor" />
      </div>
    </div>
  );
}
