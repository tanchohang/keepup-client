import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Chat } from './pages/chat';
import { ChevronLeftSquareIcon, ChevronRightSquareIcon, Cog, MessageCircle, Newspaper, UserCog } from 'lucide-react';
import { ComposedReactAppNavLink } from './components/nav-link';
import { Activities } from './pages/activities';
import { Setting } from './pages/setting';
import { Profile } from './pages/profile';
import { Home } from './pages/home';
import { useState } from 'react';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="chat" element={<Chat />} />

        <Route path=":id" element={<AuthLayout />}>
          <Route index path="activities" element={<Activities />} />
          <Route path="chat" element={<Chat />} />
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
      <div className=" flex flex-col justify-between border-r-[1px] max-w-[20%]">
        <nav className="flex flex-col p-5 gap-3">
          <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} notification={10} hide={hide} />
          <ComposedReactAppNavLink title="Chat" link="chat" lucideIcon={<MessageCircle size={30} />} notification={9} hide={hide} />
          <ComposedReactAppNavLink title="Profile" link="profile" lucideIcon={<UserCog size={30} />} hide={hide} />
          <ComposedReactAppNavLink title="Setting" link="setting" lucideIcon={<Cog size={30} />} hide={hide} />
        </nav>
        <button className="flex flex-row-reverse animate-pulse animate-bounce right-0 text-amber-500" onClick={() => setHide(!hide)}>
          {hide ? <ChevronRightSquareIcon size={40} /> : <ChevronLeftSquareIcon size={40} />}
        </button>
      </div>
      <section className="w-[100%]">
        <Outlet />
      </section>
    </div>
  );
};

export default App;
