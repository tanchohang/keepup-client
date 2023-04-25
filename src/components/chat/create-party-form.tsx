import { HTMLAttributes, useState } from 'react';
import { SearchBar } from '../searchbar';
import { usePartyFormContext } from '../../context/create-party-form.context';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onCancel: () => void;
  onFormSubmit: (fd: any) => void;
}
export const CreatePartyForm = ({ onCancel, onFormSubmit, ...props }: Props) => {
  const [store, setStore] = usePartyFormContext()!;

  return (
    <div {...props}>
      <Header
        onCancel={onCancel}
        onCreate={() => {
          // onFormSubmit(store);
          setStore(store);
        }}
      />
      <Body />
    </div>
  );
};

const Header = ({ onCancel, onCreate }: { onCancel: () => void; onCreate: () => void }) => {
  return (
    <header className="flex justify-between">
      <button className="text-cyan-500" onClick={onCancel}>
        Cancel
      </button>
      <h6>New Party</h6>
      <button className="text-cyan-500" onClick={onCreate}>
        Create
      </button>
    </header>
  );
};

const Body = () => {
  const [store, setStore] = usePartyFormContext()!;

  function setName(name: string) {
    setStore({ name, friends: store.friends });
  }
  function setFriends(friend: string) {
    setStore({ friends: [friend, ...store.friends], name: store.name });
  }
  return (
    <div className="flex flex-col gap-5 py-5 mb-3">
      <input
        placeholder="group name"
        className="border-b outline-none focus:border-cyan-500"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={store.name}
      />
      <SearchBar />
      <SelectedFreindList />
      <FreindList />
    </div>
  );
};

const FreindList = () => {
  return <div>FriendList</div>;
};

const SelectedFreindList = () => {
  return <div>SelectedList</div>;
};
