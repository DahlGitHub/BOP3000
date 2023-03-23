import React from 'react'
import { Collapse, Text } from "@nextui-org/react";
import CreateTeam from './teamModal';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TeamItems = [{
    name: "Table", 
}]

const TeamMenu = () => {
  return (
    <>
    <div className='w-64 absolute '>
    
      <div className='items-center p-2'>
      <CreateTeam/>
      </div>

    </div>
    </>
  )
}

export default TeamMenu