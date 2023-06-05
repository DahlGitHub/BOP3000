import { db } from '../../../../firebase-config/firebase';
import { doc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const TeamSettingModal = ({isOpen, onClose, teamuid, tools}) => {
    const [toolName, setToolName] = useState([])
    useEffect(() => {
        setToolName([])
        tools.map((tool) => {
          const newTool = {key: tool.key, value: tool.key}
          setToolName((toolName) => [...toolName, newTool])
        })
    }, [tools, isOpen])

    const deleteTeam = (e) => {
    }
    
    const changeTeamName = (e) => {

    }

    const changeToolName = async (tool) => {
      const toolRef = doc(db, `teams/${teamuid}/tools/${tool.key}`);
      const newName = tool.value; // New name for the tool
      await updateDoc(toolRef, { name: newName });
    };

    const updateInput = (e, tool, i) => {
      const newToolName = e.target.value
      const newTool = {key: tool.key, value: newToolName}
      const newToolNameArray = [...toolName]
      newToolNameArray[i] = newTool
      setToolName(newToolNameArray)
    }

    const deleteTool = async (tool) => {
      const toolRef = doc(db, `teams/${teamuid}/tools/${tool.key}`);
    
      const memberSub = await getDocs(collection(toolRef, 'Members'))
      const kanbanSub = await getDocs(collection(toolRef, 'Kanban'));
      const filesSub = await getDocs(collection(toolRef, 'files'));
    
      const deleteMemberSubcollectionsPromises = memberSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
      const deleteKanbanSubcollectionsPromises = kanbanSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
      const deleteFilesSubcollectionsPromises = filesSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
    
      await deleteDoc(toolRef);
      await Promise.all(deleteMemberSubcollectionsPromises);
      await Promise.all(deleteKanbanSubcollectionsPromises);
      await Promise.all(deleteFilesSubcollectionsPromises);
    };

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
                
                {toolName.map((tool, i) => (
                    <div className='m-1'> 
                        <input className='border-2' value={toolName[i].value} onChange={(e)=>{updateInput(e, tool, i)}}></input>
                        <span className='cursor-pointer m-1' onClick={()=>{changeToolName(tool)}}><FontAwesomeIcon icon={faSave}/></span>
                        <span className='cursor-pointer m-1 text-red-700' onClick={() => { deleteTool(tool) }}><FontAwesomeIcon icon={faTrashCan}/></span>
                    </div>
                ))
                }

              </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={(e)=>{
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