import { ChatDetail } from '../components/chat/chat-detail';
import { ChatList } from '../components/chat/chat-list';
import { useState } from 'react';
import { ChantMiniContextProvider } from '../context/chat-mini.context';
import { PartyFormContextProvider } from '../context/create-party-form.context';
import { CreatePartyForm } from '../components/chat/create-party-form';

import { circlesEndpoint } from '../utils/axios';
import { readAllCircle } from '../services/circle.service';
import { useQuery } from 'react-query';
import { partiesEndpoint } from '../utils/axios';
import { readAllParty } from '../services/party.service';
import useAuth from '../context/auth.context';

interface Props {}

const Chat = (props: Props) => {
  const [parties, setParties] = useState<any>([]);
  const { auth } = useAuth();

  const {
    isIdle,
    isLoading: parrtyLoading,
    error: partyError,
    data: partyRes,
  } = useQuery(
    [partiesEndpoint, auth?.circle],
    async () => {
      const p = readAllParty(auth?.circle as string);
      setParties((await p).data);
    },
    { enabled: !!auth?.circle }
  );

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const submitHandler = (formdata: any) => {
    console.log(formdata);
  };

  if (parrtyLoading) return <div>Loading......</div>;
  if (partyError) return <div>'An error has occurred: ' + {partyError + ''}</div>;

  return (
    <ChantMiniContextProvider>
      <div className="flex md:block">
        <div className=" grid md:grid-cols-[minmax(max-content,40%),minmax(700px,1fr)] w-full">
          <div className="relative">
            <ChatList
              handleCreateButton={() => {
                setShowForm(true);
              }}
              handleShowDetails={() => {
                setShowDetail(true);
              }}
              parties={parties}
            />
            {showForm && (
              <PartyFormContextProvider>
                <CreatePartyForm className="absolute inset-0 p-5 z-50 bg-white" onCancel={() => setShowForm(false)} onFormSubmit={submitHandler} />
              </PartyFormContextProvider>
            )}
          </div>
          <div className={`${showDetail ? 'block' : 'hidden'} absolute bg-white inset-0 md:static md:block`}>
            <ChatDetail handleShowDetails={() => setShowDetail(false)} />
          </div>
        </div>
      </div>
    </ChantMiniContextProvider>
  );
};

export default Chat;
