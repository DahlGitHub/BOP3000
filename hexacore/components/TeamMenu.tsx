import React from 'react'
import { Collapse, Text } from "@nextui-org/react";

const TeamItems = [{
    name: "Table", 
}]

const TeamMenu = () => {
  return (
    <>
    <div className='w-64 absolute '>
    <Collapse.Group accordion={false}>
      <Collapse title="Team A">
        <Text className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>Calendar</Text>
        <Text className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>Table</Text>
      </Collapse>
      <Collapse title="Brotherhood">
      <Text className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>Forum</Text>

      </Collapse>
    </Collapse.Group>
    </div>
    </>
  )
}

export default TeamMenu