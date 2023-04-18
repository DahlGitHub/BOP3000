import { faArrowRight, faArrowRotateRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const Drawer = ({mainContent, title, isOpen, open, close}) => {

    

    return(
        <div>
            <div
            className={`${
                isOpen ? 'block' : 'hidden'
            } `}
            >
                <div className="absolute mx-2 my-3 left-15 z-50">
                        <button onClick={close} className="w-full items-center p-1 mx-1 text-center bg-gray-200 text-[14px] font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                    </div>
                <div className="h-[calc(100vh-70px)] w-auto py-4 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-center text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {title}
                    </div>
                    <div className="mt-8 space-y-4">

                        {mainContent}
                
                        
                    </div>
                    
                </div>
            </div>
            <div
            className={`${
                isOpen ? 'hidden' : 'block'
            } `}
            >
                    <div className="absolute mx-2 my-3 left-15 z-50">
                        <button onClick={open} className="w-full items-center p-1 mx-1 text-center bg-gray-200 text-[14px] font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                        <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
            </div>
        </div>
    )

}

export default Drawer