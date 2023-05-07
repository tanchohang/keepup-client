import { useEffect, useRef, useState } from 'react';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { socket } from '../../services/socket.service';
import { CallControls } from './call-controls';

interface Props {
  handleCancelVideoCall: () => void;
}
export const OutgoingCall = ({ handleCancelVideoCall }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  useEffect(() => {
    async function setRef() {
      localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      remoteStream = new MediaStream();

      // localStream.getTracks().forEach((t) => {
      //   pc.addTrack(t, localStream);
      // });

      // pc.ontrack = (e) => {
      //   e.streams[0].getTracks().forEach((t) => {
      //     remoteStream.addTrack(t);
      //   });
      //   remoteVideoRef.current!.srcObject = remoteStream;
      // };

      if (localVideoRef.current) {
        localVideoRef.current!.srcObject = localStream;
      }
    }
    setRef();
  });

  return (
    <div className="h-full w-full bg-black relative flex justify-center items-center text-white">
      {/* LoadingState */}
      {isLoading ? (
        <div className="flex flex-col gap-20">
          <div>
            <article className="text-9xl h-[200px] w-[200px] flex justify-center items-center rounded-full  outline outline-1 ">U</article>
          </div>
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={localVideoRef} />
          <CallControls
            handleCancelVideoCall={() => {
              localStream.getTracks().forEach((track) => {
                if (track.enabled) {
                  track.stop();
                  track.enabled = false;
                }
              });
              localVideoRef.current!.srcObject = null;

              handleCancelVideoCall();
            }}
          />
        </div>
      ) : (
        <>
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={remoteVideoRef} />
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={localVideoRef} />
        </>
      )}
    </div>
  );
};
