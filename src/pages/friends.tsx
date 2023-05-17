import { circlesEndpoint } from '../utils/axios';
import { addToCircle, readCircle } from '../services/circle.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../context/auth.context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {}
export const Friends = (props: Props) => {
  const [formHidden, setFormHidden] = useState(true);

  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery([circlesEndpoint], async () => await readCircle(auth!.circle), {
    enabled: !!auth!.circle,
    onSuccess(data) {},
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      return await addToCircle(email, auth?.circle as string);
    },
    onSuccess() {
      // queryClient.refetchQueries([circlesEndpoint]);
    },
  });

  const addFriends = async (email: string) => {
    mutation.mutate(email);
    // const circle = await addToCircle(email, auth?.circle as string);
  };

  if (isLoading) return <span>Loadding_friends....</span>;
  if (isError) return <span>Error_friends....</span>;

  return (
    <div className="h-[100%]">
      <nav className="flex  items-center justify-around bg-cyan-500 text-white h-[60px]">
        <h5>Friends</h5>
        {formHidden && (
          <button
            onClick={() => {
              setFormHidden(false);
            }}
          >
            Add Friends
          </button>
        )}
        {!formHidden && (
          <button
            onClick={() => {
              setFormHidden(true);
            }}
          >
            Close Add Friends
          </button>
        )}
      </nav>

      <div className="relative h-[calc(100%-60px)]">
        {data && data.users.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {data?.users.map((user: any) => (
              <li key={user.id} className="flex">
                <span>{user.username}</span>
                {user.online && <span className="rounded-full bg-green-400 w-2 h-2 block"></span>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-full">
            <span>Add Friends</span>
          </div>
        )}

        {!formHidden && (
          <div className="absolute inset-0 z-40">
            <AddFriendsForm handleAddFriends={addFriends} />
          </div>
        )}
      </div>
    </div>
  );
};

const AddFriendsForm = ({ handleAddFriends }: { handleAddFriends: (email: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    handleAddFriends(data.email);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-lg flex w-full mt-5">
      <input
        placeholder="email"
        type="email"
        {...register('email', { required: true })}
        className="p-5 border-2 border-zinc-300 focus:border-cyan-500 focus:outline-none w-full"
      />
      <button type="submit" className="bg-emerald-500 rounded-none text-white">
        Add friend
      </button>
    </form>
  );
};
