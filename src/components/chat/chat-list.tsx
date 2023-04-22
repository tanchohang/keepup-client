import { Image, PlusSquare } from 'lucide-react';

interface Props {
  openDetail: (id: string) => void;
}
const ChatList = ({ openDetail }: Props) => {
  return (
    <>
      <div className="p-5 md:border-r md:border-zinc-100 min-h-full">
        <ChatListHeader />
        <SearchBar />
        <ChatListBody />
      </div>
    </>
  );
};

const ChatListHeader = () => {
  return (
    <header className="flex md:justify-between ">
      <button onClick={() => {}} className="hidden md:block">
        <Image size={30} />
      </button>
      <h4 className="mx-auto">Chat List</h4>
      <button className=" hover:shadow-lg justify-self-end ">
        <PlusSquare size={40} className="fill-cyan-500 text-white" />
      </button>
    </header>
  );
};

const SearchBar = () => {
  return (
    <header className="flex w-full pb-5">
      <input
        type="text"
        placeholder="Search"
        className="text-lg p-1 px-3 rounded-full focus:outline-cyan-500 border border-zinc-200 w-full text-black"
      />
    </header>
  );
};

const ChatListBody = () => {
  return (
    <div>
      <button className="flex gap-3 hover:bg-zinc-100 dark:bg-slate-700/50 dark:hover:bg-slate-700/75 rounded-3xl p-5" onClick={() => {}}>
        <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
        <p className="flex flex-col">
          <span className="font-semibold">name of circle</span>
          <span className="font-light">You: subtext goes here. 5d</span>
        </p>
      </button>
    </div>
  );
};

const CreateParty = () => {};

export { ChatList };
