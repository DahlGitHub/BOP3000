import { auth,db } from '../../firebase-config/firebase';
import { doc, collection, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import {useState, useEffect} from "react";

const TeamInvitesModal = ({isOpen, onClose, setInviteCount, fetchTeams}) => {
  
  const docImport = doc;

  const [invites, setInvites] = useState([]);
  const [addedUid, setAddedUid] = useState(null);

  useEffect(() => {
    async function fetchInvites() {
      const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "team-requests"));
    
      const promises = querySnapshot.docs.map(async (doc, index) => {
        const teamID = doc.data().uid;
        const inviter = doc.data().inviter;
        const inviterName = doc.data().inviterName;
        const teamDoc = await getDoc(docImport(db, "teams", teamID));
        const teamData = teamDoc.data();
        const element = (
          <div key={doc.id}  className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
            <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">You have been invited to join {teamData.name}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Invite sent by {inviterName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email: {inviter}</p>
            </div>
            <button onClick={() => submit(teamID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2">Accept</button>
            <button onClick={() => decline(teamID)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2">Decline</button>
          </div>
        );
    
        return element;
      });
    
      const results = await Promise.all(promises);
      setInvites(results);
      await setInviteCount(results.length);
    }
    
     fetchInvites();
    }, []); // Run this effect only once on component mount



    const submit = async (teamuid) => {
        onClose()

        if (teamuid) {
            const docRef = doc(db, "teams", teamuid, "members", auth.currentUser?.uid);
            await setDoc(docRef, {
              uid: auth.currentUser?.uid,
            });

            const userRef = doc(db, "users", auth.currentUser?.uid, "teams", teamuid);
            await setDoc(userRef, {
                uid: teamuid,
            });

            deleteDoc(doc(db, "users", auth.currentUser?.uid, "team-requests", teamuid));
            onClose();
            await fetchTeams();
        }
    }

    const decline = async (teamuid) => {
        onClose()
        if (addedUid) {
            deleteDoc(doc(db, "users", auth.currentUser?.uid, "team-requests", teamuid));
            onClose();
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
                    Team Invites
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">

                  
                   {invites} 

                    
                        
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

export default TeamInvitesModal