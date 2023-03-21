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
                    
                }
            });
        } catch (error) {
            console.error("Error creating room: ", error);
            
        }
    }
    
    return(
        <div className="bg-white dark:bg-gray-900 flex min-h-screen">
            <CreateVideoChatModal isOpen={isModalOpen} onClose={handleModalClose} location={windowLocation} roomName={roomNameState}/>
            <div className="m-20">
            <label className='block uppercase mx-auto text-grey-900 dark:text-white text-xs font-bold mb-2' >What name should we give the room?</label>
                <input type={"text"} onChange={e => { setRoomNameState(e.currentTarget.value); }} ></input>
                <button className="text-white bg-white">Hei</button>
            </div>
        </div>
    )
}

export default CreateVideoChat