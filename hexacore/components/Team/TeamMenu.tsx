import React, { useState, useEffect, useLayoutEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CreateTeam from './CreateTeamModal';
import Drawer from '../Drawer';
import TeamSpace from './TeamSpace/TeamSpace';
import TeamFiles from './TeamSpace/Tools/TeamFiles';
import Chat from '../Chat/Chat';
import TeamInvitesModal from './TeamInvitesModal';
import fetchTeams from './fetchTeams';
import fetchTools from './TeamSpace/Tools/fetchTools';
import fetchTeamMembers from './fetchTeamMembers';


const TeamMenu = ()  => {

  // Team
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedTeamName, setSelectedTeamName] = React.useState(null);
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [teams, setTeams] = React.useState([]);

  const selectTeam = (teamuid, teamName) => {
    setSelectedTeam(teamuid);
    setSelectedTeamName(teamName);
  }

  const clearTeam = () => {
    setSelectedTeam(null);
    setSelectedTeamName(null);
    setTools([]);
  }

  useEffect(() => {
    
    fetchTeams(setTeams, selectTeam);
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamMembers(selectedTeam, setTeamMembers);
    }
  }, [selectedTeam]);


  // Tools
  const [tools, setTools] = React.useState([]);
  const [toolName, setToolName] = React.useState(null);
  const [selectedTool, setSelectedTool] = React.useState(false);

  function handleToolDeselect() {
    setSelectedTool(false);
    setSelectedFiles(false);
    setSelectedChat(null);
  }

  useEffect(() => {
    const getTools = async () => {
      const newFiles = await fetchTools({selectedTeam, handleChatSelect, handleFilesSelect});
      setTools(newFiles);
    };
    
    getTools();
  }, [selectedTeam, handleChatSelect, handleFilesSelect]);

  // Files
  const [selectedFiles, setSelectedFiles] = React.useState(false);
  

  function handleFilesSelect(toolName) {
    setSelectedFiles(true);
    setSelectedTool(true);
    setToolName(toolName);
    setTeamChat(false);
    setSelectedChat(null);
  }

  // Invites
  const [isInvitesOpen, setInvitesOpen] = React.useState(false);
  const [inviteCount, setInviteCount] = useState(null);

  function handleInvitesOpen() {
    setInvitesOpen(true);
  }

  function handleInvitesClose() {
    setInvitesOpen(false);
  }

  // Chat
  const [teamChat, setTeamChat] = React.useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  function handleChatSelect(chatName) {
    setTeamChat(true);
    setSelectedTool(true);
    setSelectedChat(chatName);
  }

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = React.useState(true);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleMemberModalOpen() {
    setIsMemberModalOpen(true);
  }

  function handleMemberModalClose() {
      setIsMemberModalOpen(false);
  }

  // Drawer
  function handleListOpen() {
    setIsListOpen(true);
  }

  function handleListClose() {
    setIsListOpen(false);
  }

  const MainContent = () => {
    return(
      <>

        <div>
          {teams.map((team) => (
            <div>{team}</div>
          ))}
        </div>

        
        <div className='grid place-items-center'>
          <button type="button" onClick={handleModalOpen} className="text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
            <FontAwesomeIcon className='pr-2' icon={faFolderPlus}/>
            
            Create a team
          </button>
        </div>
      </>
    )
  }
  
  const chatID = `teams/${selectedTeam}/tools/${selectedChat}`

  return (
    <section className="bg-white dark:bg-gray-900 flex">
     
      <div
        className={`${
          selectedFiles ? 'hidden' : 'block'
        } `}
      >
        <div className='w-64'>

          <CreateTeam isOpen={isModalOpen} onClose={handleModalClose} />
          <TeamInvitesModal isOpen={isInvitesOpen} onClose={handleInvitesClose} fetchTeams={fetchTeams} setInviteCount={setInviteCount}/>
          <div
            className={`${
              selectedTeam ? 'hidden' : 'block'
            } `}
          >
            <Drawer mainContent={<MainContent/>} title={<h1>Teams</h1>} isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
          </div>
          <div
            className={`${
              selectedTeam ? 'block' : 'hidden'
            } `}
          >
            <TeamSpace fetchTeamMembers={fetchTeamMembers} isMemberModalOpen={isMemberModalOpen} memberModalOnClose={handleMemberModalClose} tools={tools} fetchTools={fetchTools} selectFiles={handleFilesSelect} teamuid={selectedTeam} name={selectedTeamName} teams={teams} clearTeam={clearTeam} openModal={handleModalOpen} />
          </div>
        </div>
      </div>
      <div
        className={`${
          selectedFiles ? 'block' : 'hidden'
        } `}
      >
        <TeamFiles clearTool={handleToolDeselect} teamuid={selectedTeam} folderName={toolName}/>
      </div>
      <div
        className={`${
          teamChat ? 'block' : 'hidden'
        } `}
      >
        <div className="gap-16 items-center max-w-screen-xl lg:grid lg:grid-cols-2 bk-white">    
          <Chat chatID={chatID}/>
        </div>
      </div>
      <div className="fixed top-15 right-0 h-screen w-1/4 bg-gray-800 text-white flex flex-col">
        
        <div
            className={`${
              selectedTeam ? 'block' : 'hidden'
            } ml-4`}
          >
          <div className="p-4">
            <h1 className='text-xl'>Team members</h1>
          
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {teamMembers}
            <button onClick={() => handleMemberModalOpen()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10">
              Add more members to the team
            </button>
          </div>
        </div>
        <div
            className={`${
              selectedTeam ? 'hidden' : 'block'
            } ml-4`}
          >
          <div className="p-4">
            <h1 className='text-xl'>Team Invites</h1>
          
          </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <h1 className='text-black dark:text-white'>Pending team invites: {inviteCount}</h1>
              <button onClick={() => handleInvitesOpen()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10">
                Go to team invites
              </button>
            </div>  
        </div>
      
      </div>
    </section>
  )
}

export default TeamMenu