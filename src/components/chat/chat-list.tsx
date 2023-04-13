import { PlusSquare } from 'lucide-react';

interface Props {}
const ChatList = (props: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <h4>Chat List</h4>
        <button className=" hover:shadow-lg">
          <PlusSquare size={40} className="fill-cyan-500 text-white" />
        </button>
      </div>
      <div className="flex gap-3">
        <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
        <p className="flex flex-col">
          <span className="font-semibold">name of circle</span>
          <span className="font-light">You: subtext goes here. 5d</span>
        </p>
      </div>
    </>
  );
};
export { ChatList };
