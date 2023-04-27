import { Sidenav } from './sidenav';
import { MobileChatSidenav } from './chat/mobile-chat-sidenav';
import { Outlet, useLocation } from 'react-router-dom';

export const AuthLayout = () => {
  const router = useLocation();
  const path = router.pathname.match(/.+\/chats\/.+/);
  const username = path?.[0]?.split('/')[1];

  return (
    <div className="min-h-screen relative">
      <div className={`absolute top-0 left-0 bottom-0 z-50`}>
        <MobileChatSidenav />
      </div>

      <div className="grid grid-rows-[1fr,max-content] md:grid-cols-[max-content,1fr] bg-white text-black dark:bg-cyan-950 dark:text-white min-h-screen">
        <div className="order-last md:order-first ">
          <Sidenav />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
