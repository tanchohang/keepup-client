import { useEffect, useRef, useState } from 'react';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { socket } from '../../services/socket.service';
import { CallControls } from './call-controls';
import useAuth, { AuthUser } from '../../context/auth.context';

interface Props {
  handleCancelVideoCall: () => void;
  currentParty: any;
  iceCandidates: any;
}
export const OutgoingCall = ({ handleCancelVideoCall, currentParty, iceCandidates }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { auth, setAuth } = useAuth();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const ansref = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => {
        console.log('Error accessing media devices:', error);
      });
  }, []);

  useEffect(() => {
    socket.on('onAnswer', (answer) => {
      console.log('Received answer from client:');

      if (pc.localDescription && !pc.remoteDescription && !ansref.current) {
        console.log('localDescription persent');
        ansref.current = answer;
        console.log(ansref.current);
        pc.setRemoteDescription(new RTCSessionDescription(answer))
          .then(() => {
            if (pc.remoteDescription && pc.localDescription && iceCandidates.length > 0) {
              console.log('successfully set anser description');
              console.log('adding icecandidates');
              console.log(iceCandidates);
              iceCandidates.forEach((candidate: any) => {
                pc.addIceCandidate(new RTCIceCandidate(candidate))
                  .then(() => {
                    'icecandidate added';
                  })
                  .catch((error) => {
                    console.log('Error adding ICE candidate:', error);
                  });
              });
            }
          })
          .catch((error) => {
            console.error('Error setting remote description:', error);
          });
      }
    });
    // socket.on('onAnswerCandidates', (candidates: any[]) => {
    //   console.log('Received ICE candidate:');
    //   candidates.forEach((candidate) => {
    //     pc.addIceCandidate(new RTCIceCandidate(candidate))
    //       .then(() => {
    //         console.log('icecandidate added to connection');
    //       })
    //       .catch((error) => {
    //         console.log('Error adding ICE candidate:', error);
    //       });
    //   });
    // });

    if (localStream) {
      let icecandidates: RTCIceCandidate[] = [];

      localVideoRef.current!.srcObject = localStream;

      pc.ontrack = (event) => {
        console.log('Received remote stream:', event.streams);
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current!.srcObject = remoteStream;
      };

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track);
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
    }
    return () => {};
  }, [currentParty, localStream]);

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
