import { HTMLAttributes, useState } from 'react';
import { SearchBar } from '../searchbar';
import { usePartyFormContext } from '../../context/create-party-form.context';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onCancel: () => void;
  onFormSubmit: (fd: any) => void;
}
export const CreatePartyForm = ({ onCancel, onFormSubmit, ...props }: Props) => {
  const { formdata, setFormData } = usePartyFormContext();

  return (
    <div {...props}>
      <Header
        onCancel={onCancel}
        onCreate={() => {
          onFormSubmit(formdata);
          setFormData({ name: '', friends: [] });
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
  const { formdata, setFormData } = usePartyFormContext();

  function setName(name: string) {
    setFormData({ name, friends: formdata.friends });
    console.log(formdata.name);
  }
  function setFriends(friend: string) {
    setFormData({ friends: [friend, ...formdata.friends], name: formdata.name });
  }
  return (
    <div className="flex flex-col gap-5 py-5 mb-3">
      <input
        placeholder="group name"
        className="border-b outline-none focus:border-cyan-500"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={formdata.name}
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
