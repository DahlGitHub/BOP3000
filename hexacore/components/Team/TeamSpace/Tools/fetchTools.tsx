import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faFolderOpen, faWindowMaximize } from "@fortawesome/free-regular-svg-icons";

const fetchTools = async (selectedTeam, handleChatSelect, handleFilesSelect, setTools) => {
    const querySnapshot = await getDocs(query(collection(db, "teams", selectedTeam, "tools")));
    const newFiles = querySnapshot.docs.map((doc) => {
      const fileData = doc.data();
  
      if (fileData.tool === "kanban") {
        return (
          <div className='cursor-pointer m-3'>
            <h3><FontAwesomeIcon className='pr-2' icon={faWindowMaximize}/>{fileData.name}</h3>
          </div>
        );
      } else if (fileData.tool === "chat") {
        return (
          <div className='cursor-pointer m-3' onClick={() => handleChatSelect(fileData.name)}>
            <h3><FontAwesomeIcon className='pr-2' icon={faComments}/>{fileData.name}</h3>
          </div>
        );
      } else if (fileData.tool === "files") {
        return (
          <div className='cursor-pointer m-3' onClick={() => handleFilesSelect(fileData.name)}>
            <h3><FontAwesomeIcon className='pr-2' icon={faFolderOpen}/>{fileData.name}</h3>
          </div>
        );
      } else {
        // Handle other tool types here
        return null;
      }
    });
  
    setTools(newFiles);
  };

  export default fetchTools;