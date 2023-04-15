import { Camera, ChevronLeft, Mic, MoreVertical, Phone, PlusCircle, Send, VideoIcon } from 'lucide-react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {}
const ChatDetail = (props: Props) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <ChatHeader />

      <section className="flex flex-col h-[93%]">
        <ChatBody />

        <ChatInputForm />
      </section>
    </div>
  );
};

const ChatHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center shadow-md h-[7%] px-5 bg-cyan-500 text-white">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={40} />
        </button>
        <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={40} />
        <span className="text-lg font-semibold">Name here</span>
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

const ChatBody = () => {
  return (
    <div className="overflow-auto p-5 h-[100%]">
      <p>
        Ut magna et eu et voluptate laborum officia veniam proident consequat pariatur ea ut cillum. Velit non occaecat dolor minim voluptate labore
        et nisi Lorem nulla anim id non. Officia cupidatat in voluptate laboris ullamco incididunt officia quis. Nulla nulla aliquip et ad ullamco
        sint exercitation ea.
      </p>
    </div>
  );
};

const ChatInputForm = () => {
  function handleSendFile(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleCamera(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleSendVoiceRecording(event: any): void {
    throw new Error('Function not implemented.');
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    throw new Error('Function not implemented.');
  }

  function handleKeyUp(event: KeyboardEvent<HTMLTextAreaElement>): void {
    throw new Error('Function not implemented.');
  }

  function handleSendMessage(event: any): void {
    throw new Error('Function not implemented.');
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
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />

      <button onClick={handleSendMessage}>
        <Send size={30} className=" fill-cyan-500 text-white" />
      </button>
    </div>
  );
};

export { ChatDetail };
