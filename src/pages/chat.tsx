import { Outlet } from 'react-router';
import { ChatDetail } from '../components/chat/chat-detail';
import { ChatList } from '../components/chat/chat-list';
import useSWR from 'swr';
import { readCircle } from '../services/circle.service';
import { readAllCircle } from '../services/circle.service';
import { readAllParty } from '../services/party.service';
import { readAllMessage } from '../services/message.service';
import { Circle, CircleActionEmun } from '../reducers/circle.reducer';
import { Party, PartyActionEmun } from '../reducers/party.reducer';
import { Message, MessageActionEmun } from '../reducers/message.reducer';
import { useChatContext } from '../context/chat.context';

interface Props {}
const ChatLayout = (props: Props) => {
  const { dispatch } = useChatContext();

  //   const { data: circlesRes, isLoading: circlesLoading, error: circlesError } = useSWR('/circles', readAllCircle);
  //   const { data: partiesRes, isLoading: partiesLoading, error: partiesError } = useSWR('/parties', readAllParty);
  //   const { data: messagesRes, isLoading: messagesLoading, error: messagesError } = useSWR('/messages', readAllMessage);

  //   circlesRes?.data && dispatch({ type: CircleActionEmun.CREATE_CIRCLE, payload: circlesRes.data as Circle });

  //   partiesError?.data && dispatch({ type: PartyActionEmun.CREATE_PARTY, payload: partiesRes?.data as Party });

  //   messagesRes?.data && dispatch({ type: MessageActionEmun.CREATE_MESSAGE, payload: messagesRes.data as Message });

  //   if (circlesError || partiesError || messagesError) {
  //     throw circlesError;
  //   }
  //   if (circlesLoading || partiesLoading || messagesLoading) {
  //     return <span>Loading.....</span>;
  //   }
  return (
    <div className="flex ">
      <div className="hidden md:block border-r-[1px] border-zinc-200 w-full md:max-w-xs lg:max-w-md  px-5">
        <ChatList />
      </div>
      <div className="w-[100%] hidden md:block">
        <ChatDetail />
      </div>
      <div className="md:hidden w-full">
        <Outlet />
      </div>
    </div>
  );
};
export default ChatLayout;
