import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FileFilter = () => {

  return (
    <div>
      
    <div className="flex border border-gray-300 rounded-lg">
        <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
            <FontAwesomeIcon icon={faFilter}/>
            <span className="ml-2">Filter by</span>
            
        </div>

        <select id="countries" className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-r-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={"0"}>None</option>
          <option value="1">Date</option>
          <option value="2">Lowest size</option>
          <option value="3">Biggest size</option>
          <option value="4">A-Z</option>
          <option value="5">Z-A</option>
        </select>

    </div>

    </div>
  );
}

export default FileFilter