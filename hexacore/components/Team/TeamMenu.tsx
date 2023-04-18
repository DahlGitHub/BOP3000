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


const TeamMenu = ()  => {

  const [teams, setTeams] = React.useState([]);

  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedTeamName, setSelectedTeamName] = React.useState(null);


  const docImport = doc;


  const selectTeam = (teamuid, teamName) => {
    setSelectedTeam(teamuid);
    setSelectedTeamName(teamName);
  }

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

  



  return (
    <div className='h-[calc(100vh-70px)] bg-white  dark:text-white  dark:bg-gray-800'>
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
          <TeamSpace teamuid={selectedTeam} name={selectedTeamName} teams={teams} openModal={handleModalOpen} />
        </div>
      </div>
    </div>
  )
}

export default TeamMenu