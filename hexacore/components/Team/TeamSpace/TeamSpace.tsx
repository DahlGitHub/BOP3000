import React, { useEffect, useState } from "react";
import Drawer from "../../Drawer";
import { Collapse } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faCogs, faBackward } from "@fortawesome/free-solid-svg-icons";
import AddToolModal from "./Tools/AddToolModal";
import AddMembersModal from "./AddMembersModal";
import { useRouter } from "next/router";


const TeamSpace = ({teamuid, name, teams, fetchTeamMembers, openModal, clearTeam, selectFiles, tools, fetchTools, isMemberModalOpen, memberModalOnClose}) => {

    const [isListOpen, setIsListOpen] = React.useState(true);
    
    

    function handleListOpen() {
        setIsListOpen(true);
    }

    function handleListClose() {
        setIsListOpen(false);
    }
    
    const teamDropdown = () => {
        return(
            <Collapse.Group accordion={false} className="w-fit">
                <Collapse title={
                    <button className="text-xl">
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

    const MainContent = () => { 
        return(
            <div>
                
                {teamDropdown()}
                <div className="m-5">
                    <h1 className="text-xl">Tools:</h1>
                    {tools}
                </div>
                <button type="button" onClick={() => handleModalOpen()} className="m-5 text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <FontAwesomeIcon className='pr-2' icon={faCogs}/>
                        
                        Add tool
                </button>
            </div>
                
        )
    }


    

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
        fetchTools()
    }

    const push = async() => {
        await clearTeam()
    }
    

    return (
        <div className='h-[calc(100vh-70px)] bg-white  dark:text-white  dark:bg-gray-800'>
            <AddToolModal isOpen={isModalOpen} onClose={handleModalClose} teamuid={teamuid}/>
            <AddMembersModal isOpen={isMemberModalOpen} onClose={memberModalOnClose} teamuid={teamuid}/>
            
                <div className='w-64'>
            
                    
                    <Drawer mainContent={<MainContent/>} 
                        title={
                            <div className="cursor-pointer text-xs bg-blue-500 hover:bg-blue-700 text-white w-fit font-bold py-2 px-2 ml-20 rounded" onClick={() => push()}>
                                Back to Teams <FontAwesomeIcon className='' icon={faBackward}/>
                            </div>
                        } 
                        isOpen={isListOpen} open={handleListOpen} close={handleListClose} 
                    />
                    
                </div>
        </div>
      )

}

export default TeamSpace