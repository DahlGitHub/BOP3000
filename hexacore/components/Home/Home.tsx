import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import fetchTeams from "../Team/fetchTeams";
import { useRouter } from "next/router";
import AvatarPicture from "../AvatarPicture";
import WelcomeMessage from "./WelcomeMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";

const Home = () => {

    const [contacts, setContacts] = useState([]);
    const [teams, setTeams] = useState([]);
    const docImport = doc;

    const [user] = useAuthState(auth);
    const username = user.displayName?.substring(0, user.displayName.indexOf(' '))

    useEffect(() => {
        async function fetchContacts() {
            if(!auth.currentUser) return;
          const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "contacts"));
            if(querySnapshot.empty){
                setContacts(null)
            } else {
                const promises = querySnapshot.docs.map(async (doc, index) => {
                const userId = doc.data().uid;
                const userDoc = await getDoc(docImport(db, "users", userId));
                const userData = userDoc.data();
                const element = (
                <button key={doc.id} className="rounded flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                    <AvatarPicture picture={userData.picture} name={userData.name} containerWidth={"10"} containerHeight={"10"}/>
                    <div className="text-left rtl:text-right">
                    <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{userData.name}</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                    </div>
                </button>
                );
            
                return element;
            });
            
                const results = await Promise.all(promises);
                setContacts(results);
            }
        }
        
        fetchContacts();
        fetchTeams()
    }, []); // Run this effect only once on component mount

    async function fetchTeams() {
        if(!auth.currentUser) return;
        const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "teams"));
        const elements = [];
        
        if(querySnapshot.empty) {
          setTeams(null)
        } else {
          const promises = querySnapshot.docs.map(async (doc) => {
            
            const teamID = doc.id;
            const teamDoc = await getDoc(docImport(db, "teams", teamID));
            const teamData = teamDoc.data();
            const element = (
                <div className="rounded cursor-pointer m-2 flex items-center px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                    <h1 key={teamData.teamuid} className="text-black font-bold dark:text-white text-xl text-center flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        {teamData.name}
                    </h1>
                    <p>10 members</p>
                </div>
            );
          elements.push(element);
        });
  
        await Promise.all(promises);
        setTeams(elements); // set the elements array instead of results
  
        }
    }

    const router = useRouter();

    return(
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white h-full">
            <div className="p-10">
                <WelcomeMessage name={username}/>
            </div>
            <div className="m-10 border-solid border-2 border-sky-500 rounded">
                <h1 className="text-xl p-5">Get started</h1>
                <div className="flex">
                    <div className="m-5">
                        <div className="mb-3">
                            <h1 className="text-lg font-bold">Teams</h1>
                            <p className=""> 
                                With teams you and your associates can start organizing your work quickly.
                                This will be your teams space for tools like kanban boards, 
                                filesharing and groupchat which can all be created in seconds.
                            </p>
                        </div>
                        <button onClick={() => router.push("/dashboard/teams")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create a team</button>
                    </div>
                    <div className="m-5">
                        <div className="mb-3">
                            <h1 className="text-lg font-bold">Contacts</h1>
                            <p className=""> 
                                Adding contacts to your account will allow you to easily communicate with them.
                                With our chat system you can easily send messages to eachother.
                            </p>
                        </div>
                        <button onClick={() => router.push("/dashboard/contacts")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a contact</button>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <Profile name={username}/>
                <div className={`${teams ? 'block' : 'hidden'} m-10 border-solid border-2 border-sky-500 rounded`} >
                    <h1 className="text-xl p-5">Your teams:</h1>
                    {teams}
                </div>
                    
                <div className={`${contacts ? 'block' : 'hidden'} m-10 border-solid border-2 border-sky-500 rounded`}>
                    <h1 className="text-xl p-5">Contacts online:</h1>
                    <div className="m-2">
                        {contacts}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home