import { Dropdown } from "@nextui-org/react"
import VideoExpress from "@vonage/video-express"
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import VideoChat from "./VideoChat";


const VideoDevicesConfig = ({roomName}) => {
  const [audioDropdown, setAudioDropdown] = React.useState(null);
  const [videoDropdown, setVideoDropdown] = React.useState(null);
  const [audioDevices, setAudioDevices] = React.useState([]);
  const [videoDevices, setVideoDevices] = React.useState([]);
  const [apiKeyState, setApiKeyState] = React.useState(null);
  const [sessionIdState, setSessionIdState] = React.useState(null);

  const apiKey = "47684721";
  const sessionId = "2_MX40NzY4NDcyMX5-MTY3OTk5Nzg5ODI5OH5BTkd0bW5FSlNBMWVya2dMdVplVzU3dlV-fn4";
  const token = "T1==cGFydG5lcl9pZD00NzY4NDcyMSZzaWc9ZTM4YWMyZDJiZTIwYTNmZjhmMmYyZjM5ODVkNDEyZDEyMzA2NmEwMjpzZXNzaW9uX2lkPTJfTVg0ME56WTRORGN5TVg1LU1UWTNPVGs1TnpnNU9ESTVPSDVCVGtkMGJXNUZTbE5CTVdWeWEyZE1kVnBsVnpVM2RsVi1mbjQmY3JlYXRlX3RpbWU9MTY3OTk5NzkzMyZub25jZT0wLjg5MTA1NzE2Njc3MjUxNzEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY4MjU4OTkzMSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

  const [showRoom, setShowRoom] = React.useState(false);

  const [name, setName] = React.useState(null);
  
  function handleAudioDeviceChange(deviceId) {
      setAudioDevices(deviceId);
  }
  
    function handleVideoDeviceChange(deviceId) {
      setVideoDevices(deviceId);
  }

  function handleShowRoom() {
    setShowRoom(true);
  }

  function handleHideRoom() {
    setShowRoom(false);
  }

  async function getChat() {
    try {
        const docSnap = await getDoc(doc(db, "rooms", roomName));
        if (docSnap.exists()) {
          console.log("Room data: ", docSnap.data());
          setApiKeyState(docSnap.data().apiKey) 
          setSessionIdState(docSnap.data().sessionId)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! ");
        }
      } catch (error) {
        console.error("Error getting room data: ",error);
      }
  }

  const getDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      stream.getTracks().forEach((track) => track.stop());

      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind.toLowerCase() === 'audioinput');
      const videoDevices = devices.filter((device) => device.kind.toLowerCase() === 'videoinput');

      const audioOptions = audioDevices.map((device) => (
        <Dropdown.Item className="h-fit" key={device.deviceId}>
          <button onClick={() => handleAudioDeviceChange(device.deviceId)}>{device.label || `Microphone ${audioDevices.indexOf(device) + 1}`}</button>
        </Dropdown.Item>
      ));

      const videoOptions = videoDevices.map((device) => (
        <Dropdown.Item className="h-fit" key={device.deviceId}>
          <button onClick={() => handleVideoDeviceChange(device.deviceId)}>{device.label || `Camera ${videoDevices.indexOf(device) + 1}`}</button>
        </Dropdown.Item>
      ));

      setAudioDevices(audioDevices);
      setVideoDevices(videoDevices);

      setAudioDropdown(
        <Dropdown.Menu aria-label="Audio devices" color="secondary">
          {audioOptions.length > 0 ? audioOptions : <Dropdown.Item>No audio devices found</Dropdown.Item>}
        </Dropdown.Menu>
      );

      setVideoDropdown(
        <Dropdown.Menu aria-label="Video devices" color="secondary">
          {videoOptions.length > 0 ? videoOptions : <Dropdown.Item>No video devices found</Dropdown.Item>}
        </Dropdown.Menu>
      );
    } catch (error) {
      console.error(error);
      setAudioDropdown(<Dropdown.Item>Error loading audio devices</Dropdown.Item>);
      setVideoDropdown(<Dropdown.Item>Error loading video devices</Dropdown.Item>);
    }
  };
  
  React.useEffect(() => {

    getDevices();

  }, []);

  

  return (
    <div>
      <div className={`${showRoom ? 'hidden' : 'flex'} `}>
        <div className="mt-40 ml-40 bg-white h-fit v-fit p-10 rounded">
          <div className="mx-auto w-fit">
            <h1 className="text-lg leading-6 font-medium text-gray-900 text-center mx-auto">
            Welcome to the room
            </h1>
            <div className="m-10">
              <div className="m-5 grid">
                <label className="m-auto p-3">Enter your name:</label>
                <input type={"text"} placeholder="Name" onChange={e => { setName(e.currentTarget.value); }} className="border border-gray m-auto"/>
              </div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Select audio and video device for the call
              </h2>
              <div className="mx-auto w-fit my-5">
                  <Dropdown>
                      <Dropdown.Trigger>
                          <button className="mx-auto justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">Select audio device</button>
                      </Dropdown.Trigger>
                      {audioDropdown}
                  </Dropdown>
              </div>
              <div className="mx-auto w-fit my-5">
                  <Dropdown>
                      <Dropdown.Trigger>
                          <button className="mx-auto justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">Select video device</button>
                      </Dropdown.Trigger>
                      {videoDropdown}
                  </Dropdown>
              </div>
            </div>
              <div className="justify-center w-fit mx-auto">
                  <button onClick={() => handleShowRoom()} className="mx-auto justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                      Go to room
                  </button>
              </div>
            </div>
        </div>
      </div>
      <div className={`${showRoom ? 'flex' : 'hidden'} `}>
        <VideoChat audioDevices={audioDevices} videoDevices={videoDevices} roomName={roomName} apiKey={apiKey} sessionId={sessionId} token={token} participantName={name}/>
      </div>
    </div>
  )


}

export default VideoDevicesConfig