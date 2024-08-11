import { useEffect, useState, useRef } from 'react';
import { Link } from '@modern-js/runtime/router';
import Separator from './ui/separator';
import TopRightGlowButton from './ui/buttons/button.top-right-glow';
import HeaderNav from './ui/buttons/button.header-nav';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <div className="rounded-full sticky top-5 border border-[#2a2a2a] bg-[#010101] items-center gap-2 backdrop-blur-lg justify-between flex p-4">
      <a
        href="/"
        className="min-w-[220px] items-center flex-shrink-0 pl-3 flex "
      >
        <img
          src="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66acd2a968324f3e610c1cae_zephyr%20logo.svg"
          alt="Zephyr Cloud - Logo"
        ></img>
      </a>
      <Separator className="w-[60px] h-[0.6px] rotate-90 bg-gradient-to-r from-slate-950 via-slate-200 to-slate-950" />
      <div className="flex space-x-1 px-4 ">
        {siteConfig.headerNav.map(item => {
          return <HeaderNav key={item.link} props={item} />;
        })}
      </div>
      <Separator className="w-[60px] h-[0.6px] rotate-90 bg-gradient-to-r from-slate-950 via-slate-200 to-slate-950" />
      <div className="px-4">
        <Link to={siteConfig.signUp}>
          <TopRightGlowButton>Get Started</TopRightGlowButton>
        </Link>
      </div>
    </div>
  );
}
