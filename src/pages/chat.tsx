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
import { ChatContextProvider, useChatContext } from '../context/chat.context';
import { Menu, PlusSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChanMiniContextProvider } from '../context/chat-mini.context';
import { PartyFormContextProvider, usePartyFormContext } from '../context/create-party-form.context';
import { CreatePartyForm } from '../components/chat/create-party-form';

interface Props {}

const Chat = (props: Props) => {
  const { dispatch } = useChatContext();
  const [showForm, setShowForm] = useState(false);

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

  const submitHandler = (formdata: any) => {
    // const response=createParty(formdata)
    console.log(formdata);
    // setFormData({ name: '', friends: [] });
  };
  return (
    <ChatContextProvider>
      <div className=" grid md:grid-cols-[minmax(max-content,40%),minmax(700px,1fr)]">
        <div className="relative">
          <ChatList
            handleCreateButton={() => {
              setShowForm(true);
            }}
          />
          {showForm && (
            <PartyFormContextProvider>
              <CreatePartyForm className="absolute inset-0 bg-white p-5 z-50" onCancel={() => setShowForm(false)} onFormSubmit={submitHandler} />
            </PartyFormContextProvider>
          )}
        </div>

        <div>
          <ChatDetail />
        </div>
      </div>
    </ChatContextProvider>
  );
};

// const ChatMediumScreen = () => {
//   return (
//     <div className=" hidden md:grid md:grid-cols-[minmax(max-content,40%),minmax(700px,1fr)]">
//       <div className="">
//         <ChatList />
//       </div>

//       <div className="">
//         <ChatDetail />
//       </div>
//     </div>
//   );
// };

// const ChatMobile = () => {
//   return (
//     <div className="w-full md:hidden">
//       <div>
//         <ChatList />
//       </div>

//       <div className="hidden">
//         <ChatDetail />
//       </div>
//     </div>
//   );
// };
export default Chat;
