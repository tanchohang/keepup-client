import { useEffect, useRef, useState } from 'react';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { hangup, socket } from '../../services/socket.service';
import { Phone, PhoneOff } from 'lucide-react';
import { CallControls } from './call-controls';
import useAuth, { AuthUser } from '../../context/auth.context';

interface Props {
  handleCancelVideoCall: () => void;
}
export const IncommingCall = ({ handleCancelVideoCall }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const { auth, setAuth } = useAuth();

  let localStream: MediaStream;
  let remoteStream: MediaStream;

  useEffect(() => {
    async function setRef() {
      localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      remoteStream = new MediaStream();

      localStream.getTracks().forEach((t) => {
        pc.addTrack(t, localStream);
      });

      pc.ontrack = (e) => {
        e.streams[0].getTracks().forEach((t) => {
          remoteStream.addTrack(t);
        });
        if (remoteVideoRef.current) {
          remoteVideoRef.current!.srcObject = remoteStream;
        }
      };

      if (remoteVideoRef.current) {
        localVideoRef.current!.srcObject = localStream;
      }

      setLoading(false);
      //   }
    }
    setRef();
    return () => {};
  });

  async function handleAnswerCall() {
    socket.on('onOffer', async (res: any) => {
      if (!pc.currentRemoteDescription && res) {
        await pc.setRemoteDescription(new RTCSessionDescription(res.offer));
        setAuth({ peerConnectionId: res.peer, ...auth } as AuthUser);
      }
    });
    const answer = await pc.createAnswer();
    setLoading(false);
  }

  return (
    <div className="h-full w-full bg-black relative flex justify-center items-center text-white">
      {/* LoadingState */}
      {isLoading ? (
        <div className="flex flex-col gap-20">
          <div>
            <article className="text-9xl h-[200px] w-[200px] flex justify-center items-center rounded-full  outline outline-1 ">U</article>
          </div>
          <div className=" bottom-[20%] flex justify-center w-full gap-4">
            <button
              className="rounded-full p-2 outline outline-1 bg-red-400"
              onClick={() => {
                //TODO:: hangup()
                localStream.getTracks().forEach((track) => {
                  if (track.enabled) {
                    track.stop();
                    track.enabled = false;
                  }
                });
                localVideoRef.current!.srcObject = null;
                handleCancelVideoCall();
              }}
            >
              <PhoneOff className="text-white" />
            </button>
            <button className="rounded-full p-2 outline outline-1 bg-green-400" onClick={handleAnswerCall}>
              <Phone className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <video className="w-[200px] h-[150px] bg-black outline outline-1" autoPlay playsInline ref={remoteVideoRef} />
          <video className="w-[200px] h-[150px] bg-black outline outline-1" autoPlay playsInline ref={localVideoRef} />
          <CallControls handleCancelVideoCall={handleCancelVideoCall} />
        </div>
      )}
    </div>
  );
};
