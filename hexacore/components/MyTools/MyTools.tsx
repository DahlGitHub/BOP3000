import Drawer from "../Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCogs, faComments, faFolderOpen, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddMyToolsModal from "./AddMyToolsModal";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../../firebase-config/firebase";
import MyFiles from "./MyFiles";
import Kanban from "../Kanban/Kanban";
import { set } from "firebase/database";


const MyTools = () => {

    const [tools, setTools] = useState([]);
    const [toolName, setToolName] = useState(null);
    const [selectedTool, setSelectedTool] = useState(false);
    const [toolType , setToolType] = useState(null);

    const [isListOpen, setIsListOpen] = useState(true);

    const handleListOpen = () => {
        setIsListOpen(true);
    }

    const handleListClose = () => {
        setIsListOpen(false);
    }

    const [isToolModalOpen, setIsToolModalOpen] = useState(false);

    const handleToolModalOpen = () => {
        setIsToolModalOpen(true);
    }

    const handleToolModalClose = () => {
        setIsToolModalOpen(false);
    }

    const fetchTools = async () => {
        const querySnapshot = await getDocs(
          query(collection(db, "users", auth.currentUser?.uid, "tools"))
        );
        const newTools = querySnapshot.docs.map((doc) => {
            const toolData = doc.data();
          
            if (toolsi.find((e) => e.tool === toolData.tool)) {
              return {
                id: doc.id,
                name: toolData.name,
                tool: toolData.tool,
                icon: toolsi.find((e) => e.tool === toolData.tool).icon,
              };
            } else {
              return null;
            }
        });
        setTools(newTools.filter((tool) => tool !== null)); // Filter out null elements
      };

    
    const toolsi = [
        {tool: "kanban", icon: faWindowMaximize},
        {tool: "chat", icon: faComments},
        {tool: "files", icon: faFolderOpen}
    ]
    const handleToolSelect = (toolName, type) => {
        setSelectedTool(true);
        setToolName(toolName);
        setToolType(type);
    
        if (type === "files") {
            setShowFiles(true);
        } else if (type === "kanban") {
            setShowKanban(true);
            setToolName(toolName);
        } else {
            setShowFiles(false);
            setShowKanban(false);
        }
    }

    function handleToolDeselect() {
        setSelectedTool(false);
        setSelectedFiles(false);
        setShowFiles(false);
        setToolName(null);
    }

    const [selectedFiles, setSelectedFiles] = useState(false);
    const [showFiles, setShowFiles] = useState(false);

    const [showKanban, setShowKanban] = useState(false);
  
    function handleFilesSelect(toolName) {
        setSelectedFiles(true);
        setToolName(toolName);
    }

    const kanbanID = "users/" + auth.currentUser?.uid + "/tools/kanban/" + toolName;

    const showTool = () => {
        switch (toolType) {
          case "kanban":
            return(
              <Kanban id={kanbanID} membersId={"users/" + auth.currentUser?.uid + "/tools/"+ kanbanID +"/members"} />
            )
          case "files":
            handleFilesSelect(toolName)
        }
      }

    useEffect(() => {
        fetchTools();
    }, []);


    const MainContent = () => {
        return (
          <div>
            <div className='m-5'>
              <h1 className='text-xl'>Tools:</h1>
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className='cursor-pointer m-3'
                  onClick={() => handleToolSelect(tool.name, tool.tool)}
                >
                  <h3>
                    <FontAwesomeIcon
                      className='pr-2'
                      icon={tool.icon}
                    />
                    {tool.name}
                  </h3>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => handleToolModalOpen()} className="m-5 text-white p-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              <FontAwesomeIcon className='pr-2' icon={faCogs}/>
              Add tool
            </button>
          </div>
        );
      }


    return(
        <div className=" bg-white  dark:text-white  dark:bg-gray-800">
            <AddMyToolsModal isOpen={isToolModalOpen} tools={tools} onClose={handleToolModalClose} fetchTools={fetchTools}/>
            <div className="flex">    
                    <div>
                        <Drawer mainContent={<MainContent/>} 
                            title={
                                "My tools"
                            } 
                            isOpen={isListOpen} open={handleListOpen} close={handleListClose} 
                        />
                    </div>
                {selectedTool && !selectedFiles ?
                        (
                            <div className="grow flex overflow-auto dark:text-black w-64">
                                {showTool()}
                            </div>
                        ):
                        (
                            <div className='grow'></div>
                        )
                }
            </div>
            <div
                className={`${
                showFiles ? 'block' : 'hidden'
                } `}
            >
                {showFiles && <MyFiles handleFilesDeselect={handleToolDeselect}/>}
            </div>
        </div>
    )

}

export default MyTools;