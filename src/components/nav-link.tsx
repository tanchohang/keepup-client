import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface ComposedReactAppNavLinkProps {
  link: string;
  title: string;
  lucideIcon?: ReactNode;
  notification?: number;
  active?: boolean;
  hide?: boolean;
}
export const ComposedReactAppNavLink = ({ link, title, lucideIcon, notification, hide }: ComposedReactAppNavLinkProps) => {
  return hide ? (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        [`relative flex items-center p-3 hover:bg-zinc-200 rounded-lg gap-3 cursor-pointer `, isActive ? 'bg-zinc-200 rounded-lg gap-3' : ''].join(
          ' '
        )
      }
    >
      <AppNavLinkIcon>{lucideIcon}</AppNavLinkIcon>
      <div className="absolute top-0 right-0 flex justify-between w-full gap-14">
        {notification && <AppNavLinkNotificationBadge notification={notification} />}
      </div>
    </NavLink>
  ) : (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        [`flex items-center p-3 hover:bg-zinc-200 rounded-lg gap-3 `, isActive ? 'bg-zinc-200 rounded-lg gap-3' : ''].join(' ')
      }
    >
      <AppNavLinkIcon>{lucideIcon}</AppNavLinkIcon>
      <div className="flex justify-between w-full gap-14">
        <AppNavLinkTitle name={title} />
        {notification && <AppNavLinkNotificationBadge notification={notification} />}
      </div>
    </NavLink>
  );
};

export const AppNavLinkRoot = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const AppNavLinkTitle = ({ name }: { name: string }) => {
  return <p>{name}</p>;
};
export const AppNavLinkNotificationBadge = ({ notification }: { notification: number }) => {
  return <p className="bg-cyan-500 text-white rounded-3xl px-1">{notification}</p>;
};
export const AppNavLinkIcon = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
