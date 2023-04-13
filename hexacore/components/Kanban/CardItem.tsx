import React from "react";
import Image from "next/dist/client/image";
import {
    ChevronDownIcon,
    PlusIcon,
    
    PlusCircleIcon,
  } from '@heroicons/react/24/outline'
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-500" />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="flex space-x-3">
              {data.assignees.map((ass, index) => {
                return (
                  <li key={index}>
                    <img
                      src={ass.avt}
                      width="36"
                      height="36"
                      
                      className=" rounded-full "
                      alt=""
                    />
                  </li>
                );
              })}
              <li>
                <button
                  className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                    rounded-full"
                >
                  <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;