import { Image, PlusSquare } from 'lucide-react';
import { SearchBar } from '../searchbar';
import { CreatePartyForm } from './create-party-form';
import { useState } from 'react';
import { PartyFormContextProvider } from '../../context/create-party-form.context';
import { createParty } from '../../services/party.service';
interface Props {
  handleCreateButton: () => void;
  handleShowDetails: () => void;
}
const ChatList = ({ handleShowDetails, handleCreateButton }: Props) => {
  return (
    <>
      <div className="p-5 md:border-r md:border-zinc-100 min-h-full relative">
        <ChatListHeader showForm={handleCreateButton} />
        <SearchBar />
        <ChatListBody handleShowDetails={handleShowDetails} />
      </div>
    </>
  );
};

const ChatListHeader = ({ showForm }: { showForm: () => void }) => {
  return (
    <header className="flex md:justify-between ">
      <button onClick={() => {}} className="hidden md:block">
        <Image size={30} />
      </button>
      <h4 className="mx-auto">Chat List</h4>
      <button className=" hover:shadow-lg justify-self-end" onClick={showForm}>
        <PlusSquare size={40} className="fill-cyan-500 text-white" />
      </button>
    </header>
  );
};

const ChatListBody = ({ handleShowDetails }: { handleShowDetails: () => void }) => {
  return (
    <div>
      <button className="flex gap-3 hover:bg-zinc-100 dark:bg-slate-700/50 dark:hover:bg-slate-700/75 rounded-3xl p-5" onClick={handleShowDetails}>
        <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={50} />
        <p className="flex flex-col">
          <span className="font-semibold">name of circle</span>
          <span className="font-light">You: subtext goes here. 5d</span>
        </p>
      </button>
    </div>
  );
};

export { ChatList };
