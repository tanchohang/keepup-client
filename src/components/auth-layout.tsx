import { Sidenav } from './sidenav';
import { MobileChatSidenav } from './chat/mobile-chat-sidenav';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { appsocket } from '../services/socket.service';

export const AuthLayout = () => {
  const router = useLocation();
  const path = router.pathname.match(/.+\/chats\/.+/);
  const username = path?.[0]?.split('/')[1];

  useEffect(() => {
    appsocket.connect();
    return () => {
      appsocket.disconnect();
    };
  }, [sessionStorage.getItem('accessToken')]);

  return (
    <div className="relative md:h-full min-h-screen max-h-screen">
      <div className={`absolute top-0 left-0 bottom-0 z-50`}>
        <MobileChatSidenav />
      </div>

      <div className="grid grid-rows-[1fr,max-content] md:grid-cols-[max-content,1fr] bg-white text-black dark:bg-cyan-950 dark:text-white min-h-screen">
        <div className="order-last md:order-first h-full ">
          <Sidenav />
        </div>
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
