import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import CardItem from "./CardItem";
import { Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Dropdown} from "@nextui-org/react";
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { createGuidId } from './Kanban';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

export default ({board, bIndex, members}) => {
    const [showEditListName, setShowEditListName] = useState(false)
    const [editListName, setEditListName] = useState(board.name)
    const [selectedBoard, setSelectedBoard] = useState(0)
    const [priorityName, setPriorityName] = useState({prio: 0, name: 'Low'})
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
      const closeForm = (e) => {
      const addTask = (e.target.className.split(" ")[0])  

        if(showForm && addTask !== 'addTask' ){
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
              boardId: board.id, 
              assignees: []
            }
            await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', board.id), {
              items: arrayUnion(item)
            })
            e.target.value = '';
            setShowForm(false)
          }
        }
      }

    const changeBoardName = async (e) => {
        console.log(e)
        if(e.keyCode === 13) //Enter
        {
          const val = e.target.value;
          if(val.length === 0) {
            setShowEditListName(false)
          }
          else {
            const boardId = e.target.attributes['data-id'].value;
            await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', board.id), {
              name: val
            })
            setShowEditListName(false)
          }
        }
      }
      const deleteBoard = async (boardID)=>{
        await deleteDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardID))
      }
    return (
        <div key={board.name}>
          <Droppable droppableId={bIndex.toString()} type="CARD">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div
                  className={`bg-gray-100 w-30 rounded-md shadow-md
                  flex flex-col relative
                  ${snapshot.isDraggingOver && "bg-green-50 rounded-lg"}`}
                >
                  <h4 className="p-2 flex justify-between items-center text-md font-semibold">
                    {showEditListName
                    ? <input 
                        onBlur={() => {
                          setShowEditListName(false);
                          setEditListName(board.name);
                        }}
                        data-id={bIndex} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoFocus={true} aria-label='editListName' aria-hidden='false' onChange={(e)=>setEditListName(e.target.value)} value={editListName} onKeyDown={(e)=>changeBoardName(e)}/>
                    :
                      <span onClick={()=>setShowEditListName(!showEditListName)} className="text-md mx-2 text-gray-600 cursor-text w-full whitespace-pre-wrap">
                        {board.name}
                      </span>
                    }
                    
                    <Dropdown>
                      <Dropdown.Trigger><FontAwesomeIcon className='m-2 cursor-pointer' icon={faEllipsis}/></Dropdown.Trigger>
                      <Dropdown.Menu
                            disallowEmptySelection
                            selectionMode="single"
                            onAction={(key)=>{
                              switch(key){
                                case 'delete':
                                  deleteBoard(board.id)
                                  break;
                              }
                            }}
                            >
                            <Dropdown.Section>
                              <Dropdown.Item color='error' icon={<FontAwesomeIcon icon={faTrash}/>} key='delete'>Delete list</Dropdown.Item>
                            </Dropdown.Section>
                          </Dropdown.Menu>
                    </Dropdown>
                  </h4>

                  <div className="overflow-y-auto h-auto">
                    {board.items.length > 0 &&
                      board.items.map((item, iIndex) => (
                          <CardItem
                            key={item.id}
                            data={item}
                            index={iIndex}
                            members={members}
                          />
                      )
                    )}
                    {provided.placeholder}
                  </div>
                  {
                   showForm && selectedBoard === bIndex ? (
                    <div className="p-3 space-y-2">
                      
                      <Dropdown>
                        <Dropdown.Trigger>
                          <label
                            className={`bg-gradient-to-r cursor-pointer
                              px-2 py-1 rounded text-white text-sm
                              ${
                                priorityName.prio === 0
                                  ? "from-blue-600 to-blue-400"
                                  : priorityName.prio === 1
                                  ? "from-green-600 to-green-400"
                                  : "from-red-600 to-red-400"
                              }
                              `}
                          >
                              {priorityName.prio === 0
                                ? "Low Priority"
                                : priorityName.prio === 1
                                ? "Medium Priority"
                                : "High Priority"}
                          </label>
                        </Dropdown.Trigger>
                        <Dropdown.Menu
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={priorityName.name}
                          css={{ $$dropdownMenuMinWidth: "100px" }}
                          onSelectionChange={(e)=>{
                            const split = e.currentKey.split(' ')
                            setPriorityName({prio: parseInt(split[0]), name: split[1]})
                            
                            }}>
                          <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-green-600 to-green-400" key='0 Low'>
                            Low Priority
                          </Dropdown.Item>
                          <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-yellow-600 to-yellow-400" key='1 Medium'>
                            Medium Priority
                          </Dropdown.Item>
                          <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-red-600 to-red-400" key='2 High'>
                            High Priority
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <textarea className="addTask block p-2.5 resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      
                      rows={1} placeholder="Task info" 
                      data-id={bIndex}
                      onKeyDown={(e) => onTextAreaKeyPress(e)}/>
                    </div>
                  ): (
                      <button
                        className="flex justify-center items-center my-2 mx-2 space-x-2 text-sm hover:bg-gray-200 p-2 rounded-lg"
                        onClick={() => {setSelectedBoard(bIndex); setShowForm(true)}}
                      >
                        <span className='text-gray-500 text-sm'>Add task</span>
                        <FontAwesomeIcon className='text-gray-500' icon={faPlus}/>
                      </button>
                    )
                  }
                </div>
              </div>
            )}
          </Droppable>
        </div>
      );
}