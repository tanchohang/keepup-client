import { useEffect, useRef, useState } from 'react';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { socket } from '../../services/socket.service';
import { CallControls } from './call-controls';
import useAuth, { AuthUser } from '../../context/auth.context';

interface Props {
  handleCancelVideoCall: () => void;
  currentParty: any;
  iceCandidates: any;
  localStream: MediaStream;
}
export const OutgoingCall = ({ handleCancelVideoCall, currentParty, iceCandidates, localStream }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { auth, setAuth } = useAuth();

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const ansref = useRef<any>(null);

  useEffect(() => {
    socket.on('hungup', (data: any) => {
      if (localStream) {
        console.log('Cancelling');
        localStream.getTracks().forEach((track) => {
          track.enabled = false;
          track.stop();
        });
      }
    });
    socket.on('onAnswer', (answer) => {
      console.log('Received answer from client:', pc.signalingState);

      if (pc.localDescription && !pc.currentLocalDescription && !ansref.current) {
        console.log('localDescription persent');
        ansref.current = answer;
        pc.setRemoteDescription(new RTCSessionDescription(ansref.current))
          .then(() => {
            console.log('successfully set anser description');
            console.log('adding icecandidates');
            iceCandidates.forEach((candidate: any) => {
              pc.addIceCandidate(new RTCIceCandidate(candidate))
                .then(() => {
                  'icecandidate added';
                })
                .catch((error) => {
                  console.log('Error adding ICE candidate:', error);
                });
            });
          })
          .catch((error) => {
            console.error('Error setting remote description:', error);
          });
      }
    });

    if (localStream) {
      localVideoRef.current!.srcObject = localStream;

      pc.ontrack = (event) => {
        console.log('Received remote stream track:');
        setRemoteStream(event.streams[0]);
        setLoading(false);
      };
      if (remoteVideoRef.current) {
        remoteVideoRef.current!.srcObject = remoteStream;
      }
    }
    return () => {};
  }, [currentParty, localStream, remoteStream]);

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
        <div>
          <video className="w-[200px] h-[150px] bg-black outline outline-1 " autoPlay playsInline ref={remoteVideoRef} />
          <video className="w-[200px] h-[150px] bg-black outline outline-1 " autoPlay playsInline ref={localVideoRef} />
          <CallControls handleCancelVideoCall={handleCancelVideoCall} />
        </div>
      )}
    </div>
  );
};
