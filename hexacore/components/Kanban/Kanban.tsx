import React from 'react'

import Image from "next/dist/client/image";
import {
  ChevronDownIcon,
  PlusIcon,
  
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import CardItem from "./CardItem";
import BoardData from "./board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";

function createGuidId() {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return randomNumber;
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if(e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if(val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat:0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  return (
    
      <div className="pt-20 pl-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Kanban board</h4>
            <FontAwesomeIcon icon={faUser}
              className="w-9 h-9 text-gray-500 rounded-full
            p-1 bg-white ml-5 shadow-xl"
            />
          </div>

          <ul className="flex space-x-3 ml-10">
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2F6y2HiDmxeueYcT3Hp87MyzE25lk2?alt=media&token=0bfbfdbb-2bbd-41a1-b760-5456c5a7c200"
                width="36"
                height="36"
                
                className=" rounded-full "
                alt=''
              />
            </li>
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2F6y2HiDmxeueYcT3Hp87MyzE25lk2?alt=media&token=0bfbfdbb-2bbd-41a1-b760-5456c5a7c200"
                width="36"
                height="36"
                
                className=" rounded-full "
                alt=''
              />
            </li>
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2F6y2HiDmxeueYcT3Hp87MyzE25lk2?alt=media&token=0bfbfdbb-2bbd-41a1-b760-5456c5a7c200"
                width="36"
                height="36"
                
                className=" rounded-full "
                alt=''
              />
            </li>
            <li>
              <button
                className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                rounded-full"
              >
                <PlusIcon className="w-5 h-5 text-gray-500" />
              </button>
            </li>
          </ul>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-5 flex-none w-fit my-5 overflow-x p-5">
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
                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-2xl text-gray-600">
                                {board.name}
                              </span>
                              
                            </h4>

                            <div className="overflow-y-auto h-auto"
                            style={{maxHeight:'calc(100vh - 290px)'}}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                            
                            {
                              showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" 
                                  rows={3} placeholder="Task info" 
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}/>
                                </div>
                              ): (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}
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