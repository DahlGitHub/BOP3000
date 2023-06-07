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
import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../../firebase-config/firebase';
import Kanban from '../Kanban/Kanban';
import FavTeamModal from './favTeamModal';
import { faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { useImmer } from 'use-immer';


const TeamMenu = ()  => {

  // Team
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [showTeamInvites, setShowTeamInvites] = useState(false);
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
    setTeamMembers([]);
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
      const q = query(collection(db, "teams", selectedTeam, "members"));
      setTeamMembers([]);
      onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const userId = change.doc.data().uid
          const userDoc = await getDoc(doc(db, "users", userId));
          const userData = userDoc.data();
          fetchTeamMembers(userData, setTeamMembers)
        }
        if (change.type === "modified") {
            
        }
        if (change.type === "removed") {
            setTeamMembers((prev) => prev.filter((member) => member.uid !== change.doc.data().uid));
        }
      })
    })
      
    }
  }, [selectedTeam]);


  // Tools
  const [tools, setTools] = useImmer([]);
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
    setTools([])
    const q = query(collection(db, "teams", selectedTeam, "tools"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const fileData = change.doc.data();
        if (change.type === "added") {
          const tool = (
            <div key={change.doc.id} className='cursor-pointer px-2 py-0.5 my-1 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg dark:focus:ring-gray-500 dark:hover:bg-gray-700' onClick={()=>handleToolSelect(change.doc.id, fileData.tool)}>
              <h3 key={fileData.name}><FontAwesomeIcon className='pr-2' icon={toolsi.find((e)=> e.tool == fileData.tool).icon}/>{fileData.name}</h3>
            </div>
          )
          setTools((prevState) => [...prevState, tool]);
            
        }
        if (change.type === "modified") {
          const tool = (
            <div key={change.doc.id} className='cursor-pointer m-3 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30' onClick={()=>handleToolSelect(change.doc.id, fileData.tool)}>
              <h3 key={fileData.name}><FontAwesomeIcon className='pr-2' icon={toolsi.find((e)=> e.tool == fileData.tool).icon}/>{fileData.name}</h3>
            </div>
          )
          setTools((tools)=>{
            const index = tools.findIndex((tool)=> tool.key == change.doc.id);
            const newTools = [...tools];
            newTools[index] = tool;
            return newTools;
          })
        }
        if (change.type === "removed") {
          setTools((prevState) => prevState.filter((tool) => tool.key !== change.doc.id));
        }
      })
        
    })  
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

        <div className='overflow-auto h-96'>
          {teams}
        </div>

        
        <div className='grid place-items-center'>
          <button type="button" onClick={handleModalOpen} className="text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
            <FontAwesomeIcon className='pr-2' icon={faFolderPlus}/>
            
            Create a team
          </button>
          <button type="button" onClick={() => setShowTeamInvites(!showTeamInvites)} className="mx-5 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
            <FontAwesomeIcon className='pr-2' icon={faEnvelope}/>
            Show Teaminvites {inviteCount > 0 ? <span className='bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2'>{inviteCount}</span> : null}
          </button>
        </div>
      </>
    )
  }
  const toolID = `teams/${selectedTeam}/tools/${toolName}`
  const kanbanMembers = `teams/${selectedTeam}/members`

  const showTool = () => {
    switch (toolType) {
      case "chat":
        return(   
          <Chat chatID={toolID} />  
        )
      case "kanban":
        return(
          <Kanban id={toolID} membersId={kanbanMembers} />
        )
      case "files":
        handleFilesSelect(toolName)
      case "settings":
        return null
    } 
  }
      

  return (
    <section className="bg-white dark:bg-gray-900 flex">
     
     {!selectedFiles ?
     (<div>
      <div>
        <CreateTeam isOpen={isModalOpen} onClose={handleModalClose} fetchTeams={fetchTeams}/>
        <FavTeamModal isOpen={isFavTeamModalOpen} onClose={handleCloseFavTeam} teamName={favTeamName} teamID={favTeamID} fetchTeams={fetchTeams}/>
        <TeamInvitesModal isOpen={isInvitesOpen} onClose={handleInvitesClose} fetchTeams={fetchTeams} setInviteCount={setInviteCount}/>
        {!selectedTeam ?
        (<div>
          <Drawer mainContent={<MainContent/>} title={<h1>Teams</h1>} isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>)
        : ((<div>
          <TeamSpace alertInviteSuccess={alertInviteSuccess} isMemberModalOpen={isMemberModalOpen} memberModalOnClose={handleMemberModalClose}
           tools={tools} selectedToolName={toolName} setSelectedTool={setSelectedTool} fetchTools={fetchTools} teamuid={selectedTeam} name={selectedTeamName} clearTeam={clearTeam} 
           setShowTeamMembers={setShowTeamMembers} showTeamMembers={showTeamMembers} />
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
        <div className="grow flex overflow-auto h-[calc(100vh-70px)]">
          {showTool()}
        </div>
      ):
      (
        <div className='grow'></div>
      )
    }
    {


    }
    

  <div className={`absolute z-10 top-15 right-0 h-[calc(100vh-70px)] transition-transform ${showTeamMembers ? "translate-x-0" : "translate-x-full"} dark:bg-gray-800 bg-gray-50 border-l dark:border-gray-700 text-gray-800 dark:text-white`}
  >
        <div

          >
          <div className="p-4">
            <h1 className='text-xl'>Team members</h1>
          
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {teamMembers}
            <button onClick={() => handleMemberModalOpen()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md mt-10">
              Add more members to the team
            </button>
          </div>
        </div>
        
      
      </div>
    
      <div
            className={`${
              selectedTeam ? 'hidden' : 'block'
            } ml-4`}
          >
          { showTeamInvites && (<div className="fixed top-15 right-0 h-[calc(100vh-70px)] max-w-40
            dark:bg-gray-800 border-solid text-white p-6">
            <h1 className='text-xl'>Team Invites</h1>
            <h1 className='text-black dark:text-white'>Pending team invites: {inviteCount}</h1>
              <button onClick={() => handleInvitesOpen()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10">
                Go to team invites
              </button> 
          
          </div>
          )}
        </div>
        
    </section>
  )
}

export default TeamMenu