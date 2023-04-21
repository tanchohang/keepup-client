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
import { Menu, PlusSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {}
const Chat = (props: Props) => {
  const [selectedParty, setSelectedParty] = useState<string>();
  const { dispatch } = useChatContext();

  const { data: circlesRes, isLoading: circlesLoading, error: circlesError } = useSWR('/circles', readAllCircle);
  // const { data: partiesRes, isLoading: partiesLoading, error: partiesError } = useSWR('/parties', readAllParty);
  // const { data: messagesRes, isLoading: messagesLoading, error: messagesError } = useSWR('/messages', readAllMessage);

  useEffect(() => {
    dispatch({ type: CircleActionEmun.CREATE_CIRCLE, payload: circlesRes?.data as Circle });
    // partiesRes?.data && dispatch({ type: PartyActionEmun.CREATE_PARTY, payload: partiesRes.data as Party });

    // messagesRes?.data && dispatch({ type: MessageActionEmun.CREATE_MESSAGE, payload: messagesRes.data as Message });
  }, []);

  if (circlesError) {
    throw circlesError;
  }
  if (circlesLoading) {
    return <span>Loading.....</span>;
  }
  return (
    <>
      <div className="w-full md:hidden">
        {!selectedParty && (
          <div>
            <ChatList openDetail={(partyId: string) => setSelectedParty(partyId)} />
          </div>
        )}
        {selectedParty && (
          <div className="">
            <ChatDetail
              clearParty={() => {
                setSelectedParty(undefined);
              }}
            />
          </div>
        )}
      </div>

      <div className=" hidden md:grid md:grid-cols-[minmax(max-content,30%),minmax(700px,1fr)]">
        <div className="">
          <ChatList openDetail={(partyId: string) => setSelectedParty(partyId)} />
        </div>

        <div className="">
          <ChatDetail />
        </div>
      </div>
    </>
  );
};

export default Chat;
