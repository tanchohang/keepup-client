// const openMediaDevices = async (options: any) => await navigator.mediaDevices.getUserMedia(options);

// export const videoStream = async () => {
//   try {
//     const video = await openMediaDevices({
//       video: {
//         width: { min: 200 },
//         height: { min: 200 },
//       },
//       audio: true,
//     });
//     return video;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getLocalStream = async () => {
  return await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
};

export const PeerConnection = new RTCPeerConnection({
  iceServers: [{ urls: ['stun:stun1.l.google.com:19302'] } as RTCIceServer],
  iceCandidatePoolSize: 10,
});
