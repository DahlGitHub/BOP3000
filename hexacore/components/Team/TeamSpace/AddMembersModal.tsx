import { auth, db } from "../../../firebase-config/firebase";
import { doc, collection,  setDoc, query, where, getDocs } from "firebase/firestore";
import {useState, useEffect} from "react";
import AvatarPicture from '../../AvatarPicture';

const AddMembersModal = ({isOpen, onClose, teamuid, alertInviteSuccess}) => {
  
  const [addedUid, setAddedUid] = useState("");
  const [addedName, setAddedName] = useState("");
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
  setAddedName(props.name);
};

const submit = async () => {
  if (addedUid) {
    const docRef = doc(db, "users", addedUid, "team-requests", teamuid);
    await setDoc(docRef, {
      uid: teamuid,
      inviter: auth.currentUser?.email,
      inviterName: auth.currentUser?.displayName,
    }).then(() => {
    onClose();
    alert("Invite sent");

    });
  } else {
    alert("Please select a user");
  }
}

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

  const filteredResults = await (await Promise.all(
    users.map(async (hit) => {
      const member = await isMember(hit.uid);
      return {
        uid: hit.uid,
        name: hit.name,
        email: hit.email,
        picture: hit.picture,
        isMember: member,
      };
    })
  ))
    .filter((hit) => (
      hit.uid !== auth.currentUser.uid &&
      !hit.isMember &&
      (hit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hit.email.toLowerCase().includes(searchQuery.toLowerCase()))
    ))
    .map((hit) => (
      <button
        key={hit.uid}
        className="flex items-center w-full px-5 py-2 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
        onClick={() => handleClick({ objectID: hit.uid })}
      >
        <AvatarPicture
          picture={hit.picture}
          name={hit.name}
          containerWidth={10}
          containerHeight={10}
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
    ));

  setFilteredResults(filteredResults);
};

useEffect(() => {
  if (addedUid || users.length > 0) {
    getResults();
  }
}, [users, teamuid, addedUid]);

useEffect(() => {
  

  if (addedUid || users.length > 0) {
    getResults();
  }
}, [users, teamuid, addedUid]);


const handleSearch = (event) => {
  setSearchQuery(event.target.value);
  getResults();
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
                    <input className='text-black rounded w-60 h-10 m-4 px-5 py-3 border-solid border-2 border-sky-500' type="text" onChange={handleSearch} />
                    <div className={`${
                        addedUid ? 'block' : 'hidden'
                      } w-full`}>
                      <a onClick={() => submit()} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                          font-medium text-white bg-blue-600 rounded-xl transition duration-500 ease-in-out transform
                          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Invite {addedName} to your team</a>
                    </div>
                    {filteredResults}
                  </div>
                  
                
                <p className="mt-3 text-base leading-relaxed text-center text-black-200"></p>
                
                
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