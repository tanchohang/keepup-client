import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import {
  Calendar,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  Cog,
  Menu,
  MessageCircle,
  Newspaper,
  PlusSquare,
  User,
  UserCog,
  Users,
  X,
} from 'lucide-react';
import { ComposedReactAppNavLink } from './components/nav-link';
import { Activities } from './pages/activities';
import { Setting } from './pages/setting';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Friends } from './pages/friends';
import { Account } from './pages/account';
import { Event } from './pages/events';
import { ChatDetail } from './components/chat/chat-detail';
import { ChatList } from './components/chat/chat-list';
import RequireAuth from './components/require-auth';
import UnAuthorized from './components/unauthorised';
import { ChatContextProvider } from './context/chat.context';
import { useState } from 'react';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={'/login'} replace />} />

        <Route element={<UnAuthorized />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path=":id" element={<AuthLayout />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Activities />} />
            <Route path="activities" element={<Activities />} />
            <Route path="friends" element={<Friends />} />
            <Route path="account" element={<Account />} />
            <Route path="events" element={<Event />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
            <Route path="chats" element={<ChatLayout />}>
              <Route index element={<ChatList />} />
              <Route path=":id" element={<ChatDetail />} />
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
  const [hide, setHide] = useState(false);
  const router = useLocation();
  const path = router.pathname.match(/.+\/chats\/.+/);
  const username = path?.[0]?.split('/')[1];

  return (
    <div className="flex relative dark:bg-slate-800 dark:text-white">
      {/* Sidenave for small screens */}

      {!hide && (
        <nav className={`flex md:hidden flex-col gap-3 bg-cyan-500 dark:bg-cyan-950 w-full h-screen absolute `}>
          <ComposedReactAppNavLink title="Profile" link="profile" lucideIcon={<UserCog size={30} />} hide={hide} />
          <ComposedReactAppNavLink title="Setting" link="setting" lucideIcon={<Cog size={30} />} hide={hide} />
          {/* <button
            onClick={() => setHide(!hide)}
            className={`${hide ? '' : '-z-50 absolute right-5 top-3 text-red-500'} transition-colors ease-linear duration-5000`}
          >
            {hide ? <Menu /> : <X size={30} />}
          </button> */}
        </nav>
      )}

      <div className="flex flex-col-reverse justify-between md:flex-row min-h-screen w-full">
        {/* Displayed on mobile hidden in other screens */}
        {path && (
          <nav className="flex md:hidden  w-full justify-around ">
            <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} />
            <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} />
            <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} />
            <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} />
            <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} />
          </nav>
        )}
        {/* For medium screens */}
        <nav className=" hidden md:flex lg:hidden flex-col md:justify-between md:border-r-[1px] border-zinc-200 min-w-fit">
          <section className="flex  flex-col gap-3 p-5">
            <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} notification={10} hide />
            <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} notification={9} hide />
            <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} hide />
            <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} hide />
            <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} notification={2} hide />
          </section>
          <section className={`flex flex-col gap-3 p-5 `}>
            <ComposedReactAppNavLink title="Profile" link="profile" lucideIcon={<UserCog size={30} />} hide />
            <ComposedReactAppNavLink title="Setting" link="setting" lucideIcon={<Cog size={30} />} hide />
          </section>
        </nav>
        {/* For Larger Screen */}
        <nav className={`  hidden lg:flex flex-col justify-between border-r-[1px] border-zinc-200 min-w-fit`}>
          <section className="flex flex-col gap-3 p-5">
            <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} notification={10} hide={hide} />
            <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} notification={9} hide={hide} />
            <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} hide={hide} />
            <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} hide={hide} />
            <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} notification={2} hide={hide} />
          </section>
          <section className={`flex flex-col gap-3 p-5 `}>
            <ComposedReactAppNavLink title="Profile" link="profile" lucideIcon={<UserCog size={30} className="flex-shrink-0" />} hide={hide} />
            <ComposedReactAppNavLink title="Setting" link="setting" lucideIcon={<Cog size={30} />} hide={hide} />
            <button
              className={`${
                hide ? 'flex justify-center' : 'flex flex-row-reverse'
              } hidden md:hidden lg:flex animate-pulse animate-bounce text-amber-500 `}
              onClick={() => setHide(!hide)}
            >
              {hide ? <ChevronRightSquareIcon size={40} /> : <ChevronLeftSquareIcon size={40} />}
            </button>
          </section>
        </nav>

        {/* AuthLayout header */}
        <div>
          {path && (
            <header className="flex md:hidden justify-between px-5 ">
              <button
                onClick={() => setHide(!hide)}
                className={`${hide ? '' : '-z-50 absolute right-5 top-3 text-red-500'} transition-colors ease-linear duration-5000`}
              >
                {hide ? <Menu /> : <X size={30} />}
              </button>
              <h4 className="">Title</h4>
              <button>
                <PlusSquare size={40} className="fill-cyan-500 text-white" />
              </button>
            </header>
          )}
          <section className="w-[100%]">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

const ChatLayout = () => {
  return (
    <>
      <span>Heading</span>
      {/* <ChatContextProvider> */}
      {/* <ChatLayout /> */}
      {/* </ChatContextProvider> */}
      <Outlet />
    </>
  );
};

export default App;
