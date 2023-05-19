import { auth, storage, db } from '../../../../firebase';
import { doc, collection, deleteDoc, setDoc, getFirestore } from "firebase/firestore";
import { Collapse, Input } from '@nextui-org/react';
import {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const TeamSettingModal = ({isOpen, onClose, teamuid, tools}) => {
  const userStorageRef = `users/teams`//id til gruppen skal her
  const [name, setName] = useState("");
  const [toolType, setToolType] = useState(null)
  
  const submit = async () => {
    const nameInp = name;
    const toolTypeInp = toolType;
    setName("");
    setToolType(null);
    onClose()
    if (!nameInp && !toolTypeInp) {
      console.log("none test")
          return
      } else if(!tools.find(tool => tool.key === name)){
        await setDoc(doc(db, `teams/${teamuid}/tools/${name}`), {
            name: name,
            tool: toolType,
        })
    } 
  }  

    const deleteTeam = (e) => {
    }
    const changeTeamName = (e) => {
    }
    const changeToolName = (e) => {
        console.log(e.key)
    }
    const deleteTool = (e) => {
        deleteDoc(doc(db, `teams/${teamuid}/tools/${e.key}`))        
    }

    return (
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed z-10 inset-0 overflow-y-auto`}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
            onClick={(e)=>{
              setName("");
              setToolType(null);
              onClose(e);
            }}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } inline-block align-bottom bg-white  dark:text-white  dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium"
                  id="modal-headline"
                >
                  Settings
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">                     
                
                <input
                  name='toolNameInput'
                  id='toolNameInput'
                  type="text"
                  aria-label="Tool input"
                  value={name}
                  onChange={e => { setName(e.currentTarget.value); }}
                  
                  color='primary'
                  placeholder="Tool name"
                  className='m-4 text-black dark:text-white dark:bg-gray-800 border-solid border-gray-300 border-2 rounded-xl w-full h-12 pl-4 pr-4 pt-2 pb-2'
                    
                />
                
                {tools.map((tool, i) => (
                    <div className='m-1'> 
                        <input value={tool.key}></input>
                        <span onClick={()=>{changeToolName(tool)}}><FontAwesomeIcon icon={faSave}/></span>
                        <span onClick={() => { deleteTool(tool) }}><FontAwesomeIcon icon={faTrashCan}/></span>
                    </div>
                ))
                }

              </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={(e)=>{
                setName("");
                setToolType(null);
                onClose(e);
              }}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default TeamSettingModal