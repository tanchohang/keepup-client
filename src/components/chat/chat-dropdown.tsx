import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface props {
  deleteParty: () => void;
  leaveParty: () => void;
}

export const ChatDropdown = ({ deleteParty, leaveParty }: props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="" aria-label="Customise options">
          <MoreVertical size={30} className="fill-white stroke-white" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className=" bg-white p-3 mr-3">
          <DropdownMenu.Label />
          <DropdownMenu.Item className=" cursor-pointer hover:bg-slate-200">
            <button onClick={leaveParty}>Leave</button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className=" cursor-pointer hover:bg-slate-200">
            <span>People</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" cursor-pointer hover:bg-slate-200">
            <button onClick={deleteParty}>Delete</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
