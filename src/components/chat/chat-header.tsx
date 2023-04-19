import { Menu, PlusSquare } from 'lucide-react';

interface Props {
  sidenavHandler: () => void;
}
function ChatHeader({ sidenavHandler }: Props) {
  return (
    <header className="flex md:justify-between ">
      <button onClick={sidenavHandler} className="hidden md:block">
        <Menu size={30} />
      </button>
      <h4 className="mx-auto">Chat List</h4>
      <button className=" hover:shadow-lg justify-self-end ">
        <PlusSquare size={40} className="fill-cyan-500 text-white" />
      </button>
    </header>
  );
}
export default ChatHeader;
