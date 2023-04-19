import { Calendar, MessageCircle, Newspaper, User, Users } from 'lucide-react';
import { ComposedReactAppNavLink } from './nav-link';
import { HTMLAttributes } from 'react';

interface Props {
  className: string;
  hide: boolean;
}
function Sidenav({ className, hide }: Props) {
  return (
    // <div className="flex flex-col-reverse justify-between min-h-screen w-full">
    <nav className={['flex justify-around md:flex-col md:justify-normal md:gap-5 md:p-5 border-r border-zinc-100', className].join(' ')}>
      <ComposedReactAppNavLink title="Activities" link="activities" lucideIcon={<Newspaper size={30} />} hide={hide} />
      <ComposedReactAppNavLink title="Chats" link="chats" lucideIcon={<MessageCircle size={30} />} hide={hide} />
      <ComposedReactAppNavLink title="Friends" link="friends" lucideIcon={<Users size={30} />} hide={hide} />
      <ComposedReactAppNavLink title="Account" link="account" lucideIcon={<User size={30} />} hide={hide} />
      <ComposedReactAppNavLink title="Events" link="events" lucideIcon={<Calendar size={30} />} hide={hide} />
    </nav>
    // </div>
  );
}
export default Sidenav;
