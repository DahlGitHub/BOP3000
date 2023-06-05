import { auth, db } from "../../firebase-config/firebase";
import { doc, setDoc } from "firebase/firestore";
import {useState} from "react";


const AddMyToolsModal = ({isOpen, onClose, fetchTools, tools}) => {
  
  const [name, setName] = useState(null);
  const [toolType, setToolType] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
    const submit = async () => {
      if(name && toolType) {
        if(!tools.find(tool => tool.key === name)){
          await setDoc(doc(db, `users/${auth.currentUser?.uid}/tools/${name}`), {
            name: name,
            tool: toolType,
          }).then(() => {
            setName(null);
            setToolType(null);
            fetchTools();
            onClose()
          })
        }

      } else if(tools.find(tool => tool.key === name)){
        setErrorMessage("Toolname already exists")
      } else if (!name){
        setErrorMessage("Please enter a name for your tool.")
      }
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
              setName(null);
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
            <div className="mt-3 text-center sm:mt-5">
              
              <div className="mt-2">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <div
                    className={`${
                      toolType ? 'hidden' : 'block'
                    } `}
                  >
                    <h3
                      className="text-lg leading-6 font-medium mb-6"
                      id="modal-headline"
                    >
                      Select the type of tool you want to create
                    </h3>
                    <div onClick={() => setToolType("kanban")} className={`cursor-pointer border-solid border-2 border-white text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 ${toolType === "kanban" ? "ring-2 ring-[#38BDF8]" : ""}`}>
                        <h1>Kanban</h1>
                      </div>

                      <div onClick={() => setToolType("files")} className={`cursor-pointer border-solid border-2 border-white text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 ${toolType === "files" ? "ring-2 ring-[#38BDF8]" : ""}`}>
                        <h1>File Folder</h1>
                      </div>
                  </div>
                  <div
                    className={`${
                      toolType ? 'block' : 'hidden'
                    } `}
                  >
                    <h3
                      className="text-lg leading-6 font-medium mb-6"
                      id="modal-headline"
                    >
                      Enter the name of your {toolType} tool
                    </h3>
                    <h4 className="text-red-500">{errorMessage}</h4>
                    <input
                      name='toolNameInput'
                      id='toolNameInput'
                      type="text"
                      aria-label="Tool input"
                      value={name}
                      onChange={e => { setName(e.currentTarget.value); }}
                      
                      color='primary'
                      placeholder="Tool name"
                      className=' text-black dark:text-white dark:bg-gray-800 border-solid border-gray-300 border-2 rounded-xl w-full h-12 pl-4 pr-4 pt-2 pb-2'
                        
                    />
                    
                    <div className="w-full mt-6">
                      <a onClick={submit} className="flex mb-6 text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                          font-medium text-white bg-blue-600 rounded-xl transition duration-500 ease-in-out transform
                          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Add tool</a>
                    </div>
                    <button onClick={()=>{
                        setName("");
                        setToolType(null);
                      }} className="bg-red-500 hover:bg-blue-700 text-white w-full pt-4 pr-10 pb-4 pl-10 text-base
                      font-medium rounded-xl">
                        Select a different tool type
                      </button>
                </div>
              </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={(e)=>{
                setName(null);
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

export default AddMyToolsModal