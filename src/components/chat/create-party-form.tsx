import { ChangeEvent, HTMLAttributes, useState } from 'react';
import { SearchBar } from '../searchbar';
import { usePartyFormContext } from '../../context/create-party-form.context';

import { circlesEndpoint, partiesEndpoint } from '../../utils/axios';
import { readAllCircle, readCircle } from '../../services/circle.service';
import { createParty } from '../../services/party.service';
import useAuth from '../../context/auth.context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onCancel: () => void;
}
export const CreatePartyForm = ({ onCancel, ...props }: Props) => {
  const [store, setStore] = usePartyFormContext()!;
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (party: any) => {
      return await createParty(party);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([partiesEndpoint]);
    },
  });

  return (
    <div {...props}>
      <Header
        onCancel={onCancel}
        onCreate={() => {
          const party = { users: store.friends, name: store.name, circle: auth?.circle! };
          mutation.mutate(party);
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
  const { auth } = useAuth();
  const {
    data: circleRes,
    isError,
    isLoading,
  } = useQuery([circlesEndpoint], async () => await readCircle(auth!.circle), {
    enabled: !!auth!.circle,
  });
  const [store, setStore] = usePartyFormContext()!;

  function setFriends(friend: string) {
    setStore({ friends: [friend, ...store.friends], name: store.name });
  }

  function removeFriends(friend: string) {
    setStore({ friends: store.friends.filter((uid) => friend !== uid), name: store.name });
  }
  if (!circleRes?.users) return <span>Add Friends First</span>;

  return (
    <div>
      {circleRes?.users.map((user: any) => (
        <div key={user.id}>
          <input
            type="checkbox"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.target.checked ? setFriends(user) : removeFriends(user);
            }}
          />
          <span>{user.username}</span>
        </div>
      ))}
    </div>
  );
};

const SelectedFreindList = () => {
  return <div>SelectedList</div>;
};
