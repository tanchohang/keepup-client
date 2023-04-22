import { SearchIcon } from 'lucide-react';

interface Props {}
export const SearchBar = (props: Props) => {
  return (
    <div className="flex items-center w-full mb-5 pl-3 rounded-full border border-zinc-200">
      <input type="text" placeholder="Search" className="peer text-lg p-1 px-2 rounded-full focus:outline-none bg-zinc-50 w-full text-black" />
      <SearchIcon className="order-first stroke-zinc-400 peer-focus:stroke-cyan-500" />
    </div>
  );
};
