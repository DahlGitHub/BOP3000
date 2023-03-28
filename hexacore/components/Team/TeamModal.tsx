import {v4 as uuid} from 'uuid';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Collapse, Input, Spacer, Text } from "@nextui-org/react";
import { collection, getDocs, getDoc, addDoc, doc, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import CreateTeam from './CreateTeam';


const TeamModal = ()  => {

  const [teams, setTeams] = React.useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
      const usersGroups = await getDocs(collection(db, `users/${auth.currentUser.uid}/groups/`))
      const getTeams = usersGroups.docs.forEach(async(group)=>{
        const team = await getDoc(doc(db, `groups/${group.data().teamuid}`)).then((doc)=>{
          const teamData = doc.data();
          if(teamData){
            return (
              <Collapse.Group accordion={false}>
              <Collapse title={
                <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                  {teamData.name}
                </button>
              }>
                <div>
                  <div>
                  <img src={teamData.picture}/>
                  <Text className='flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >h</Text>
                  </div>
                  <Text className='flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >Table</Text>
                </div>
                </Collapse>                
              </Collapse.Group>
            );
          }
        })
        setTeams(teams=>[...teams, team])
      })
  };
  fetchTeams()
  }, []);




  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }



  return (
    <div>

      <CreateTeam isOpen={isModalOpen} onClose={handleModalClose} />

  
      
       {teams.map((team) => (
          <div>{team}</div>
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

export default TeamModal