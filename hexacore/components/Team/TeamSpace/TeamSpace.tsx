import React, { useEffect, useState } from "react";
import Drawer from "../../Drawer";
import { Collapse } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faCogs, faBackward, faPeopleGroup, faWrench } from "@fortawesome/free-solid-svg-icons";
import AddToolModal from "./Tools/AddToolModal";
import AddMembersModal from "./AddMembersModal";
import TeamSpaceSettings from "./Tools/TeamSpaceSettings";


const TeamSpace = ({teamuid, name, clearTeam, alertInviteSuccess,tools, fetchTools, 
    isMemberModalOpen, memberModalOnClose, setShowTeamMembers, showTeamMembers, setSelectedTool, selectedToolName}) => {

    const [isListOpen, setIsListOpen] = React.useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    const handleSettingsOpen = () => {
        setIsSettingsOpen(!isSettingsOpen);
    }

    function handleListOpen() {
        setIsListOpen(true);
    }

    function handleListClose() {
        setIsListOpen(false);
    }
    
    const teamDropdown = () => {
        return(
            <div className="text-xl mx-5">
                {name}
            </div>
        )
    }

    const MainContent = () => { 
        return(
            <div>
                
                {teamDropdown()}
                <div className="m-5">
                    <h1 className="text-xl">Tools:</h1>
                    <div className="overflow-auto h-96">
                    {tools}
                    </div>
                </div>

                <button type="button" onClick={ ()=> handleSettingsOpen() } className="mx-2 my-0.5 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 ">
                        <FontAwesomeIcon className='pr-2' icon={faCogs}/>
                        
                        Settings
                </button>
                
                <button type="button" onClick={() => handleModalOpen()} className="mx-2 my-0.5 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 ">
                        <FontAwesomeIcon className='pr-2' icon={faWrench}/>
                        
                        Add tool
                </button>
                <button type="button" onClick={() => setShowTeamMembers(!showTeamMembers)} className="mx-2 my-0.5 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
                        <FontAwesomeIcon className='pr-2' icon={faPeopleGroup}/>
                        Show members
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
        <div className='h-[calc(100vh-70px)] bg-white text-black  dark:text-white  dark:bg-gray-800'>
            <AddToolModal tools={tools} isOpen={isModalOpen} onClose={handleModalClose} teamuid={teamuid}/>
            <AddMembersModal alertInviteSuccess={alertInviteSuccess} isOpen={isMemberModalOpen} onClose={memberModalOnClose} teamuid={teamuid}/>
            <TeamSpaceSettings isOpen={isSettingsOpen} onClose={handleSettingsOpen} 
            teamuid={teamuid} tools={tools} setSelectedTool={setSelectedTool} selectedToolName={selectedToolName}/>
            
                <div>
            
                    
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