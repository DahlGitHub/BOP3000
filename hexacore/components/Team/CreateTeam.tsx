import {v4 as uuid} from 'uuid';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Collapse, Input, Spacer, Text } from "@nextui-org/react";
import { TestTeam } from './TestTeam';
import { collection, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import TeamModal from './TeamModal';


const CreateTeam = ()  => {

  const [teams, setTeams] = React.useState([]);
  const docImport = doc;

  async function fetchRequests() {
        
    const queryTeams = await getDocs(collection(db, 'groups'));
  
    const promises = queryTeams.docs.map(async (doc) => {


      const element = (
        <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
          {doc.data().name}
        </button>
      );
  
      return element;
    });
    const results = await Promise.all(promises);
    setTeams(results);
}

  useEffect(() => {
  
    fetchRequests();
  }, []); // Run this effect only once on component mount

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }



  return (
    <div>

      <TeamModal isOpen={isModalOpen} onClose={handleModalClose} refresh={ () => fetchRequests() }/>

  
      
       {teams.map((team) => (
      <Collapse.Group accordion={false}>
       <Collapse title={team}>
        <div>
          <Text className='flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >h</Text>
          <Text className='flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >Table</Text>
        </div>
        </Collapse>                
      </Collapse.Group>
        ))}
      <div className='grid place-items-center'>
      <button type="button" onClick={handleModalOpen} className="text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
        <FontAwesomeIcon className='pr-2' icon={faFolderPlus}/>
        
        Create a team
      </button>
      </div>

    </div>
  )
}

export default CreateTeam