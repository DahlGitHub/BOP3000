import React from "react";


const Drawer = ({mainContent, title, isOpen, open, close}) => {

    

    return(
        <div>
            <div
            className={`${
                isOpen ? 'block' : 'hidden'
            } `}
            >
                <div className="h-screen w-auto py-8 overflow-y-auto bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                    
                    <h1 className="text-center text-lg leading-6 font-medium text-gray-900 dark:text-white">{title}</h1>
                    
                    <div className="mt-8 space-y-4">

                        {mainContent}

                        <button onClick={close} className="w-full items-center p-2 text-center font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Hide
                        </button>
                    </div>
                </div>
            </div>
            <div
            className={`${
                isOpen ? 'hidden' : 'block'
            } `}
            >
                <div className="max-h-fit w-auto py-8 overflow-y-auto bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-8 p-3">
                        <button onClick={open} className="w-full items-center p-2 text-center font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Show {title}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Drawer