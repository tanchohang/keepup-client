import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera, ChevronLeft, Mic, Phone, PlusCircle, Send, VideoIcon } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { messagesEndpoint } from '../../utils/axios';
import { readAllMessage } from '../../services/message.service';
import * as partyService from '../../services/party.service';
import useAuth from '../../context/auth.context';
import { joinParty, sendMessage, socket, typing } from '../../services/socket.service';
import { IsTyping } from './is-typing';
import { OutgoingCall } from './outgoing-call';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { IncommingCall } from './incoming-call';
import { ChatDropdown } from './chat-dropdown';

interface Props {
  handleShowDetails: () => void;
  currentParty: any;
}
const ChatDetail = ({ handleShowDetails, currentParty }: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const [isOutgoing, setIsOutgoing] = useState<boolean>(false);
  const [videoCall, setVideoCall] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [offer, setOffer] = useState(null);
  const [iceCandidates, setIceCandidates] = useState<any>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [messagesEndpoint, currentParty?._id],
    queryFn: async () => {
      return await readAllMessage(currentParty?._id);
    },
    onSuccess: (data: any) => {
      setMessages(data);
    },
    enabled: !!currentParty,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    joinParty(currentParty?._id);

    socket.on('incomingCall', ({ peer, offer }: any) => {
      setVideoCall(true);
      setIsOutgoing(false);
      setOffer(offer);
      console.log('Received call from client:');
    });

    socket.on('onAnswerIceCandidates', (candidates: any[]) => {
      console.log('Received ICE candidate');
      setIceCandidates(candidates);
    });
    socket.on('onOfferIceCandidates', (candidates: any[]) => {
      console.log('Received ICE candidate');
      setIceCandidates(candidates);
    });

    socket.on('broadcastParty', (data: any) => {
      queryClient.invalidateQueries([messagesEndpoint, currentParty._id]);

      //WEBRTC
    });
  }, [currentParty]);

  async function VideoCallHandler() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((localStream) => {
        setLocalStream(localStream);
        let icecandidates: RTCIceCandidate[] = [];

        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            icecandidates.push(event.candidate);
          } else {
            console.log('sending icecandidates', icecandidates);
            socket.emit('setOfferCandidates', { id: currentParty, candidates: icecandidates });
          }
        };

        pc.createOffer()
          .then((resOffer: any) => pc.setLocalDescription(resOffer))
          .then(() => {
            socket.emit('call', { pid: currentParty, offer: pc.localDescription }, (res: any) => {
              console.log('offer success');
            });
          });
        setIsOutgoing(true);
        setVideoCall(true);
      })
      .catch((error) => {
        console.log('Error accessing media devices:', error);
      });
  }

  function cancelVideoCallHandler(): void {
    if (localStream) {
      console.log('Cancelling');
      localStream.getTracks().forEach((track) => {
        track.enabled = false;
        track.stop();
      });
    }
    setIsOutgoing(false);
    setVideoCall(false);
    socket.emit('removePeer', { id: currentParty._id });
  }

  async function deletePartyHandler() {
    await partyService.deleteParty(currentParty._id);
  }

  async function leavePartyHandler() {}

  if (!currentParty) return <span>Create a Chat Group</span>;
  if (isLoading) return <span>Loading....messages....</span>;
  if (isError) return <span>Error....messages.....</span>;

  return (
    <div className="flex flex-col bg-white md:h-screen h-full relative">
      <ChatDetailHeader
        handleShowDetails={handleShowDetails}
        currentParty={currentParty}
        handleVideoCall={VideoCallHandler}
        handleDeleteParty={deletePartyHandler}
        handleLeaveParty={leavePartyHandler}
      />

      <section className="flex flex-col h-full overflow-auto">
        <ChatBody messages={messages} currentParty={currentParty} />
        <ChatInputForm currentParty={currentParty} />
      </section>

      {videoCall && (
        <section className="absolute inset-0 bg-black">
          {isOutgoing ? (
            <OutgoingCall
              currentParty={currentParty._id}
              handleCancelVideoCall={cancelVideoCallHandler}
              iceCandidates={iceCandidates}
              localStream={localStream!}
            />
          ) : (
            <IncommingCall
              currentParty={currentParty._id}
              handleCancelVideoCall={cancelVideoCallHandler}
              offer={offer}
              iceCandidates={iceCandidates}
            />
          )}
        </section>
      )}
    </div>
  );
};

