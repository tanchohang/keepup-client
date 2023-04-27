import { Calendar, MessageCircle, Newspaper, SidebarClose, SidebarOpen, User, Users } from 'lucide-react';
import { ComposedReactAppNavLink } from './nav-link';
import useAuth from '../context/auth.context';
import { logout } from '../services/auth.service';
import { useState } from 'react';

export const Sidenav = () => {
  const [hidden, setHidden] = useState(false);
  const { setAuth } = useAuth();
  return (
    <div className="flex flex-col justify-between h-full ">
      <nav className="flex justify-around md:flex-col md:justify-normal md:gap-5 md:p-5 border-r border-zinc-100">
        <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} hide={hidden} />
        <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} hide={hidden} />
        <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} hide={hidden} />
        <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} hide={hidden} />
        <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} hide={hidden} />
      </nav>
      <div className="hidden md:flex flex-col items-center p-3 gap-5">
        <button
          className="bg-red-500 text-white w-full h-10"
          onClick={async () => {
            if (await logout()) {
              setAuth(null);
            }
          }}
        >
          Logout
        </button>
        <button
          onClick={async () => {
            setHidden(!hidden);
          }}
        >
          {hidden ? <SidebarOpen size={40} /> : <SidebarClose size={40} />}
        </button>
      </div>
    </div>
  );
};
