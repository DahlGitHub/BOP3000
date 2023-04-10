import React, { useState, useMemo } from "react";
import { getStorage, ref, listAll } from 'firebase/storage';
import Drawer from "../Drawer";
import FileLoader from "./FileLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFilter, faTractor, faTrash, faTrashCan, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import FileFilter from "./FileFilter";


const Files = () => {
  
    const storage = getStorage();

    const listRef = ref(storage, 'files/uid' )

    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
        res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });

        res.items.forEach((itemRef) => {
            // All the items under listRef.
        });

        }).catch((error) => {
        // Uh-oh, an error occurred!
        });

    const MainContent = () => {
        return (
          <div className="w-80">
            <FileUpload/>

            <div className="pl-0 mt-2 mr-2 mb-0 ml-2">
            <FileFilter/>
            </div>

            <div className="bg-gray-100 rounded-lg pl-0 mt-2 mr-2 mb-0 ml-2 hover:bg-gray-300">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <FontAwesomeIcon className="flex-shrink-0 object-cover rounded-full w-10 h-10 text-red-600 fa-lg"  icon={faFilePdf}/>
                  <div className="mt-0 mr-0 mb-0 flex-1 min-w-0">
                    <p className="text-gray-800 text-small ">Smallview.pdf</p>
                  </div>
                  <div className="mt-0 mr-0 mb-0 flex-2 mx-5 min-w-0">
                    <p className="text-sm text-gray-500 mx-1">246 kb</p>
                  </div>
                  
                </div>
                <div className="mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                    sm:mt-0">
                  <button type="button" className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm m-1 px-1.5 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <FontAwesomeIcon className='text-sm' icon={faTrashCan}/>
                  </button>
                </div>
              </div>
            </div>



            {
              // full view example
            }

            <div className="bg-gray-100 p-3 rounded-lg pl-0 mt-2 mr-2 mb-0 ml-2 hover:bg-gray-300">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <FontAwesomeIcon className="flex-shrink-0 object-cover rounded-full w-10 h-10 text-red-600 fa-2xl mx-3"  icon={faFilePdf}/>
                  <div className="mt-0 mr-0 mb-0 flex-1 min-w-0">
                    <p className="text-gray-800 text-md truncate w-5/6">Fullviewwererwe.pdf</p>
                    <div className="space-x-5">
                    <span className="text-sm text-gray-500">246 kb</span>
                    <span className="text-sm text-gray-500">Jan 30</span>
                    </div>
                  </div>
                  

                    
  
                  
                </div>
                <div className="mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 flex items-top sm:space-x-6 sm:pl-0 sm:justify-end
                    sm:mt-0">
                  <button type="button" className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm m-1 px-1.5 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <FontAwesomeIcon className='text-sm' icon={faTrashCan}/>
                  </button>
                </div>
              </div>
            </div>

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

  return ( 
  <>
    <section className="bg-white dark:bg-gray-900 flex">
        <div>
            <Drawer mainContent={<MainContent/>} title="Files" isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>
        {
        // Lag en metode for å vise fremvise de ulike metodene
        }
        <div className="">
          <FileLoader/>
        </div>
      </section>
  </>
)}

export default Files