const ChatDetailHeader = ({
  handleShowDetails,
  currentParty,
  handleVideoCall,
  handleDeleteParty,
  handleLeaveParty,
}: {
  handleShowDetails: () => void;
  handleVideoCall: () => void;
  handleDeleteParty: () => void;
  handleLeaveParty: () => void;
  currentParty: any;
}) => {
  return (
    <div className="flex justify-between items-center shadow-md px-5 py-3  bg-cyan-500 dark:bg-cyan-800 text-white">
      <div className="flex items-center gap-3">
        <button onClick={handleShowDetails} className="md:hidden">
          <ChevronLeft size={40} />
        </button>
        <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={40} />
        <span className="text-lg font-semibold">{currentParty.name}</span>
      </div>
      <div className="flex justify-center items-center gap-8">
        <button>
          <Phone size={30} className="fill-white stroke-none" />
        </button>

        <button onClick={handleVideoCall}>
          <VideoIcon size={30} className="fill-white stroke-white" />
        </button>
        <ChatDropdown deleteParty={handleDeleteParty} leaveParty={handleLeaveParty} />
      </div>
    </div>
  );
};

const ChatBody = ({ messages, currentParty }: { messages: any[]; currentParty: any }) => {
  const { auth } = useAuth();

  if (messages.length === 0) return <div className="flex justify-center items-center h-full">Start chatting with friends</div>;

  return (
    <div className="flex flex-col gap-2 p-5 py-16 overflow-auto max-h-screen min-h-[90%]">
      {messages.map((message: any) => (
        <div key={message._id}>
          <ChatBubble isMyMessage={message.sender === auth?.id} message={message.text} />
        </div>
      ))}
      <IsTyping />
    </div>
  );
};

const ChatInputForm = ({ currentParty }: { currentParty: any }) => {
  const textareatRef = useRef<HTMLTextAreaElement>(null);

  function handleSendFile(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleCamera(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleSendVoiceRecording(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    typing(currentParty._id); //TODO:buffer the typing
  }

  function handleSendMessage(event: any): void {
    sendMessage(textareatRef.current!.value, currentParty._id);
    textareatRef.current!.value = '';
  }

  return (
    <div className="flex items-center justify-center shadow-inner p-3 pb-0 gap-3">
      <div className="flex items-center gap-3">
        <button onClick={handleSendFile}>
          <PlusCircle size={35} className="fill-cyan-500 stroke-white" />
        </button>
        <button onClick={handleCamera}>
          <Camera size={40} className="fill-cyan-500 stroke-white" />
        </button>
        <button onClick={handleSendVoiceRecording}>
          <Mic size={30} className="stroke-cyan-500 stroke-[3px]" />
        </button>
      </div>
      <textarea
        placeholder="enter message"
        rows={1}
        className="w-[100%] appearance-none resize-none focus:outline-none bg-slate-100 text-lg p-3 rounded-lg"
        onKeyDown={handleKeyDown}
        ref={textareatRef}
      />

      <button onClick={handleSendMessage}>
        <Send size={30} className=" fill-cyan-500 text-white" />
      </button>
    </div>
  );
};

const ChatBubble = ({ isMyMessage, message }: { isMyMessage: boolean; message: string }) => {
  return (
    <div className={`flex ${isMyMessage ? 'flex-row-reverse' : 'flex-row'} text-white font-normal w-full `}>
      <p className={`${isMyMessage ? ' bg-blue-700' : 'bg-emerald-600'} rounded-3xl p-3 w-[60%] max-w-max `}>{message}</p>
    </div>
  );
};

export { ChatDetail };
