import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Chat } from './pages/chat';
import { Calendar, ChevronLeftSquareIcon, ChevronRightSquareIcon, Cog, LogIn, MessageCircle, Newspaper, User, UserCog, Users } from 'lucide-react';
import { ComposedReactAppNavLink } from './components/nav-link';
import { Activities } from './pages/activities';
import { Setting } from './pages/setting';
import { Profile } from './pages/profile';
import { Home } from './pages/home';
import { useState } from 'react';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Friends } from './pages/friends';
import { Account } from './pages/account';
import { Event } from './pages/events';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="chats" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path=":id" element={<AuthLayout />}>
          <Route index path="activities" element={<Activities />} />
          <Route path="chats" element={<Chat />} />
          <Route path="friends" element={<Friends />} />
          <Route path="account" element={<Account />} />
          <Route path="events" element={<Event />} />

          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
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

  return (
    <div className="flex min-h-screen">
      <nav className={`flex flex-col justify-between border-r-[1px] border-zinc-200  ${hide ? 'max-w-[20%]' : 'w-[20%]'} `}>
        <section className="flex flex-col gap-3 p-5">
          <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} notification={10} hide={hide} />
          <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} notification={9} hide={hide} />
          <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} hide={hide} />
          <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} hide={hide} />
          <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} notification={2} hide={hide} />
        </section>

        <section className="flex flex-col gap-3 p-5">
          <ComposedReactAppNavLink title="Profile" link="profile" lucideIcon={<UserCog size={30} />} hide={hide} />
          <ComposedReactAppNavLink title="Setting" link="setting" lucideIcon={<Cog size={30} />} hide={hide} />
          <button className="flex flex-row-reverse animate-pulse animate-bounce text-amber-500" onClick={() => setHide(!hide)}>
            {hide ? <ChevronRightSquareIcon size={40} /> : <ChevronLeftSquareIcon size={40} />}
          </button>
        </section>
      </nav>

      <section className="w-[100%]">
        <Outlet />
      </section>
    </div>
  );
};

export default App;
