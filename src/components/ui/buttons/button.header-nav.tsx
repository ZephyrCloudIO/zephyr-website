/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

export default function HeaderNav({
  props,
}: {
  props: (typeof siteConfig.headerNav)[0];
}) {
  const [currentPath, setCurrentPath] = useState('');
  const mainRef = useRef<HTMLDivElement | null>(null);

  const path = window.location.pathname;

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  useEffect(() => {
    let navLength = 3;
    let navLeftPosition = 50;
    navLength += props.name.length * 0.2;
    navLeftPosition += navLength * 0.2 + props.name.length * 0.4;

    if (mainRef.current) {
      mainRef.current.style.setProperty('--nav-length', `${navLength}rem`);
      mainRef.current.style.setProperty(
        '--nav-left-position',
        `${navLeftPosition}px`,
      );
    }
  }, [props.name]);

  return (
    <div className="items-center flex justify-center">
      <a
        href={props.link}
        className=" transition-all group  duration-300 group py-2 px-12"
      >
        <h2
          ref={mainRef}
          className={cn(
            ' text-transparent relative z-30 w-auto bg-clip-text bg-gradient-to-b from-slate-500 via-slate-400/80 to-slate-200 text-base  tracking-wide duration-300 group:hover:text-gradient-bright group-hover:brightness-150  transform',
            {
              'after:absolute text-gradient-bright after:w-[20px] after:h-[1px]  after:left-1/3 after:-bottom-1 after:bg-zinc-300 ':
                currentPath.includes(props.link),
            },
          )}
        >
          <span className="z-50 duration-300 group-hover:text-zinc-100">
            {' '}
            {props.name}
          </span>
        </h2>
      </a>
    </div>
  );
}
