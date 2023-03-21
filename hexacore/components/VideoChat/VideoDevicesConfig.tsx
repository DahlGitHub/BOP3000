import { Dropdown } from "@nextui-org/react"
import VideoExpress from "@vonage/video-express"


export const VideoDevicesConfig = () => {

    /*
    const loadAVSources = async() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log("enumerateDevices() not supported.");
          return;
        }
        try {
          // Need to ask permission in order to get access to the devices to be able to list them in the dropdowns.
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          stream.getTracks().forEach(track => track.stop());
          let audioCount = 0;
          let videoCount = 0;
          const devices = await VideoExpress.getDevices();
          devices.forEach(function(device) {
            if (device.kind.toLowerCase() === 'audioinput') {
              audioCount += 1;
              audioSelector.innerHTML += `<option value="${device.deviceId}">${device.label || device.kind + audioCount}</option>`;
            }
            if (device.kind.toLowerCase() === 'videoinput') {
              videoCount += 1;
              videoSelector.innerHTML += `<option value="${device.deviceId}">${device.label || device.kind + audioCount}</option>`;
            }
          });
          audioSelector.innerHTML += `<option value="">No audio</option>`;
          videoSelector.innerHTML += `<option value="">No video</option>`;
        } catch (error) {
          console.error("error loading AV sources: ", error)
        }
      }
      */

    return(
        <div className="mt-40 ml-40 bg-white h-fit v-fit p-10 rounded">
                    <div className="mx-auto w-fit">
                        <h1 className="text-lg leading-6 font-medium text-gray-900 text-center mx-auto">Welcome to the room</h1>
                        <div className="m-10">
                            
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Select audio and video device for the call</h2>
                            <div className="mx-auto w-fit my-5">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                            Select microphone
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu aria-label="User menu actions" color="secondary">
                                        <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                            <button>Microphone 1</button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="mx-auto justify-center w-fit">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                            Select webcam
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu aria-label="User menu actions" color="secondary">
                                        <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                            <button>Webcam 1</button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="justify-center w-fit mx-auto">
                            <button className="mx-auto justify-center rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Go to room
                            </button>
                        </div>
                    </div>
                </div>
    )


}