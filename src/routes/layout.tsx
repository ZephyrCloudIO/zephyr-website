import { Outlet } from '@modern-js/runtime/router';
import { Helmet } from '@modern-js/runtime/head';
import './index.css';
import Header from '@/components/header';

export default function Layout() {
  return (
    <div className=" min-h-screen dark antialiased text-zinc-200 ">
      <Helmet>
        <title>Zephyr Cloud</title>
      </Helmet>
      <div className="container mx-auto py-3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
