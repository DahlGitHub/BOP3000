import { useState } from "react";

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default () => {
const [isMuted, setIsMuted] = useState(false);
const pc = new RTCPeerConnection(configuration);
const [isConnected, setIsConnected] = useState(false);
const [showWebcam, setShowWebcam] = useState(false);
let localStream = null;
let remoteStream = null;

const joinRoom = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({video: showWebcam, audio: !isMuted})
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream)
  });

  remoteStream = new MediaStream()
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track)
    });
  };
}


  return(
    <div>
      <div>
        <button onClick={() => {
          setIsMuted(!isMuted)
        }}>Mute</button>
        <button onClick={() => {
          setShowWebcam(!showWebcam)
        }}>Webcam</button>
      </div>
    </div>
  )



}