import {v4 as uuid} from 'uuid';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import {Text } from "@nextui-org/react";
import { TestTeam } from './TestTeam';

const CreateTeam = () => {

  const id = uuid().replaceAll('-','');
  const [newId, setNewId] = useState('');

  const [components, setTeam] = useState([]);

  function addTeam() {
    setTeam([...components, () => setNewId(id)])
  }

  return (
    <div>
      <button type="button" onClick={addTeam} className="text-white p-2 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
        <FontAwesomeIcon className='pr-2' icon={faFolderPlus}/>
        Create a team
      </button>      
      {components.map((item, i) => ( <TestTeam text={item}/> ))}
    </div>
  )
}

export default CreateTeam