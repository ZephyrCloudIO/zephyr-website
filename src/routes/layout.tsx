import { Outlet } from '@modern-js/runtime/router';
import './index.css';
import Header from '@/components/header';

export default function Layout() {
  return (
    <div className=" min-h-screen dark antialiased text-zinc-200 ">
      <div className="mx-auto">
        <Header />
        <div className="mt-[64px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
