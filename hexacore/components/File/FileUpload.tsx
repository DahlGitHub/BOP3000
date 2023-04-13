import React, {useState} from 'react';
import { faTrashCan, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';


const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSize, setFileSize] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [fileUrl, setFileUrl] = React.useState(null)
    const [fileName, setFileName] = React.useState(null)

    const now = new Date();
    const dateString = now.toLocaleDateString();

    const handleFileSelect = async (e) => {
        setSelectedFile(e.target.files[0]);
        setFileSize(formatBytes(e.target.files[0].size))
        setFileName(e.target.files[0].name)
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add doc med Firebase
        const file = selectedFile;
            const storageRef = ref(storage, `/Files/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
      
            uploadTask.on("state_changed",
            (snapshot) => {
            },
            (error) => {
              alert(error);
            },
            () => {
              
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUrl(downloadURL)
                    console.log("FileUrl " + downloadURL);
                });
            }
        );

        const docData = {
            
            name: fileName,
            file: fileUrl,
            date: dateString,
            size: fileSize
        }
        if (!fileUrl) {
            return
        } else {
           await setDoc(doc(db, "users", auth.currentUser?.uid, "files", fileName), docData)
            
            alert("File added")
        }

        // Hvis lastet opp, sett deretter filen til null ;)
        setSelectedFile(null);
        setFileSize("");
        setUploadDate(dateString);
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setFileSize("");
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    return (
        <div className="mx-2 mb-5">
            <div className="flex items-center justify-center">

            <form className="w-full">
                {selectedFile ? (
                    <div>
                    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-4">
                        <span className="text-sm text-gray-700 truncate w-3/4"><FontAwesomeIcon className='mx-2' icon={faFile}/>{selectedFile.name}</span>
                        <span className="text-sm text-gray-500">{fileSize}</span>
                        
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Upload</button>
                        <button type="button" onClick={handleCancel} className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-2 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            <FontAwesomeIcon className='mx-1' icon={faTrashCan}/>Cancel</button>
                    </div>
                    <span className="text-sm text-gray-500">{uploadDate}</span>
                  </div>
            ) : (
                <div>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FontAwesomeIcon className="w-10 h-10 mb-3 text-gray-400" icon={faUpload}/>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF (Max. 20 MB)</p>
                        </div>
                        
                    <input
                        type="file"
                        id="dropzone-file"
                        className="sr-only"
                        onChange={handleFileSelect}
                        accept=".pdf"
                        max-size="20971520"
                    />
                    </label>
             
                </div>
            )}
            </form>    
            </div>  
        </div>
    );
  };

  export default FileUpload