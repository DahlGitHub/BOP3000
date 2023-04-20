import {v4 as uuid} from 'uuid';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Collapse, Input, Link, Spacer, Text } from "@nextui-org/react";
import { collection, getDocs, getDoc, addDoc, doc, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import CreateTeam from './CreateTeamModal';
import Drawer from '../Drawer';
import TeamSpace from './TeamSpace/TeamSpace';
import TeamFiles from './TeamSpace/Tools/TeamFiles';
import { faComments, faFolderOpen, faWindowMaximize } from '@fortawesome/free-regular-svg-icons';
import Chat from '../Chat/Chat';


const TeamMenu = ()  => {

  const [teams, setTeams] = React.useState([]);

  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedTeamName, setSelectedTeamName] = React.useState(null);
  const [tools, setTools] = React.useState([]);

  const [toolName, setToolName] = React.useState(null);
  


  const docImport = doc;


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
    if (selectedTeam) {
      fetchTools();
    }
  }, [selectedTeam]);

  async function fetchTeams() {
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "teams"));
      const elements = [];
    
      const promises = querySnapshot.docs.map(async (doc) => {
        
        const teamID = doc.data().teamuid;
        const teamDoc = await getDoc(docImport(db, "teams", teamID));
        const teamData = teamDoc.data();
        const element = (
          <Link onClick={() => selectTeam(teamData.teamuid, teamData.name)} className="text-white text-center flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
            {teamData.name}
          </Link>
        );
      elements.push(element);
    });

    await Promise.all(promises);
    setTeams(elements); // set the elements array instead of results
  }

  useEffect(() => {
    
    fetchTeams()
  }, []);

  const fetchTools = async () => {
    const querySnapshot = await getDocs(query(collection(db, "teams", selectedTeam, "tools")));
    const newFiles = querySnapshot.docs.map((doc) => {
      const fileData = doc.data();
  
      if (fileData.tool === "kanban") {
        return (
          <div className='cursor-pointer m-3'>
            <h3><FontAwesomeIcon className='pr-2' icon={faWindowMaximize}/>{fileData.name}</h3>
          </div>
        );
      } else if (fileData.tool === "chat") {
        return (
          <div className='cursor-pointer m-3' onClick={() => handleChatSelect(fileData.name)}>
            <h3><FontAwesomeIcon className='pr-2' icon={faComments}/>{fileData.name}</h3>
          </div>
        );
      } else if (fileData.tool === "files") {
        return (
          <div className='cursor-pointer m-3' onClick={() => handleFilesSelect(fileData.name)}>
            <h3><FontAwesomeIcon className='pr-2' icon={faFolderOpen}/>{fileData.name}</h3>
          </div>
        );
      } else {
        // Handle other tool types here
        return null;
      }
    });
  
    setTools(newFiles);
  };

  const [teamMembers, setTeamMembers] = React.useState([]);

  async function fetchTeamMembers() {
    const querySnapshot = await getDocs(collection(db, "teams", selectedTeam, "members"));
  
    const promises = querySnapshot.docs.map(async (doc, index) => {
      const userId = doc.data().uid;
      const userDoc = await getDoc(docImport(db, "users", userId));
      const userData = userDoc.data();
      const element = (
        <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
          <img className="object-cover w-8 h-8 rounded-full" src={userData.picture} alt=""/>
          <div className="text-left rtl:text-right">
            <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{userData.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
          </div>
        </button>
      );
  
      return element;
    });
  
    const results = await Promise.all(promises);
    setTeamMembers(results);
  }

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamMembers();
    }
  }, [selectedTeam]);

  
  




  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
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

  const [isListOpen, setIsListOpen] = React.useState(true);

  function handleListOpen() {
    setIsListOpen(true);
  }

  function handleListClose() {
    setIsListOpen(false);
  }

  
  const [selectedTool, setSelectedTool] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState(false);
  const [teamChat, setTeamChat] = React.useState(false);

  function handleToolDeselect() {
    setSelectedTool(false);
    setSelectedFiles(false);
  }

  function handleFilesSelect(toolName) {
    setSelectedFiles(true);
    setSelectedTool(true);
    setToolName(toolName);
    setTeamChat(false);
    setSelectedChat(null);
  }

  function handleChatSelect(chatName) {
      setTeamChat(true);
      setSelectedTool(true);
      setSelectedChat(chatName);
  }

  const [selectedChat, setSelectedChat] = useState(0)
  const [showChat, setShowChat] = useState(false)

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
              <TeamSpace tools={tools} fetchTools={fetchTools} selectFiles={handleFilesSelect} teamuid={selectedTeam} name={selectedTeamName} teams={teams} clearTeam={() => clearTeam()} openModal={handleModalOpen} />
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
        <div className="p-4">
          <h1 className='text-xl'>Team members</h1>
          
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {teamMembers}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10">
            Add more members to the team
          </button>
        </div>
        
      </div>
    </section>
  )
}

export default TeamMenu