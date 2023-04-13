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

  const qMembers = query(collection(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/members'))

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
  }, []);

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
      <div className="pt-20 pl-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Kanban board</h4>
          </div>
          <Input aria-label='addBoard' aria-hidden='false' value={newBoard} onChange={e => setNewBoard(e.target.value)} placeholder='Add list'></Input>
          <Button className='text-black bg-indigo-800' onPress={addBoard}>Add</Button>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-5 flex-none w-fit my-5 overflow-x overflow-x-auto p-5">
              {boardData.map((board, bIndex) =>(
                <Board 
                  board={board}
                  bIndex={bIndex}
                  members={members}/>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
  );
}