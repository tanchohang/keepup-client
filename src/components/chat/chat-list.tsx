import { Menu, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  openDetail: (id: string) => void;
}
const ChatList = ({ openDetail }: Props) => {
  return (
    <>
      <div className="p-5 md:border-r md:border-zinc-100 min-h-full">
        <header className="flex w-full pb-5">
          <input
            type="text"
            placeholder="Search"
            className="text-lg p-1 px-3 rounded-full focus:outline-cyan-500 border border-zinc-200 w-full text-black"
          />
        </header>
        <div>
          <button
            className="flex gap-3 hover:bg-zinc-100 dark:bg-slate-700/50 dark:hover:bg-slate-700/75 rounded-3xl p-5"
            onClick={() => openDetail('pid')}
          >
            <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
            <p className="flex flex-col">
              <span className="font-semibold">name of circle</span>
              <span className="font-light">You: subtext goes here. 5d</span>
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export { ChatList };
