import { Image, Menu, PlusSquare } from 'lucide-react';
import { SearchBar } from '../searchbar';
import { useAppContext } from '../../context/app.context';
import { useQueryClient } from '@tanstack/react-query';
import { messagesEndpoint } from '../../utils/axios';

interface Props {
  handleCreateButton: () => void;
  handleShowDetails: (p: any) => void;
  parties: any[];
}
const ChatList = ({ handleShowDetails, handleCreateButton, parties }: Props) => {
  return (
    <>
      <div className="p-5 md:border-r md:border-zinc-100 min-h-full relative">
        <ChatListHeader showForm={handleCreateButton} />
        <SearchBar />
        <ChatListBody handleShowDetails={handleShowDetails} parties={parties} />
      </div>
    </>
  );
};

const ChatListHeader = ({ showForm }: { showForm: () => void }) => {
  const { showMobileSidebar, setShowMobileSidebar } = useAppContext();

  return (
    <header className="flex md:justify-between w-full ">
      <button
        onClick={() => {
          setShowMobileSidebar(true);
        }}
        className="md:hidden"
      >
        <Menu size={30} />
      </button>
      <h4 className="mx-auto">Chat List</h4>
      <button className=" hover:shadow-lg justify-self-end" onClick={showForm}>
        <PlusSquare size={40} className="fill-cyan-500 text-white" />
      </button>
    </header>
  );
};

const ChatListBody = ({ handleShowDetails, parties }: { handleShowDetails: (p: any) => void; parties: any[] }) => {
  const queryClient = useQueryClient();

  if (parties.length === 0) return <div className="flex justify-center items-center h-full">Create new chat to Start chatting with friends</div>;

  return (
    <div>
      {parties.map((party) => {
        return (
          <button
            key={party._id}
            className="flex gap-3 hover:bg-zinc-100 dark:bg-slate-700/50 dark:hover:bg-slate-700/75 rounded-3xl p-5"
            onClick={() => {
              queryClient.invalidateQueries([messagesEndpoint, party._id]);
              handleShowDetails(party);
            }}
          >
            <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
            <p className="flex flex-col">
              <span className="font-semibold">{party.name}</span>
              <span className="font-light">You: subtext goes here. 5d</span>
            </p>
          </button>
        );
      })}
    </div>
  );
};

export { ChatList };
