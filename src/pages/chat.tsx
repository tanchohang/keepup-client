import { ChatDetail } from '../components/chat/chat-detail';
import { ChatList } from '../components/chat/chat-list';
import { useState } from 'react';
import { ChantMiniContextProvider } from '../context/chat-mini.context';
import { PartyFormContextProvider } from '../context/create-party-form.context';
import { CreatePartyForm } from '../components/chat/create-party-form';
import { messagesEndpoint, partiesEndpoint } from '../utils/axios';
import { readAllParty } from '../services/party.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {}

const Chat = (props: Props) => {
  const [parties, setParties] = useState<any[]>([]);
  const [currentParty, setCurrentParty] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [partiesEndpoint],
    queryFn: async () => await readAllParty(),
    onSuccess: (data) => {
      setParties(data);
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  if (isLoading) return <span>Loading....</span>;
  if (!data) return <span>Create a new chat and add friends</span>;

  return (
    <ChantMiniContextProvider>
      <div className="flex md:block">
        <div className=" grid md:grid-cols-[minmax(max-content,40%),minmax(500px,1fr)] w-full">
          <div className="relative">
            <ChatList
              handleCreateButton={() => {
                setShowForm(true);
              }}
              handleShowDetails={(party: any) => {
                setShowDetail(true);

                setCurrentParty(party);
                queryClient.invalidateQueries([messagesEndpoint]);
              }}
              parties={parties}
            />
            {showForm && (
              <PartyFormContextProvider>
                <CreatePartyForm className="absolute inset-0 p-5 z-50 bg-white" onCancel={() => setShowForm(false)} />
              </PartyFormContextProvider>
            )}
          </div>
          <div className={`${showDetail ? 'block' : 'hidden'} absolute bg-white inset-0 md:static md:block`}>
            <ChatDetail handleShowDetails={() => setShowDetail(false)} currentParty={currentParty ? currentParty : parties[0]} />
          </div>
        </div>
      </div>
    </ChantMiniContextProvider>
  );
};

export default Chat;
