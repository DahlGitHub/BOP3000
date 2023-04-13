import React, { useEffect, useState } from "react";
import {
    ChevronDownIcon,
    PlusIcon,
    
    PlusCircleIcon,
  } from '@heroicons/react/24/outline'
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faLayerGroup, faPenToSquare, faTrash, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Dropdown } from "@nextui-org/react";
import { arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

function CardItem({ data, index, members }) {
  const [editTaskName, setEditTaskName] = useState(false)
  const [title, setTitle] = useState(data.title)
  const q = query(collection(db, 'groups', 'a82bcf3fff364e71b2a8bb39903be3dd', 'kanbanid'), where('items', 'array-contains', data))
  const assignMember = async (member) => {
    //mangler å sette index på arrayet
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
      await updateDoc(doc(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', docs.data().id), {
        items: items,
      });
      
    })
  }
  const changeName = async (e) =>{
    if(e.key === 'Enter'){
      const docRef = await getDocs(q)
      docRef.docs.forEach(async(docs) => {
        const items = docs.data().items.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              title: e.target.value,
            };
          }
          return item;
        });
        await updateDoc(doc(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', docs.data().id), {
          items: items,
        });
        });
        setEditTaskName(false)
    }
  
  }
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
      await updateDoc(doc(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', docs.data().id), {
        items: items,
      });
      });
  
  }

  const deleteTask = async () => {
    const docRef = await getDocs(q)
    docRef.docs.forEach(async(docs) => {
      const items = docs.data().items.filter((item) => item.id !== data.id);
      await updateDoc(doc(db, '/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid', docs.data().id), {
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
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <div>
            <Dropdown>
              <Dropdown.Trigger>
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
              </Dropdown.Trigger>
              <Dropdown.Menu
                    className="text-center p-1"
                    selectionMode="single"
                    css={{ $$dropdownMenuMinWidth: "100px" }}
                    onAction={(key)=>{
                      editPrio(key)
                    }}
                    >
                    <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-blue-600 to-blue-400" key='0 low'>
                      Low Priority
                    </Dropdown.Item>
                    <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-green-600 to-green-400" key='1 medium'>
                      Medium Priority
                    </Dropdown.Item>
                    <Dropdown.Item className="my-3 bg-gradient-to-r text-white text-sm from-red-600 to-red-400" key='2 high'>
                      High Priority
                    </Dropdown.Item>
                  </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown>
              <Dropdown.Trigger><FontAwesomeIcon className='pl-3 pr-2 cursor-pointer' icon={faEllipsisVertical}/></Dropdown.Trigger>
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
            ? <h5 onClick={()=>{setEditTaskName(!editTaskName)}} className="text-md my-3 text-lg leading-6" >{title}</h5>
            : <input type="text" autoFocus={true} className="text-md my-3 text-lg leading-6 w-full" value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={(e) => changeName(e)}/>
          }
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-500" />
                <span>{data.assignees.length}</span>
              </span>
            </div>
            <ul className="flex space-x-3">
              {data.assignees.map((ass, index) => {
               if(members.length > 0){
                return (
                  <li key={ass}>
                    <img
                      src={members.find((m) => m.uid === ass).photo}
                      width="36"
                      height="36"
                      className=" rounded-full "
                      alt=""
                    />
                  </li>
                )
               }
                
              })}
              <li>
                <Dropdown>
                  <Dropdown.Button auto icon={<PlusCircleIcon className="w-5 h-5 text-gray-500" />}></Dropdown.Button>
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
                      <Dropdown.Item key="new">Add people to task</Dropdown.Item>
                      <Dropdown.Item key="label" withDivider>Assigned people</Dropdown.Item>
                      {data.assignees.map((member)=>{
                       if(members.length > 0){
                        return(
                          <Dropdown.Item key={'remove '+member} icon={<img
                            src={members.find((m) => m.uid === member).photo}
                            width="36"
                            height="36"
                            className=" rounded-full "
                            alt=""
                          />}>
                                {members.find((m) => m.uid === member).name}
                          </Dropdown.Item>
                          )
                        }
                      })}
                      <Dropdown.Item key="members" withDivider color="error">
                        Members
                      </Dropdown.Item>
                      {members.map((member)=>{
                       if( !data.assignees.includes(member.uid)){
                        return(
                          <Dropdown.Item key={'add '+member.uid} icon={<img
                              src={member.photo}
                              width="36"
                              height="36"
                              className=" rounded-full "
                              alt=""
                            />}>
                              {member.name}
                          </Dropdown.Item>
                        )
                       }
                          
                        
                      })}
                    </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;


