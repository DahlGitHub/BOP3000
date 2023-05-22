import { app, auth, db, storage} from '../../firebase-config/firebase';
import { doc, collection, addDoc, setDoc, getFirestore } from "firebase/firestore";
import { Input } from '@nextui-org/react';
import {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const CreateTeamModal = ({isOpen, onClose, fetchTeams}) => {
    const userStorageRef = `users/groups`//id til gruppen skal her
    const [name, setName] = useState("");

    const submit = async () => {
        onClose()
        
        const teamuid = uuidv4().replaceAll("-","");

        if (!name) {
            return
        } else {
           await setDoc(doc(db, `teams/${teamuid}`), {
                name: name,
                ownerId: auth.currentUser?.uid,
                teamuid: teamuid,
            }).then(async()=>{
              const user = auth.currentUser
              setDoc(doc(db,`teams/${teamuid}/members/${teamuid}`), {
                uid: user.uid,
              })
              setDoc(doc(db, `users/${user.uid}/teams/${teamuid}/`),{
                teamuid: teamuid
              })
            }).then(()=>{
              fetchTeams()
            }
            ).catch((error) => {
              console.log(error);
            }
            )
        }
    }
        
        

    return (
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed z-10 inset-0 overflow-y-auto`}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } inline-block align-bottom bg-white  dark:text-white  dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium"
                  id="modal-headline"
                >
                  Create a team
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">

                <input
                  name='teamNameInput'
                  id='teamNameInput'
                  type={"Name"}
                  aria-label="team name input"
                  onChange={e => { setName(e.currentTarget.value); }}
                  color="primary"
                  placeholder="Team name"
                  className='m-4 rounded px-5 py-3 text-black border-solid border-2 border-sky-500'
                    
                />
                
                <div className="w-full mt-6">
                  <a onClick={submit} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                      font-medium text-white bg-blue-600 rounded-xl transition duration-500 ease-in-out transform
                      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create team</a>
                </div>
              </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={onClose}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default CreateTeamModal