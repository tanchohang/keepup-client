import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  handleCancelVideoCall: () => void;
}
export const CallControls = ({ handleCancelVideoCall }: Props) => {
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  return (
    <div className=" bottom-[20%] flex justify-center w-full gap-4">
      <button
        className="rounded-full p-2 outline outline-1"
        onClick={() => {
          setIsCameraOn(!isCameraOn);
        }}
      >
        {isCameraOn ? <Video /> : <VideoOff className="text-red-400" />}
      </button>
      <button
        className="rounded-full p-2 outline outline-1 "
        onClick={() => {
          setIsMute(!isMute);
        }}
      >
        {isMute ? <MicOff className="text-red-400" /> : <Mic />}
      </button>
      <button className="rounded-full p-2 outline outline-1 bg-red-400" onClick={handleCancelVideoCall}>
        <PhoneOff className="text-white" />
      </button>
    </div>
  );
};
