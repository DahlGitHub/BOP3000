import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ContactModal from './ContactModal'
import Link from 'next/link';
import { auth, db } from '../../firebase-config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AvatarPicture from '../AvatarPicture';
import ContactRequests from './ContactRequests';

const AddContacts = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter()

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    const newFiles = querySnapshot.docs.map((doc) => doc.data());
    setUsers(newFiles);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleClick = (props) => {
    setAddedUid(props.uid);
    setName(props.name);
    setEmail(props.email);
    setPicture(props.picture);
    handleModalOpen();
  };

  const getResults = async () => {
    if (searchQuery === "") {
      setFilteredResults([]);
      return;
    }
    const isContact = async (uid) => {
      if (uid) {
        const q = query(
          collection(db, "users", auth.currentUser?.uid, "contacts"),
          where("uid", "==", uid)
        );
        const snapshot = await getDocs(q);
        return snapshot.size > 0;
      }
    };
  
  const mutualContacts = async (uid) => {
    if (uid) {
      
      const currentUserContactsRef = collection(db, "users", auth.currentUser?.uid, "contacts");
      const contactUserContactsRef = collection(db, "users", uid, "contacts");
      const currentUserContactsSnapshot = await getDocs(currentUserContactsRef);
      const contactUserContactsSnapshot = await getDocs(contactUserContactsRef);
      const currentUserContacts = currentUserContactsSnapshot.docs.map((doc) => doc.data());
      const contactUserContacts = contactUserContactsSnapshot.docs.map((doc) => doc.data());
      const mutualContacts = currentUserContacts.filter((contact) => contactUserContacts.some((contact2) => contact.uid === contact2.uid));
      return mutualContacts.length;

    }
  };



    const results = await Promise.all(
      users.map(async (hit) => {
        if (
          hit.uid !== auth.currentUser.uid &&
          !(await isContact(hit.uid)) &&
          (hit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hit.email.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
        ) {
          return (
            <tr key={hit.objectID}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <AvatarPicture picture={hit.picture} name={hit.name} containerWidth={"10"} containerHeight={"10"}/>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hit.name}
                        </p>
                      </div>
                    </div>
                  </td>
    
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{hit.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 text-center whitespace-no-wrap">
                      {await mutualContacts(hit.uid)}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleClick(hit)}
                      className="bg-blue-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
                    >
                      Add contact
                    </button>
                  </td>
                </tr>
          );
        } else {
          return null;
        }
      })
    );

    const filteredResults = results.filter((result) => result !== null);

    setFilteredResults(filteredResults);
  };

  useEffect(() => {
    if (users.length > 0 || addedUid || searchQuery) {
      getResults();
    }
  }, [users, addedUid, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    getResults();
  };
    
  

  return (
  
    <div className=' h-[calc(100vh-70px)] dark:text-white w-screen dark:bg-gray-800'>

        <div className="bg-white dark:bg-gray-800 p-8 min-h-fit">
          <ContactModal isOpen={isModalOpen} onClose={handleModalClose}  picture={picture} name={name} uid={addedUid} email={email}/>
            <div className="flex items-center pb-6">
            
              
              <div className='flex'>
                <div>
                  <h2 className="text-gray-600 dark:text-white font-semibold">Users</h2>
                  <span className="text-xs">Search through our userbase</span>
                </div>
                
              </div>
              <div className="flex items-center ml-10 justify-between">
                <div className="flex  items-center p-2 rounded-md">
                <div>
                    <input className='m-4 rounded px-5 py-3 text-black border-solid border-2 border-sky-500' placeholder='Search for users' type="text" onChange={handleSearch} />
                    
                  </div>
                </div>

                </div>
              </div>
            <div>
              <div className=" sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
                  <table className="min-w-fit leading-normal">
                    <thead>
                      <tr>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Mutual Contacts
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Add contact
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {filteredResults}
                    </tbody>  
                  </table>
                  
                </div>
              </div>
            </div>
        </div>
    </div>
    

  )
}

export default AddContacts