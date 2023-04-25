import { readCircle } from '../services/circle.service';
import { readAllCircle } from '../services/circle.service';
import { readAllParty } from '../services/party.service';
import { readAllMessage } from '../services/message.service';
import { Circle, CircleActionEmun } from '../reducers/circle.reducer';
import { Party, PartyActionEmun } from '../reducers/party.reducer';
import { Sidenav } from './sidenav';
import { MobileChatSidenav } from './chat/mobile-chat-sidenav';
import { Outlet, useLocation } from 'react-router-dom';
import { ChatContextProvider, useChatContext } from '../context/chat.context';
import { useQuery } from 'react-query';
import { circlesEndpoint } from '../utils/axios';
import { useState } from 'react';
import useAuth, { AuthUser } from '../context/auth.context';

export const AuthLayout = () => {
  const router = useLocation();
  const path = router.pathname.match(/.+\/chats\/.+/);
  const username = path?.[0]?.split('/')[1];

  const { auth, setAuth } = useAuth()!;

  const {
    isLoading: circleLoading,
    error: circleError,
    data: circleRes,
  } = useQuery([circlesEndpoint], readAllCircle, {
    onSuccess: (data) => {
      setAuth({ circle: data.data._id, ...auth } as AuthUser);
    },
  });

  if (circleLoading) return <span>Loading.......</span>;

  if (circleError) return <span>Error.......</span>;

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
