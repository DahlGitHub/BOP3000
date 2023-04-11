import React, { useRef } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import CardItem from "./CardItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "@nextui-org/react";
import { arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useImmer } from 'use-immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function createGuidId() {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return randomNumber;
}

// groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid/dokumentid
export default function Home() {
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState ([])
  const [showForm, setShowForm] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [newBoard, setNewBoard] = useState('')
  const [members, setMembers] = useImmer([])
  const [priorityName, setPriorityName] = useState({prio: 0, name: 'Low'})
  const qMembers = query(collection(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/members'))
  const [showEditListName, setShowEditListName] = useState(false)
  
  const getMembers = async () => {
    const members = await getDocs(qMembers)
    const membersData = members.docs.map((doc) => {
      return doc.data()
    })
    setMembers(membersData)
  }
  useEffect(() => {
    getMembers()
    const q = query(collection(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid'), orderBy('order', 'asc'))
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          setBoardData((boardData) => {
            const newData = change.doc.data();
            const newBoardData = [...boardData];
            newBoardData[change.newIndex] = newData;
            return newBoardData;
          });
        }
        if (change.type === 'modified') {
          setBoardData((boardData) => {
            const newData = change.doc.data();
            const newBoardData = [...boardData];
            if(newBoardData[change.newIndex] === newData) return newBoardData;
            newBoardData[change.newIndex] = newData;
            return newBoardData;
          });
        }
        if (change.type === 'removed') {
          setBoardData((boardData) => {
            const newBoardData = [...boardData];
            newBoardData.splice(change.oldIndex, 1);
            return newBoardData;
          })
          //må oppdatere order på alle boards
        }
      });
    })
    if (process) {
      setReady(true);
    }
    const closeForm = (e) => {
      if(showForm && e.target.className !== 'addTask border-gray-300 rounded focus:ring-purple-400 w-full' ){
        setShowForm(false)
      }
    }
    document.body.addEventListener('mousedown', closeForm)
    return () => document.body.removeEventListener('mousedown', closeForm)
  }, [showForm]);

  //mangler å kunne sette prioritet på kort

  const onDragEnd = async (re) => {
    if (!re.destination) return;
    var dragItem = boardData[parseInt(re.source.droppableId)].items[re.source.index];
    boardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    dragItem.boardId = boardData[parseInt(re.destination.droppableId)].id;
    boardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )
    await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[parseInt(re.source.droppableId)].id), {
      items: boardData[parseInt(re.source.droppableId)].items
    })
    await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[parseInt(re.destination.droppableId)].id), {
      items: boardData[parseInt(re.destination.droppableId)].items
    })
  };

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
          boardId: boardData[boardId].id, 
          assignees: []
        }
        await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[boardId].id), {
          items: arrayUnion(item)
        })
        e.target.value = '';
        setShowForm(false)
      }
    }
  }
  const addBoard = async () => {
    if(newBoard.length === 0) return;
    const id = createGuidId().toString()
    await setDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', id), {
      id: id,
      order: boardData.length,
      name: newBoard,
      items: []
    })
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
        await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[boardId].id), {
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
      <div className="pt-20 pl-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Kanban board</h4>
          </div>
          <Input aria-label='addBoard' aria-hidden='false' value={newBoard} onChange={e => setNewBoard(e.target.value)} placeholder='Add list'></Input>
          <Button className='text-black bg-indigo-800' onPress={addBoard}>Add</Button>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-5 flex-none w-fit my-5 overflow-x overflow-x-auto p-5">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`bg-gray-100 w-30 rounded-md shadow-md
                            flex flex-col relative
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                          >
                            <span
                              className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                            ></span>
                            <h4 className=" p-3 flex justify-between items-center ">
                              {showEditListName && selectedBoard === bIndex
                              ?
                                (<Input data-id={bIndex} aria-label='editListName' aria-hidden='false' onKeyDown={(e)=>changeBoardName(e)} placeholder={board.name}></Input>)
                              :
                                (<span className="text-2xl text-gray-600">
                                  {board.name}
                                </span>)
                              }
                              
                              <Dropdown>
                                <Dropdown.Trigger><FontAwesomeIcon className='py-2 cursor-pointer' icon={faEllipsis}/></Dropdown.Trigger>
                                <Dropdown.Menu
                                      disallowEmptySelection
                                      selectionMode="single"
                                      onAction={(key)=>{
                                        switch(key){
                                          case 'edit':
                                            setShowEditListName(!showEditListName)
                                            setSelectedBoard(bIndex)
                                            break;
                                          case 'delete':
                                            deleteBoard(board.id)
                                            break;
                                        }
                                      }}
                                      >
                                      <Dropdown.Item icon={<FontAwesomeIcon icon={faPenToSquare}/>} key='edit'>Edit name</Dropdown.Item>
                                      <Dropdown.Section>
                                        <Dropdown.Item color='error' icon={<FontAwesomeIcon icon={faTrash}/>} key='delete'>Delete list</Dropdown.Item>
                                      </Dropdown.Section>
                                    </Dropdown.Menu>
                              </Dropdown>
                            </h4>

                            <div className="overflow-y-auto h-auto"
                            style={{maxHeight:'calc(100vh - 290px)'}}>
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
                                <div className="p-3">
                                  <Dropdown>
                                    <Dropdown.Button className='bg-white text-black w-full mb-3'>{priorityName.name}</Dropdown.Button>
                                    <Dropdown.Menu
                                      disallowEmptySelection
                                      selectionMode="single"
                                      selectedKeys={priorityName.name}
                                      onSelectionChange={(e)=>{
                                        const split = e.currentKey.split(' ')
                                        setPriorityName({prio: parseInt(split[0]), name: split[1]})
                                        
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
                              ): (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {setSelectedBoard(bIndex); setShowForm(true)}}
                                >
                                  <span>Add task</span>
                                  <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                              )
                            }
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    
  );
}