import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import CardItem from "./CardItem";
import { Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Dropdown, Input } from "@nextui-org/react";
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { createGuidId } from './Kanban';

export default ({bIndex, boardID})=>{
    const [priorityName, setPriorityName] = useState({prio: 0, name: 'Low'})
    const [showForm, setShowForm] = useState(false)
    
    useEffect(() => {
      const closeForm = (e) => {
        if(showForm && e.target.className !== 'addTask border-gray-300 rounded focus:ring-purple-400 w-full' ){
          setShowForm(false)
        }
      }
      document.body.addEventListener('mousedown', closeForm)
      return () => document.body.removeEventListener('mousedown', closeForm)
    }, [showForm]);


    const onTextAreaKeyPress = async (e) => {
        if(e.keyCode === 13) //Enter
        {
          const val = e.target.value;
          if(val.length === 0) {
            setShowForm(false)
          }
          else {
            const boardId = e.target.attributes['data-id'].value;
            const item = {
              id: createGuidId(),
              title: val,
              priority: priorityName.prio,
              chat:0,
              attachment: 0,
              boardId: boardID, 
              assignees: []
            }
            await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardID), {
              items: arrayUnion(item)
            })
            e.target.value = '';
            setShowForm(false)
          }
        }
      }
    return(
        <div className="p-3">
            <Dropdown>
                <Dropdown.Button className='bg-white text-black w-full mb-3'>{priorityName.name}</Dropdown.Button>
                <Dropdown.Menu
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={priorityName.name}
                onSelectionChange={(e)=>{
                    //const split = e.currentKey.split(' ')
                    //setPriorityName({prio: parseInt(split[0]), name: split[1]})
                    
                    }}>
                    <Dropdown.Item key='0 Low'>Low</Dropdown.Item>
                    <Dropdown.Item key='1 Medium'>Medium</Dropdown.Item>
                    <Dropdown.Item key='2 High'>High</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <textarea className="addTask border-gray-300 rounded focus:ring-purple-400 w-full" 
            rows={3} placeholder="Task info" 
            data-id={bIndex}
            onKeyDown={(e) => onTextAreaKeyPress(e)}/>
        </div>
    )
}