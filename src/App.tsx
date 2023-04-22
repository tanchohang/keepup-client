import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import { Activities } from './pages/activities';
import { Setting } from './pages/setting';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Friends } from './pages/friends';
import { Account } from './pages/account';
import { Event } from './pages/events';
import RequireAuth from './components/require-auth';
import UnAuthorized from './components/unauthorised';
import { ChatContextProvider } from './context/chat.context';
import { useState } from 'react';
import Chat from './pages/chat';
import Sidenav from './components/sidenav';
import ChatHeader from './components/chat/chat-header';
import PersistLogin from './components/persist-login';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={'/login'} replace />} />
        <Route element={<UnAuthorized />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path=":id" element={<AuthLayout />}>
              <Route index element={<Navigate to={'chats'} replace />} />
              <Route path="friends" element={<Friends />} />
              <Route path="activities" element={<Activities />} />
              <Route path="account" element={<Account />} />
              <Route path="events" element={<Event />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
              <Route path="chats" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const AuthLayout = () => {
  const [hideSidenav, setHideSidenav] = useState(false);
  const router = useLocation();
  const path = router.pathname.match(/.+\/chats\/.+/);
  const username = path?.[0]?.split('/')[1];

  return (
    <div>
      <div className="grid grid-rows-[1fr,max-content] md:grid-cols-[max-content,1fr] bg-white text-black dark:bg-cyan-950 dark:text-white min-h-screen">
        <div className="order-last md:order-first ">
          <Sidenav />
        </div>
        <div className="">
          <ChatContextProvider>
            <Outlet />
          </ChatContextProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
