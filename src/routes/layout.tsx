import { Outlet } from '@modern-js/runtime/router';
import './index.css';
import Header from '@/components/header';
import Footer from '@/components/sections/footer';
import { INTERCOM_SETTINGS } from '@/lib/intercom';
import Intercom from '@intercom/messenger-js-sdk';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    if (__INTERCOM_APP_ID__) {
      Intercom({
        ...INTERCOM_SETTINGS,
        app_id: __INTERCOM_APP_ID__,
        utm_source: 'website',
      });
    }
  }, []);

  return (
    <div className=" min-h-screen dark antialiased text-zinc-200 ">
      <div className="mx-auto">
        <Header />
        <div className="mt-[64px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
