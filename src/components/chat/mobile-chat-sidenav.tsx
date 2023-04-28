import useAuth from '../../context/auth.context';
import { X } from 'lucide-react';
import { useChatMiniContext } from '../../context/chat-mini.context';
import { useAppContext } from '../../context/app.context';
import { logout } from '../../services/auth.service';

interface Props {}
export const MobileChatSidenav = ({}: Props) => {
  const { auth } = useAuth();
  const { showMobileSidebar, setShowMobileSidebar } = useAppContext();

  return (
    <div
      className={`${showMobileSidebar ? 'flex' : 'hidden'} w-[250px] min-h-full flex-col gap-5 p-8 px-10 bg-emerald-800 relative text-white text-lg`}
    >
      <div>
        <button
          onClick={() => {
            setShowMobileSidebar(false);
          }}
        >
          <X size={40} className="text-red-600 absolute right-0 top-0" />
        </button>
        <div>{auth?.fullname}</div>
        <div>Requests</div>
        <div>Accounts</div>
        <div>Events</div>
      </div>

      <div>
        <button
          className="bg-red-400"
          onClick={async () => {
            await logout();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
