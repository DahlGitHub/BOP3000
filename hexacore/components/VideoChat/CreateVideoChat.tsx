import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import CreateVideoChatModal from "./CreateVideoChatModal";
import OT from "@opentok/client";

import { Dropdown } from "@nextui-org/react";
import VideoDevicesConfig from "./VideoDevicesConfig";

const CreateVideoChat = () => {

    const [roomNameState, setRoomNameState] = React.useState(null);
    const [windowLocation, setWindowLocation] = React.useState(null);
    
    const [showRoomNameConfig, setShowRoomNameConfig] = React.useState(true);

    
    
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }
    
    function handleModalClose() {
        setIsModalOpen(false);
    }

    function handleShowRoomNameConfig() {
        setShowRoomNameConfig(true);
    }
    
    function handleRoomConfigClose() {
        setShowRoomNameConfig(false);
    }

    

    

    const unsub = onSnapshot(doc(db, "rooms", "Test"), (doc) => {
        console.log("Current data: ", doc.data());
        if (doc.data().sessionId !== ""){
            console.log("Current data: ", doc.data());
            setWindowLocation(window.location)
            
            
            
            
        }
    });

    
    
    async function handleClick () {
        
        try {
            await setDoc(doc(db, "rooms", roomNameState), {
                apiKey: "47684721",
                sessionId: "1_MX40NzY4NDcyMX5-MTY3OTQxOTgzNTI1Mn5CKzNrTTRLRGtwd0V1WmpybFM1YUwreUl-fn4"
                
            });
            unsub()
            handleModalOpen()

            
            
        } catch (error) {
            console.error("Error creating room: ", error);
            
        }
    }

    
    
    return(
        <div className="bg-white dark:bg-gray-900 flex min-h-screen">
            <CreateVideoChatModal isOpen={isModalOpen} onClose={handleModalClose} location={windowLocation} roomName={roomNameState} showNext={handleRoomConfigClose} />
            <div className={`${showRoomNameConfig ? 'flex' : 'hidden'} `}>
                <div className="ml-40 mt-40 border border-gray h-fit p-10 rounded">
                    <h1 className="block mx-auto text-grey-900 dark:text-white text-center text-3xl font-bold mb-2">Create a room</h1>
                    <div className="m-5">
                        <label className='block mx-auto text-grey-900 dark:text-white text-xs font-bold mb-2' >What name should we give the room?</label>
                        <input type={"text"} onChange={e => { setRoomNameState(e.currentTarget.value); }} />
                    </div>
                    <div className="m-auto">
                        <button onClick={() => handleClick()} className="ml-10 mt-10 inline-flex justify-center max-w-40 rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                            Create room
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${showRoomNameConfig ? 'hidden' : 'flex'} `}>
                <VideoDevicesConfig roomName={roomNameState}/>
            </div> 
        </div>
    )
}

export default CreateVideoChat