import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera, ChevronLeft, Mic, MoreVertical, Phone, PlusCircle, Send, VideoIcon } from 'lucide-react';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { messagesEndpoint } from '../../utils/axios';
import { createMessage, readAllMessage } from '../../services/message.service';
import useAuth from '../../context/auth.context';
import { joinParty, sendMessage, socket, typing } from '../../services/socket.service';
import { IsTyping } from './is-typing';

interface Props {
  handleShowDetails: () => void;
  currentParty: any;
}
const ChatDetail = ({ handleShowDetails, currentParty }: Props) => {
  const [messages, setMessages] = useState<any>([]);

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

  if (!currentParty) return <span>Create a Chat Group</span>;
  if (isLoading) return <span>Loading....messages....</span>;
  if (isError) return <span>Error....messages.....</span>;

  return (
    <div className="flex flex-col h-[100vh]">
      <ChatDetailHeader handleShowDetails={handleShowDetails} currentParty={currentParty} />

      <section className="flex flex-col h-[93%]">
        <ChatBody messages={messages} currentParty={currentParty} />

        <ChatInputForm currentParty={currentParty} />
      </section>
    </div>
  );
};

const ChatDetailHeader = ({ handleShowDetails, currentParty }: { handleShowDetails: () => void; currentParty: any }) => {
  return (
    <div className="flex justify-between items-center shadow-md h-[7%] px-5 bg-cyan-500 dark:bg-cyan-800 text-white">
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

        <button>
          <VideoIcon size={30} className="fill-white stroke-white" />
        </button>
        <button>
          <MoreVertical size={30} className="fill-white stroke-white" />
        </button>
      </div>
    </div>
  );
};

const ChatBody = ({ messages, currentParty }: { messages: any[]; currentParty: any }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();
    joinParty(currentParty._id);

    socket.on('broadcastParty', (data: any) => {
      queryClient.invalidateQueries([messagesEndpoint, currentParty._id]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentParty]);

  if (messages.length === 0) return <div className="flex justify-center items-center h-full">Start chatting with friends</div>;

  return (
    <div className="flex flex-col gap-2 p-5 h-[100%] scroll-auto">
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
    <div className="flex items-center justify-center shadow-inner h-[10%] px-5 gap-3">
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
