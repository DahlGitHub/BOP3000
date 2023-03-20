import {v4 as uuid} from 'uuid';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Collapse, Text } from "@nextui-org/react";
import { TestTeam } from './TestTeam';
import { collection, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';



const CreateTeam = ({ isOpen, onClose, name, uid, ownerid })  => {

  const [teams, setTeams] = React.useState([]);

  const docImport = doc;

  useEffect(() => {
    async function fetchRequests() {
        
        const queryTeams = await getDocs(collection(db, 'groups'));
      
        const promises = queryTeams.docs.map(async (doc) => {
          const teamId = doc.data().uid;
            const teamDoc = await getDoc(docImport(db, "groups", teamId));
            const teamData = teamDoc.data();
          
        
          const element = (
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
              {teamData.ServerName}
            </button>
          );
      
          return element;
        });
        const results = await Promise.all(promises);
        setTeams(results);
    }
  
    fetchRequests();
  }, []); // Run this effect only once on component mount

  function addTeam() {

const submit = () => {
  onClose()

  if (!name) {
    console.log("contact addition failed.")
      return
  } else {
    addDoc(collection(db, 'teams'), {
      name: name,
      uid: uid,
      owner: ownerid
  })
  }
}
return (
  <div
    className={`${
      isOpen ? 'block' : 'hidden'
    } fixed z-10 inset-0 overflow-y-auto`}
  >
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      ></span>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div className="mt-3 text-center sm:mt-5">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Add Contact?
            </h3>
            <div className="mt-2">
            <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
    
            <p className="mt-8 text-2xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
               {name}</p>
                

            <div className="w-full mt-6">
              <a onClick={submit} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                  font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Send contact request</a>
            </div>
          </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

}



  return (
    <div>
      <button type="button" onClick={addTeam} className="text-white p-2 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
        <FontAwesomeIcon className='pr-2' color='red' icon={faFolderPlus}/>
        
        Create a team
      </button>      
      
       {teams.map((team) => (
      <Collapse.Group accordion={false}>
       <Collapse title={team}>
          <Text className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>h</Text>
          <Text className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>Table</Text>
        </Collapse>                
      </Collapse.Group>
        ))}
      
    </div>
  )
}

export default CreateTeam