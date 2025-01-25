import { Link } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';

interface HeaderNavProps {
  title: string;
  link: string;
  className?: string;
  'aria-label'?: string;
}

export default function HeaderNav({ title, link, className, 'aria-label': ariaLabel }: HeaderNavProps) {
  return (
    <Link
      to={link}
      aria-label={ariaLabel}
      className={cn(
        'text-zinc-400 hover:text-white transition-colors duration-200',
        'text-sm font-medium px-4 py-2 rounded-full',
        'hover:bg-zinc-800/50',
        className
      )}
    >
      {title}
    </Link>
  );
}
