import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFolderOpen, faFolderPlus, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import CreateTeam from './CreateTeamModal';
import Drawer from '../Drawer';
import TeamSpace from './TeamSpace/TeamSpace';
import TeamFiles from './TeamSpace/Tools/TeamFiles';
import Chat from '../Chat/Chat';
import TeamInvitesModal from './TeamInvitesModal';
import fetchTeamMembers from './fetchTeamMembers';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase-config/firebase';
import Kanban from '../Kanban/Kanban';
import FavTeamModal from './favTeamModal';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';


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
    setSelectedTool(false);
  }
  
  async function fetchTeams() {
    const docImport = doc;
  
    const favTeamDoc = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
    const favTeamDataID = favTeamDoc.docs.map((doc) => doc.id);
  
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "teams"));
    const elements = [];
  
    if (querySnapshot.empty) {
      setTeams(null);
    } else {
      const promises = querySnapshot.docs.map(async (doc) => {
        const teamID = doc.id;
        const teamDoc = await getDoc(docImport(db, "teams", teamID));
        const teamData = teamDoc.data();
        const favTeamCheck = favTeamDataID.includes(teamDoc.data().teamuid);
        const element = (
          <div key={teamData.teamuid} className="flex border-solid border-2 border-sky-500 w-fit h-fit rounded m-5">
            <button onClick={() => selectTeam(teamData.teamuid, teamData.name)} className="text-black dark:text-white text-lg font-bold rounded-l flex items-center w-fit px-5 py-2 transition-colors duration-200 dark:hover:bg-blue-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
              {teamData.name}
            </button>
            <button onClick={() => handleFavTeamSelect(teamData.name, teamData.teamuid)} className="text-black dark:text-white text-lg font-bold rounded-r flex items-center w-fit py-2 px-2 transition-colors duration-200 dark:hover:bg-blue-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
              {favTeamCheck ? <FontAwesomeIcon icon={["fas", "star"]} /> : <FontAwesomeIcon icon={faStar} />}
            </button>
          </div>
        );
        elements.push(element);
      });
  
      await Promise.all(promises);
      setTeams(elements); // set the elements array instead of results
    }
  }

  async function favTeam () {
    const favTeamDoc = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
    const favTeamDataID = favTeamDoc.docs.map((doc) => doc.id);
    const teamDoc = await getDoc(doc(db, "teams", favTeamDoc.docs[0].id));
    const favTeamName = teamDoc.data().name;
    if(favTeamDoc.empty) {
      return;
    } else  {
      setSelectedTeam(favTeamDataID[0]);
      setSelectedTeamName(favTeamName);
    }

  }
  

  useEffect(() => {
    
    fetchTeams();
    favTeam();
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
  const [toolType , setToolType] = React.useState(null);


  function handleToolDeselect() {
    setSelectedTool(false);
    setSelectedFiles(false);
  }

  useEffect(() => {
    if (selectedTeam) {
    fetchTools()
    }
  }, [selectedTeam]);
const toolsi = [
  {tool: "kanban", icon: faWindowMaximize},
  {tool: "chat", icon: faComments},
  {tool: "files", icon: faFolderOpen}
]
const handleToolSelect = (toolName, type) => {
  setSelectedTool(true);
  setToolName(toolName);
  setToolType(type);
}

  const fetchTools = async () => {
    const querySnapshot = await getDocs(query(collection(db, "teams", selectedTeam, "tools")));
      const newFiles = querySnapshot.docs.map((doc) => {
        const fileData = doc.data();
        
        if (toolsi.find((e)=> e.tool == fileData.tool)) {
          return (
            <div key={doc.id} className='cursor-pointer m-3' onClick={()=>handleToolSelect(fileData.name, fileData.tool)}>
              <h3><FontAwesomeIcon className='pr-2' icon={toolsi.find((e)=> e.tool == fileData.tool).icon}/>{fileData.name}</h3>
            </div>
          );
        }else {
          return null;
        }
        
      })
    setTools(newFiles)
  }

  // Files
  const [selectedFiles, setSelectedFiles] = React.useState(false);
  
  function handleFilesSelect(toolName) {
    setSelectedFiles(true);
    setToolName(toolName);
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

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = React.useState(true);
  const [isFavTeamModalOpen, setIsFavModalOpen] = React.useState(false);

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

  const alertInviteSuccess = () => {
    toast.success('Invite Sent');
  };

  // Fav Team
  const [favTeamName, setFavTeamName] = React.useState(null);
  const [favTeamID, setFavTeamID] = React.useState(null);

  function handleOpenFavTeam() {
    setIsFavModalOpen(true);
  }

  function handleCloseFavTeam() {
    setIsFavModalOpen(false);
  }

  function handleFavTeamSelect(teamName, teamID) {
    setFavTeamName(teamName);
    setFavTeamID(teamID);
    handleOpenFavTeam();
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
          {teams}
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
  
  const chatID = `teams/${selectedTeam}/tools/${toolName}`
  const kanbanID = `teams/${selectedTeam}/tools/${toolName}/kanban`
  const kanbanMembers = `teams/${selectedTeam}/members`

  const showTool = () => {
    switch (toolType) {
      case "chat":
        return(   
          <Chat chatID={chatID} />  
        )
      case "kanban":
        return(
          <Kanban id={kanbanID} membersId={kanbanMembers} />
        )
      case "files":
        handleFilesSelect(toolName)
    }
  }
      

  return (
    <section className="bg-white dark:bg-gray-900 flex">
     
     {!selectedFiles ?
     (<div>
      <div className='w-64'>
        <CreateTeam isOpen={isModalOpen} onClose={handleModalClose} fetchTeams={fetchTeams}/>
        <FavTeamModal isOpen={isFavTeamModalOpen} onClose={handleCloseFavTeam} teamName={favTeamName} teamID={favTeamID} fetchTeams={fetchTeams}/>
        <TeamInvitesModal isOpen={isInvitesOpen} onClose={handleInvitesClose} fetchTeams={fetchTeams} setInviteCount={setInviteCount}/>
        {!selectedTeam ?
        (<div>
          <Drawer mainContent={<MainContent/>} title={<h1>Teams</h1>} isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>)
        : ((<div>
          <TeamSpace alertInviteSuccess={alertInviteSuccess} isMemberModalOpen={isMemberModalOpen} memberModalOnClose={handleMemberModalClose} tools={tools} fetchTools={fetchTools} teamuid={selectedTeam} name={selectedTeamName} clearTeam={clearTeam} />
        </div>))
        }
      </div>
    </div>):
    (<div
      className={`${
        selectedFiles ? 'block' : 'hidden'
      } `}
    >
      <TeamFiles clearTool={handleToolDeselect} teamuid={selectedTeam} folderName={toolName}/>
    </div>)
    }
  
    {selectedTool && !selectedFiles ?
      (
        <div className="grow flex bk-white overflow-auto">
          {showTool()}
        </div>
      ):
      (
        <div className='grow'></div>
      )
    }

      <div className="grow-0 top-15 right-0 h-[calc(100vh-70px)] max-w-40
       dark:bg-gray-800 border-solid text-white flex">
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