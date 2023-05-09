import { useEffect, useRef, useState } from 'react';
import { getLocalStream, PeerConnection as pc } from '../../services/webrtc.service';
import { call, socket } from '../../services/socket.service';
import { CallControls } from './call-controls';
import useAuth, { AuthUser } from '../../context/auth.context';

interface Props {
  handleCancelVideoCall: () => void;
  currentParty: any;
}
export const OutgoingCall = ({ handleCancelVideoCall, currentParty }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { auth, setAuth } = useAuth();
  let localStream: MediaStream;
  let remoteStream: MediaStream;
  const icecandidates: RTCIceCandidate[] = [];

  useEffect(() => {
    async function setRef() {
      localStream = await getLocalStream();
      remoteStream = new MediaStream();

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      pc.onicecandidate = async (e) => {
        if (e.candidate) {
          icecandidates.push(e.candidate);
          console.log(e.candidate);
        } else {
          socket.emit('setOfferCandidates', { id: currentParty._id, candidates: icecandidates }, (res: any) => {});
        }
      };

      pc.ontrack = (e) => {
        console.log('ontrack');
        // e.streams[0].getTracks().forEach((t) => {
        //   remoteStream.addTrack(t);
        // });

        if (remoteVideoRef.current) {
          setLoading(false);
          remoteVideoRef.current!.srcObject = e.streams[0];
        }
        // remoteVideoRef.current?.srcObject = e.streams[0];
      };

      // socket.on('onAnswer', async (res: any) => {
      //   if (!pc.currentRemoteDescription && res) {
      //     const answerDescription = new RTCSessionDescription(res);
      //     await pc.setRemoteDescription(answerDescription);

      //     console.log('answerDescription', pc.remoteDescription, res);
      //   }
      // });

      if (localVideoRef.current) {
        localVideoRef.current!.srcObject = localStream;
      }
    }
    setRef();

    return () => {};
  }, [currentParty._id]);

  return (
    <div className="h-full w-full bg-black relative flex justify-center items-center text-white">
      {/* LoadingState */}
      {isLoading ? (
        <div className="flex flex-col gap-20">
          <div>
            <article className="text-9xl h-[200px] w-[200px] flex justify-center items-center rounded-full  outline outline-1 ">U</article>
          </div>
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={localVideoRef} />
          <CallControls handleCancelVideoCall={handleCancelVideoCall} />
        </div>
      ) : (
        <>
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={remoteVideoRef} />
          <video className="w-[200px] h-[150px] bg-black outline outline-1 absolute right-10 bottom-10" autoPlay playsInline ref={localVideoRef} />
          <CallControls handleCancelVideoCall={handleCancelVideoCall} />
        </>
      )}
    </div>
  );
};
