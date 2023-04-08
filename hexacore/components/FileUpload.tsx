import React from "react";

const FileUpload = () => {
    return (
        <div className="mx-3 mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 truncate w-64" aria-describedby="file_input_help" id="file_input" type="file"/>
            <p className="mt-1 ml-1 text-[12px] text-gray-500 dark:text-gray-300" id="file_input_help">PDF (Max. 10 MB).</p>
        </div>
    );
  };

  export default FileUpload