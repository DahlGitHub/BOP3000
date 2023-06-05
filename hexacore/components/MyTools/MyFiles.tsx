import React, { useState, useMemo, useEffect } from "react";
import { getStorage, ref, listAll } from 'firebase/storage';
import Drawer from "../Drawer";
import FileLoader from "../File/FileLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFile, faFilePdf, faFilter, faList, faList12, faTractor, faTrash, faTrashCan, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../File/FileUpload";
import FileFilter from "../File/FileFilter";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-config/firebase";
import FileModal from "../File/FileModal";



const MyFiles = ({handleFilesDeselect}) => {
  
  const storage = getStorage();
  const listRef = ref(storage, 'files/uid' )

  const totalStorage = 5;
  const [usedStorage, setUsedStorage] = useState(0);

  const usedStorageInGB = usedStorage / 1073741824;
  const showStorage = `${(usedStorageInGB / totalStorage) * 100}%`;

  const [showFullView, setShowFullView] = useState(false);
  const toggleShowFullView = () => setShowFullView(prevState => !prevState);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };


  const MainContent = () => {
    return (
      <div className="w-70">
        <FileUpload fetch={fetchFiles}/>
        
        <div className="pl-0 mt-2 mr-2 mb-0 ml-2">
        <FileFilter/>
        </div>
        <div className="flex">
        <button className="pl-0 mb-0"
        onClick={toggleShowFullView}>
          <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mt-2 mr-2 mb-0 ml-2 hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-gray-200">
          {showFullView ? <FontAwesomeIcon icon={faList}/> : <FontAwesomeIcon icon={faList12}/>}
          </div>
        </button>
        
        <div className="pl-0 mb-0 w-96">
          <div className="bg-gray-100 p-3 rounded-lg mt-2 mr-2 mb-0 ml-2 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">
            <FontAwesomeIcon className="text-gray-600 fa-sm dark:text-gray-100" icon={faCloudArrowUp}/><span className="ml-2 text-[12px] text-gray-500 dark:text-gray-200">{formatBytes(usedStorage.toFixed(1))} / {totalStorage} GB storage used</span>
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
              <div className="bg-blue-600 h-1 rounded-full" style={{width: showStorage}} ></div>
            </div>
          </div>
        </div>
        </div>

        {files}
        
      </div>
    );
  };

    const [isListOpen, setIsListOpen] = React.useState(true);

    function handleListOpen() {
        setIsListOpen(true);
    }
    
    function handleListClose() {
        setIsListOpen(false);
    }

    const [files, setFiles] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelect = (file) => {
      setSelectedFile(file)
    }

    const fetchFiles = async () => {
      const querySnapshot = await getDocs(query(collection(db, "users", auth.currentUser?.uid, "files")));
      const newFiles = querySnapshot.docs.map((doc) => {
        const fileData = doc.data();
    


        return (
          <div key={fileData.id} onClick={() => handleSelect(fileData)} className="cursor-pointer border shadow-sm p-3 rounded-lg pl-0 mt-2 mr-2 mb-0 ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <FontAwesomeIcon className="flex-shrink-0 object-cover rounded-full w-10 h-10 text-red-600 fa-2xl mx-3"  icon={faFilePdf}/>
                  <div className="mt-0 mr-0 mb-0 flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-white text-md truncate w-5/6">{fileData.name}</p>
                    <div className="space-x-5">
                    <span className="text-sm text-gray-500">{formatBytes(fileData.size)}</span>
                    <span className="text-sm text-gray-500">{fileData.date}</span>
                    </div>
                  </div>
                  
                </div>
                <div className="mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 flex items-top sm:space-x-6 sm:pl-0 sm:justify-end
                    sm:mt-0">
                  <button type="button" onClick={handleModalOpen} className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm m-1 px-1.5 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <FontAwesomeIcon className='text-sm' icon={faTrashCan}/>
                  </button>
                </div>
              </div>
            </div>
        );
      });
      const usedStorage = querySnapshot.docs.reduce((acc, doc) => {
        const fileData = doc.data();
        const fileDataSize = Number(fileData.size);
        if (!isNaN(fileDataSize)) {
          return acc + fileDataSize;
        }
        return acc;
      }, 0);
      setUsedStorage(usedStorage);
    
      setFiles(newFiles);
    };

    useEffect(() => {
      
      fetchFiles();
    }, []);


    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }
    
    function handleModalClose() {
        setIsModalOpen(false);
    }

  return ( 
  <>
    <section className="bg-white dark:bg-gray-900 flex">
        <div>
            <Drawer mainContent={<MainContent/>} title={<button onClick={() => handleFilesDeselect()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mx-8">Back to tools</button>} isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>
        <FileModal isOpen={isModalOpen} onClose={handleModalClose} fetch={fetchFiles} name={selectedFile ? selectedFile.name : "None"} size={selectedFile ? selectedFile.size : "None"}/>
        {
        // Lag en metode for å vise fremvise de ulike metodene
        }
        <div className="">
          <FileLoader file={selectedFile}/>
        </div>
      </section>
  </>
)}

export default MyFiles;