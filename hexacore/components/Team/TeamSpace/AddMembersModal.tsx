import { auth, db } from '../../../firebase';
import { doc, collection, addDoc, setDoc, getFirestore, query, where, getDocs, getDoc } from "firebase/firestore";
import {useState, useEffect} from "react";


const AddMembersModal = ({isOpen, onClose, teamuid}) => {
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [picture, setPicture] = useState("");
const [addedUid, setAddedUid] = useState("");
const [users, setUsers] = useState([]);

const [filteredResults, setFilteredResults] = useState([]);
const [searchQuery, setSearchQuery] = useState("");


useEffect(() => {
  if (teamuid) {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(query(collection(db, "users")));
      const newFiles = querySnapshot.docs.map((doc) => doc.data());
      setUsers(newFiles);
    };

    fetchUsers();
  }
}, [teamuid]); // Run this effect only once on component mount



const handleClick = (props) => {
  setAddedUid(props.objectID);
};

const submit = async () => {
  if (addedUid) {
    const docRef = doc(db, "users", addedUid, "team-requests", teamuid);
    await setDoc(docRef, {
      uid: teamuid,
      inviter: auth.currentUser?.email,
      inviterName: auth.currentUser?.displayName,
    });
    onClose();
  } else {
    alert("Please select a user");
  }
}

useEffect(() => {
  const getResults = async () => {
    const isMember = async (uid) => {
      if (teamuid) {
        const q = query(
          collection(db, "teams", teamuid, "members"),
          where("uid", "==", uid)
        );
        const snapshot = await getDocs(q);
        return snapshot.size > 0;
      }
    };

    const results = await Promise.all(
      users.map(async (hit) => {
        if (
          hit.uid !== auth.currentUser.uid &&
          !(await isMember(hit.uid)) &&
          (hit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hit.email.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
        ) {
          return (
            <button
              key={hit.uid}
              className="flex items-center w-full px-5 py-2 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
              onClick={() =>
                handleClick({
                  objectID: hit.uid,
                })
              }
            >
              <img
                className="object-cover w-8 h-8 rounded-full"
                src={hit.picture}
                alt=""
              />
              <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                  {hit.name}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {hit.email}
                </p>
              </div>
            </button>
          );
        } else {
          return null;
        }
      })
    );

    const filteredResults = results.filter((result) => result !== null);

    setFilteredResults(filteredResults);
  };

  if (addedUid || users.length > 0) {
    getResults();
  }
}, [users, teamuid, addedUid]);


const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};
        
        

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
                  Invite a user to the team
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">

                
                  <div>
                    <input className='text-white dark:text-black rounded w-60 h-10' type="text" onChange={handleSearch} />
                    {filteredResults}
                  </div>
                
                <p className="mt-3 text-base leading-relaxed text-center text-black-200"></p>
                
                <div className="w-full mt-6">
                  <a onClick={() => submit()} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                      font-medium text-white bg-blue-600 rounded-xl transition duration-500 ease-in-out transform
                      hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Send Invite</a>
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

export default AddMembersModal