import React from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config/firebase';
import { useImmer } from 'use-immer';
import Board from './Board';
import { set } from 'firebase/database';

export function createGuidId() {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return randomNumber;
}

export default function Home({id, membersId}) {
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState ([])
  const [title, setTitle] = useState('')
  const [newBoard, setNewBoard] = useState('')
  const [members, setMembers] = useImmer([])
  const qMembers = query(collection(db, membersId))
  const getMembers = async () => {
    try {
      const members = await getDocs(qMembers)
      const membersData = members.docs.map((memberDoc) => memberDoc.data())
  
      const userDataPromises = membersData.map(async (member) => {
        const userSnapshot = await getDoc(doc(db, 'users', member.uid))
        return userSnapshot.data()
      })
      const userData = await Promise.all(userDataPromises)
      setMembers(userData)
    } catch (error) {
      console.error( error)
    }
  }

 const onEnter = async (e) => {
    if (e.key === 'Enter') {
      addBoard()
    }
  }


  useEffect(() => {
    onSnapshot(doc(db, id), (snapshot) => {
      if(snapshot.data() === undefined){
        return
      }
      setTitle(snapshot.data().name)
    })
  }, []);

  useEffect(() => {
    setBoardData([])
    getMembers()
    const q = query(collection(db, id+"/kanban"), orderBy('order', 'asc'))
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
        if(change.type === 'modified'){
          // change the order of the board and set the new index
          setBoardData((boardData) => {
            const newData = change.doc.data();
            const newBoardData = [...boardData];
            newBoardData[newData.order] = newData;
            return newBoardData;
          })
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
  }, [id]);

  
  const onDragEnd = async (re) => {
    if (!re.destination) return;
    if (re.type === 'BOARD') {
      const dragItem = boardData[re.source.index];
      const newBoardData = [...boardData];
      newBoardData.splice(re.source.index, 1);
      newBoardData.splice(re.destination.index, 0, dragItem);
      newBoardData.forEach(async (board, index) => {
        await updateDoc(doc(db, id+"/kanban", board.id), {
          order: index
        })
      })
      setBoardData(newBoardData);
    }else if(re.type === 'CARD'){
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
      await updateDoc(doc(db, id+"/kanban", boardData[parseInt(re.source.droppableId)].id), {
        items: boardData[parseInt(re.source.droppableId)].items
      })
      await updateDoc(doc(db, id+"/kanban", boardData[parseInt(re.destination.droppableId)].id), {
        items: boardData[parseInt(re.destination.droppableId)].items
      })
    }
  };

  const addBoard = async () => {
    if(newBoard.length === 0) return;
    const boardId = createGuidId().toString()
    const setOrder = boardData.length === 0 ? 0 : boardData[boardData.length-1].order+1
    await setDoc(doc(db, id+"/kanban", boardId), {
      id: boardId,
      order: setOrder,
      name: newBoard,
      items: []
    })
    setNewBoard('')
  }
  return (
      <div className="pt-10 pl-5 flex flex-col w-10 grow">
        {/* Board header */}
        <div className="flex-row items-start sm:space-y-0 sm:space-x-3 space-x-3 ">
          <div className="flex items-center mx-3 mb-3">
            <h4 className="text-4xl font-bold text-gray-600">{title}</h4>
          </div>
          <div className='flex space-x-2'>
          <Input aria-label='addBoard' aria-hidden='false' value={newBoard} onKeyDown={onEnter} onChange={(e) => {setNewBoard(e.target.value)} }  placeholder='Add a new list'></Input>
          <button className="p-2 px-3 text-sm text-center text-white rounded-xl bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addBoard}>Add</button>
          </div>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grow w-full my-3 ">
            <Droppable droppableId="droppable" type="BOARD" direction="horizontal">
              {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`flex w-fit ${snapshot.isDraggingOver && "bg-green-50 rounded-lg"}`}
                {...provided.droppableProps}
              >
              {boardData.map((board, bIndex) =>(
                 
                    <Draggable type="BOARD" key={board.id} draggableId={board.id} index={bIndex} >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-transparent rounded-md p-2 mt-0 last:mb-0 w-64"
                        >
                      <Board 
                        board={board}
                        bIndex={bIndex}
                        members={members}
                        kanbanID={id+"/kanban"}/>
                      </div>
                      )}
                    </Draggable>
              ))}
              {provided.placeholder}  
              </div>
                  )}
                </Droppable>
            </div>
          </DragDropContext>
        )}
      </div>
  );
}