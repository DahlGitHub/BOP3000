import React, { useState } from "react";
import {PlusCircleIcon,} from '@heroicons/react/24/outline'
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "@nextui-org/react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase-config/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AvatarPicture from "../AvatarPicture";


function CardItem({ data, index, members, kanbanID }) {
  const [editTaskName, setEditTaskName] = useState(false)
  const [title, setTitle] = useState(data.title)
  const q = query(collection(db, kanbanID), where('items', 'array-contains', data))
  const [selectedDate, setSelectedDate] = useState(data.date ? data.date.toDate() : null);
  const isMyTools = kanbanID.split('/')[0] === 'users'

  const selectDate = async (date) => {
    if (date) {
      const docRef = await getDocs(q);
      docRef.docs.forEach(async (doc) => {
        const items = doc.data().items.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              date: new Date(date) // format date as YYYY-MM-DD
            };
          }
          return item;
        });
        await updateDoc(docRef.docs[0].ref, { items: items });
        setSelectedDate(date);
      });
    }
  };

  const assignMember = async (member) => {
    const type = member.toString().split(' ')
    const docRef = await getDocs(q)
    docRef.docs.forEach(async(docs) => {
      const items = docs.data().items.map((item) => {
        if (item.id === data.id) {
          if(type[0] === 'add'){
            return {
              ...item,
              assignees: [...item.assignees, type[1]],
            };
          } else if(type[0] === 'remove'){
            return {
              ...item,
              assignees: item.assignees.filter((assignee) => assignee !== type[1]),
            };
          }
        }
        return item;
      });
      await updateDoc(doc(db, kanbanID, docs.data().id), {
        items: items,
      });
      
    })
  }
  
  const changeName = async (e) => {
    if (e.key === "Enter" && e.target.value.trim() && !e.shiftKey) {
      const docRef = await getDocs(q);
      docRef.docs.forEach(async (docs) => {
        const items = docs.data().items.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              title: e.target.value.trim(),
            };
          }
          return item;
        });
        await updateDoc(doc(db, kanbanID, docs.data().id), {
          items: items,
        });
      });
      setEditTaskName(false);
    } else if (e.key === "Enter" && !e.target.value.trim()) {
      e.preventDefault();
    }
  };


  const editPrio = async (key) =>{
    const docRef = await getDocs(q)
    docRef.docs.forEach(async(docs) => {
      const items = docs.data().items.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            priority: parseInt(key.toString().split(' ')[0]),
          };
        }
        return item;
      });
      await updateDoc(doc(db, kanbanID, docs.data().id), {
        items: items,
      });
      });
  
  }
  //'/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid'
  const deleteTask = async () => {
    const docRef = await getDocs(q)
    docRef.docs.forEach(async(docs) => {
      const items = docs.data().items.filter((item) => item.id !== data.id);
      await updateDoc(doc(db, kanbanID, docs.data().id), {
        items: items,
      });
      });
  }

  return (
    <Draggable index={index} draggableId={data.id.toString()} type="CARD">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md pt-2 px-2 m-1.5 mt-0 last:mb-0 hover:bg-gray-50 border shadow-sm"
        >
          <div className="flex justify-between">
            <Dropdown>
              <Dropdown.Trigger>
                <label
                  className={`bg-gradient-to-r cursor-pointer
                    px-2 py-1 rounded text-white text-[10px]
                    ${
                      data.priority === 0
                        ? "from-green-600 to-green-400"
                        : data.priority === 1
                        ? "from-yellow-600 to-yellow-400"
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
              </Dropdown.Trigger>
              <Dropdown.Menu
                    className="p-1"
                    selectionMode="single"
                    css={{ $$dropdownMenuMinWidth: "50px" }}
                    onAction={(key)=>{
                      editPrio(key)
                    }}
                    >
                    <Dropdown.Item className="m-1 bg-gradient-to-r text-white text-[10px] bg-green-500 w-32 hover:bg-green-700" key='0 low'>
                      Low Priority
                    </Dropdown.Item>
                    <Dropdown.Item className="m-1 bg-gradient-to-r text-white text-[10px] bg-yellow-500 hover:bg-yellow-700" key='1 medium'>
                      Medium Priority
                    </Dropdown.Item>
                    <Dropdown.Item className="m-1 bg-gradient-to-r text-white text-[10px] bg-red-500 hover:bg-red-700" key='2 high'>
                      High Priority
                    </Dropdown.Item>
                  </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown>
              <Dropdown.Trigger>
                <FontAwesomeIcon className='px-2 py-1 cursor-pointer' icon={faEllipsisVertical}/>
              </Dropdown.Trigger>
              <Dropdown.Menu
                    disallowEmptySelection
                    selectionMode="single"
                    onAction={(key)=>{
                      switch(key){
                        case 'delete':
                          deleteTask()
                          break;
                      }
                    }}
                    >
                    <Dropdown.Item color='error' icon={<FontAwesomeIcon icon={faTrash}/>} key='delete'>Delete task</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </div>
          {!editTaskName
            ? <p onClick={()=>{setEditTaskName(!editTaskName)}} className="text-sm my-3 mx-1 text-lg leading-6 cursor-text whitespace-pre-wrap" >{title}</p>
            : <textarea 
                onBlur={() => {
                  setEditTaskName(false);
                  setTitle(data.title);
                }}
                defaultValue={data.title}
                autoFocus={true} 
                className="my-2 resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={(e) => changeName(e)}/>
          }
          <div className="flex justify-between">

          <div className="justify-start">
          
            <DatePicker
              className="w-12 text-xs bg-gray-100 p-1 mb-2 rounded text-center"
              selected={selectedDate}
              onChange={(date) => {
               
                selectDate(date);
              }}
              dateFormat="MMM d"
              placeholderText="Date"
            />
        
</div>
            <ul className="flex space-x-1 z-auto">
              
            {data.assignees.map((ass, index) => {
            if (members.length > 0) {
              if (index < 3) { 
                const member = members.find((m) => m.uid === ass);
                return (
                  <li key={ass} className="m-0 w-6 h-6">
                    {<AvatarPicture 
                    picture={member.picture} 
                    name={member.name}
                    containerWidth="6"
                    containerHeight="6"/>}
                  </li>
                );
              } else if (index === 3 && data.assignees.length > 3) {
                const numExtraMembers = data.assignees.length - 3;
                return (
                  <li key={ass} className="m-0 relative">
                    <div className="absolute right-1 bottom-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700 w-3 h-3 flex items-center justify-center">
                      +{numExtraMembers}
                    </div>
                  </li>
                );
              }
            }
          })}
            {!isMyTools &&
            
              <li className="z-0">
                <Dropdown>
                  <Dropdown.Button 
                  css={{
                    height: "auto",
                    width: "auto"
                }} 
                  
                  icon={<PlusCircleIcon className="w-5 h-5 text-gray-600" />}>

                  </Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions"
                      onAction={ (action) => {
                        const type = action.toString().split(' ')
                        switch(type[0]){
                          case 'add':
                            assignMember(action)
                            break
                          case 'remove':
                            assignMember(action)
                            break
                        }
                        
                      }}>
                      <Dropdown.Item key="label">Assigned people</Dropdown.Item>
                      {data.assignees.map((member) => {
                        
                      if (members.length > 0) {
                        
                        const assignee = members.find((m) => m.uid === member);
                        return (
                          <Dropdown.Item
                            key={"remove " + member}
                            icon={
                              <AvatarPicture 
                              picture={assignee.picture} 
                              name={assignee.name} 
                              containerWidth="8"
                              containerHeight="8"/>
                            }
                          >
                            {assignee.name}
                          </Dropdown.Item>
                        );
                      }
                      })}
                      <Dropdown.Item key="members" withDivider color="error">
                        Members
                      </Dropdown.Item>
                      {members.map((member) => {
                      if (!data.assignees.includes(member.uid)) {
                        return (
                          <Dropdown.Item
                            key={"add " + member.uid}
                            icon={
                              <AvatarPicture 
                              picture={member.picture} 
                              name={member.name}
                              containerWidth="8"
                              containerHeight="8" />
                            }
                          >
                            {member.name}
                          </Dropdown.Item>
                        );
                      }
                    })}

                    </Dropdown.Menu>
                </Dropdown>
              </li>
            }
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;