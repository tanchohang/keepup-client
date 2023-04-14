import { PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {}
const ChatList = (props: Props) => {
  return (
    <>
      <header className=" hidden md:flex justify-between ">
        <h4>Chat List</h4>
        <button className=" hover:shadow-lg">
          <PlusSquare size={40} className="fill-cyan-500 text-white" />
        </button>
      </header>

      <div className="p-5">
        <header className="flex w-full pb-5">
          <input type="text" placeholder="Search" className="text-lg p-1 px-3 rounded-full focus:outline-cyan-500 border border-zinc-200 w-full" />
        </header>
        <div>
          <Link to={'id'} className="flex gap-3" onClick={() => console.log('party clicked')}>
            <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
            <p className="flex flex-col">
              <span className="font-semibold">name of circle</span>
              <span className="font-light">You: subtext goes here. 5d</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
export { ChatList };
