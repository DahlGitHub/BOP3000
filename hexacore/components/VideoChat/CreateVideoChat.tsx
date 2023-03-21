import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import CreateVideoChatModal from "./CreateVideoChatModal";

const CreateVideoChat = () => {

    const [roomNameState, setRoomNameState] = React.useState(null);
    const [windowLocation, setWindowLocation] = React.useState(null);
    
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function handleModalOpen() {
        setIsModalOpen(true);
      }
    
      function handleModalClose() {
        setIsModalOpen(false);
      }
    
    async function handleClick () {
        const roomName = roomNameState.value.replaceAll(' ', '_');
        
   
        
        try {
            await setDoc(doc(db, "rooms", roomName), {
                apiKey: "",
                sessionId: ""
            });
            const unsub = onSnapshot(doc(db, "rooms", roomName), (doc) => {
                console.log("Current data: ", doc.data());
                if (doc.data().sessionId !== ""){
                    console.log("Current data: ", doc.data());
                    
                    setRoomNameState(roomName)
                    setWindowLocation(window.location)
                    handleModalOpen
                    
                }
            });
        } catch (error) {
            console.error("Error creating room: ", error);
            
        }
    }
    
    return(
        <div className="bg-white dark:bg-gray-900 flex min-h-screen">
            <CreateVideoChatModal isOpen={isModalOpen} onClose={handleModalClose} location={windowLocation} roomName={roomNameState}/>
            <div className="m-auto">
                <div className="m-5">
                    <label className='block mx-auto text-grey-900 dark:text-white text-xs font-bold mb-2' >What name should we give the room?</label>
                    <input type={"text"} onChange={e => { setRoomNameState(e.currentTarget.value); }} />
                </div>
                <div className="m-5">
                    <button onClick={() => handleModalOpen()} className="ml-10 mt-10 inline-flex justify-center max-w-40 rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                        Create room
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateVideoChat