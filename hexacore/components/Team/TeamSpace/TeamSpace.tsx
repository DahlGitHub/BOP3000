import React, { useState } from "react";
import Drawer from "../../Drawer";
import { Collapse } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faCogs } from "@fortawesome/free-solid-svg-icons";
import AddToolModal from "./AddToolModal";


const TeamSpace = ({teamuid, name, teams, openModal}) => {

    const [isListOpen, setIsListOpen] = React.useState(true);

    function handleListOpen() {
        setIsListOpen(true);
    }

    function handleListClose() {
        setIsListOpen(false);
    }

    const MainContent = () => { 
        return(
            <div className="mx-10">
                <button type="button" onClick={() => handleModalOpen()} className="text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <FontAwesomeIcon className='pr-2' icon={faCogs}/>
                        
                        Add tool
                </button>
            </div>
        )
    }


    const teamDropdown = () => {
        return(
            <Collapse.Group accordion={false} className="w-fit">
                <Collapse title={
                    <button>
                        {name}
                    </button>
                }>
                <div>

                    <div>
                        <h1>Group 1</h1>
                    </div>

            
                    <div className='grid place-items-center mt-5'>
                        <button type="button"  className="text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            <FontAwesomeIcon className='pr-2' icon={faFolderPlus}/>
                            
                            Create a group
                        </button>
                    </div>
                        
                </div>
                </Collapse>                
            </Collapse.Group>
        )
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    return (
        <div className='h-[calc(100vh-70px)] bg-white  dark:text-white  dark:bg-gray-800'>
            <AddToolModal isOpen={isModalOpen} onClose={handleModalClose}/>    
        
            <div className='w-64'>
        
                
                <Drawer mainContent={<MainContent/>} title={teamDropdown()} isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
                
            </div>
        </div>
      )

}

export default TeamSpace