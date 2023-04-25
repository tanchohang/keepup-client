import { useQuery } from 'react-query';
import { useChatContext } from '../context/chat.context';
import { useState } from 'react';
import { circlesEndpoint } from '../utils/axios';
import { readAllCircle } from '../services/circle.service';

interface Props {}
const Friends = (props: Props) => {
  const [friends, setFriends] = useState<any>([]);
  const {
    isLoading: circleLoading,
    error: circleError,
    data: circleRes,
  } = useQuery([circlesEndpoint], readAllCircle, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setFriends(data.data.users);
    },
  });

  return (
    <ul className="flex flex-col gap-5">
      {friends.map((user: any) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
};
export { Friends };
