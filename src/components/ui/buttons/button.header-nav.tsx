import { Link } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';

interface HeaderNavProps {
  props: {
    title: string;
    link: string;
    className?: string;
  };
}

export default function HeaderNav({ props }: HeaderNavProps) {
  return (
    <Link
      to={props.link}
      className={cn(
        'text-zinc-400 hover:text-white transition-colors duration-200',
        'text-sm font-medium px-4 py-2 rounded-full',
        'hover:bg-zinc-800/50',
        props.className
      )}
    >
      {props.title}
    </Link>
  );
}
