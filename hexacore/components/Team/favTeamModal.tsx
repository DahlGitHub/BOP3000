import { useEffect, useState } from 'react';
import { auth,db } from '../../firebase-config/firebase';
import { doc, collection, addDoc, setDoc, getFirestore, getDocs, query, getDoc, deleteDoc } from "firebase/firestore";

const FavTeamModal = ({isOpen, onClose, teamName, teamID, fetchTeams}) => {
  
    const [isFavoriteTeam, setIsFavoriteTeam] = useState(false);

    useEffect(() => {
        const getFavTeamID = async () => {
        const prevFavTeam = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
            if(prevFavTeam.docs.length === 0) {
                setIsFavoriteTeam(false);
                return;
            } else {
                const favTeamID = prevFavTeam.docs[0].id;
                setIsFavoriteTeam(teamID === favTeamID);
            }
        };
        getFavTeamID();
    }, [teamID]);
  
    const submit = async () => {

        const prevFavTeam = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
        if(prevFavTeam.docs.length !== 0) {
            const favTeamID = prevFavTeam.docs[0].id;
            await deleteDoc(doc(db, "users", auth.currentUser?.uid, "favTeam", favTeamID));
        }
        const docRef = doc(db, "users", auth.currentUser?.uid, "favTeam", teamID);
        await setDoc(docRef, {
          teamID: teamID
        });
        
        
        onClose();
        await fetchTeams();
    }

    const removeFavTeam = async () => {
        const prevFavTeam = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
        const favTeamID = prevFavTeam.docs[0].id;
        await deleteDoc(doc(db, "users", auth.currentUser?.uid, "favTeam", favTeamID));
        setIsFavoriteTeam(false);
        onClose();
        await fetchTeams();
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
                <div className={`${
                    isFavoriteTeam ? 'hidden' : 'block'
                } `}>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3
                        className="text-lg leading-6 font-medium"
                        id="modal-headline"
                        >
                            Set {teamName} as Favorite Team?
                        </h3>
                    <div className="mt-2">
                        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">

                            <h2>
                                This will set {teamName} as your favorite team. 
                            </h2>
                            <p className='mt-5'>You can only have one favorite team at a time.
                                You will automaticly be sent to your favorite team's page when you enter teams.
                            </p>

                            <button onClick={() => submit()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10 mx-8'>Set {teamName} as my favorite team</button>     
                        </div>

                    </div>
                </div>
                </div>
                <div className={`${
                    isFavoriteTeam ? 'block' : 'hidden'
                } `}>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3
                        className="text-lg leading-6 font-medium"
                        id="modal-headline"
                        >
                            Do you want to remove {teamName} as your favorite team?
                        </h3>
                        <p className='mt-5'>
                            If you want to assign a team as your favorite team, you can do so by clicking on the star next to the team's name.
                        </p>
                        <button onClick={() => removeFavTeam()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-10 mx-8'>Remove {teamName} as my favorite team</button>
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

export default FavTeamModal