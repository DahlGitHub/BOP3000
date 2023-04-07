import React, { useState, useMemo } from "react";
import { getStorage, ref, listAll } from 'firebase/storage';
import Drawer from "./Drawer";
import FileLoader from "./FileLoader";


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
          <>
            Hello
          </>
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