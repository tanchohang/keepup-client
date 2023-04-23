import { useState } from 'react';
import useAuth from '../../context/auth.context';
import { X } from 'lucide-react';

interface Props {
  hide: boolean;
  setHide: () => void;
}
export const MobileChatSidenav = ({ hide, setHide }: Props) => {
  const { auth } = useAuth();

  return !hide ? (
    <div className={`${hide ? 'w-0' : 'w-full'} flex flex-col gap-5 p-8 min-h-screen px-10 bg-emerald-800 relative`}>
      <button onClick={setHide}>
        <X size={40} className="text-red-600 absolute right-0 top-0" />
      </button>
      <div>{auth?.fullname}</div>
      <div>Requests</div>
      <div>Accounts</div>
      <div>Events</div>
    </div>
  ) : (
    <></>
  );
};
