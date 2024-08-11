/* eslint-disable react/prop-types */
import { Link } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';

export type GlowingButtonProps = {
  name: string;
  link: string;
  className?: string;
  textClassName?: string;
};
export default function GlowingButton({
  props,
}: {
  props: GlowingButtonProps;
}) {
  const { name, link, className, textClassName } = props;
  return (
    <div>
      <div className="group relative rounded-full bg-zinc-900 overflow-hidden px-[0.6px] pb-[1.02px] pt-[1px] lg:hover:!opacity-100 transition-all duration-500  lg:group-hover/list:opacity-30">
        <div
          id="glow"
          className="absolute glow rotate-45 inset-0 w-[104px] h-[104px] z-0  transition lg:-inset-x-6 block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(217, 217, 217, 0.719)] lg:group-hover:drop-shadow-lg "
        />

        <Link
          to={link}
          className={cn(
            'z-10 lg:px-4 items-center w-40 lg:py-4 ring-3 relative lg:hover:ring ring-zinc-500/30 rounded-full justify-center bg-zinc-900 transition-all sm:grid-cols-8   sm:gap-8 lg:gap-4 md:gap-2 lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 ',
            { 'md:gap-1': !name },
          )}
        >
          <p className="text-center font-outfit">{name}</p>
        </Link>
      </div>
    </div>
  );
}
