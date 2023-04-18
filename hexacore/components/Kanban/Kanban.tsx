import React from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "@nextui-org/react";
import { collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useImmer } from 'use-immer';
import Board from './Board';

export function createGuidId() {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return randomNumber;
}

// groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid/dokumentid
export default function Home() {
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState ([])
  const [newBoard, setNewBoard] = useState('')
  const [members, setMembers] = useImmer([])
  //const qMembers = query(collection(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/members'))

  const qMembers = query(collection(db, '/users'))

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
        if (change.type === 'added' || change.type === 'modified') {
          setBoardData((boardData) => {
            const newData = change.doc.data();
            const newBoardData = [...boardData];
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
  }, []);

  const onDragEnd = async (re) => {
    if (!re.destination) return;
    if (re.type === 'BOARD') {
      const dragItem = boardData[re.source.index];
      const newBoardData = [...boardData];
      newBoardData.splice(re.source.index, 1);
      newBoardData.splice(re.destination.index, 0, dragItem);
      setBoardData(newBoardData);
      newBoardData.forEach(async (board, index) => {
        await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', board.id), {
          order: index
        })
      })
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
      await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[parseInt(re.source.droppableId)].id), {
        items: boardData[parseInt(re.source.droppableId)].items
      })
      await updateDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', boardData[parseInt(re.destination.droppableId)].id), {
        items: boardData[parseInt(re.destination.droppableId)].items
      })
    }
  };

  const addBoard = async () => {
    if(newBoard.length === 0) return;
    const id = createGuidId().toString()
    const setOrder = boardData.length === 0 ? 0 : boardData[boardData.length-1].order+1
    await setDoc(doc(db, 'groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', id), {
      id: id,
      order: setOrder,
      name: newBoard,
      items: []
    })
  }
  return (
      <div className="pt-10 pl-5 flex flex-col w-full">
        {/* Board header */}
        <div className="flex flex-initial space-x-3">
          <div className="flex items-center mx-2">
            <h4 className="text-4xl font-bold text-gray-600">Kanban board</h4>
          </div>
          <Input aria-label='addBoard' aria-hidden='false' value={newBoard} onChange={e => setNewBoard(e.target.value)} placeholder='Add a new list'></Input>
          <button className="p-2 px-3 text-sm text-center text-white rounded-xl bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addBoard}>Add</button>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex w-full my-3 overflow-x-auto">
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
                        members={members}/>
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