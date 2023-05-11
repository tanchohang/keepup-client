import { useEffect, useRef, useState } from 'react';
import { PeerConnection as pc } from '../../services/webrtc.service';
import { hangup, socket } from '../../services/socket.service';
import { Phone, PhoneOff } from 'lucide-react';
import { CallControls } from './call-controls';

interface Props {
  handleCancelVideoCall: () => void;
  currentParty: any;
  offer: any;
  iceCandidates: any[];
}
export const IncommingCall = ({ handleCancelVideoCall, currentParty, offer, iceCandidates }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true })
    //   .then((stream) => {
    //     setLocalStream(stream);
    //   })
    //   .catch((error) => {
    //     console.log('Error accessing media devices:', error);
    //   });
  }, []);

  useEffect(() => {
    if (localStream) {
      pc.ontrack = (event) => {
        console.log('Received remote stream track:', event.streams[0]);
        setRemoteStream(event.streams[0]);
        setLoading(false);
      };

      if (remoteVideoRef.current) {
        console.log('Received remote video');
        remoteVideoRef.current!.srcObject = remoteStream;
      }
      if (localVideoRef.current) {
        localVideoRef.current!.srcObject = localStream;
      }
    }
    return () => {};
  }),
    [currentParty, offer, localStream, remoteStream];

  async function handleAnswerCall() {
    console.log('handleAnswerCall');
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((localStream) => {
        setLocalStream(localStream);
        localStream!.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
        let icecandidateArr: RTCIceCandidate[] = [];

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            icecandidateArr.push(event.candidate);
          } else {
            console.log('sendicecandidate', icecandidateArr);
            socket.emit('setAnswerCandidates', { id: currentParty, candidates: icecandidateArr });
          }
        };

        pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
          console.log('Successfully set offer description');
          pc.createAnswer()
            .then((answer) => pc.setLocalDescription(answer))
            .then(() => {
              if (pc.remoteDescription && pc.localDescription && iceCandidates.length > 0) {
                console.log('adding candidates');

                iceCandidates.forEach((candidate) => {
                  pc.addIceCandidate(candidate)
                    .then(() => {
                      'icecandidate added successfully';
                    })
                    .catch((error) => {
                      console.error('Error adding ICE candidate:', error);
                    });
                });
              }
              socket.emit('setAnswer', { id: currentParty, answer: pc.localDescription }, (res: any) => {});
            })
            .catch((err) => {
              console.log('error creating answer', err);
            });
        });
      })
      .catch((error) => {
        console.log('Error accessing media devices:', error);
      });
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
                // localStream.getTracks().forEach((track) => {
                //   if (track.enabled) {
                //     track.stop();
                //     track.enabled = false;
                //   }
                // });
                // localVideoRef.current!.srcObject = null;
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
