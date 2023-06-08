import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ContactModal from './ContactModal'
import { auth, db } from '../../firebase-config/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import AvatarPicture from '../AvatarPicture';
import ContactRequests from './ContactRequests';
import { debounce } from '@mui/material';

const AddContacts = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), limit(100))
    );
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
  
    await fetchUsers();
  
    const currentUserContactsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "contacts"
    );
    const currentUserContactsSnapshot = await getDocs(currentUserContactsRef);
    const currentUserContacts = currentUserContactsSnapshot.docs.map((doc) => doc.data());
  
    const filteredUsers = await (await Promise.all(
      users.map(async (hit) => {
        const mutualContactCount = await mutualContacts(hit.uid);
        return { 
          uid: hit.uid,
          name: hit.name,
          email: hit.email,
          picture: hit.picture,
          mutualContacts: mutualContactCount,
        };
      })
    )).filter((hit) => {
        return (
          hit.uid !== auth.currentUser.uid &&
          !(currentUserContacts.some((contact) => contact.uid === hit.uid)) &&
          (hit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hit.email.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      })
      .slice(0, 10)
      .map((hit) => (
        <tr key={hit.uid}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <AvatarPicture
                picture={hit.picture}
                name={hit.name}
                containerWidth={"10"}
                containerHeight={"10"}
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{hit.name}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{hit.email}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 text-center whitespace-no-wrap">
            {hit.mutualContacts}
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
    ));

    setFilteredResults(filteredUsers);
  };

  
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    getResults();
  };
    
  

  return (
  
    <div className=' h-[calc(100vh-70px)] dark:text-white w-screen dark:bg-gray-800'>

        <div className="bg-white dark:bg-gray-800 p-8 min-h-fit">
          <ContactModal isOpen={isModalOpen} onClose={handleModalClose}  picture={picture} name={name} uid={addedUid} email={email}/>
            <div className="flex-inline items-left">
            
              
              <div className='flex'>
                <div>
                  <h2 className="text-gray-600 dark:text-white font-semibold">Users</h2>
                  <span className="text-xs">Search through our userbase</span>
                </div>
                
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center py-2 rounded-md">
                <div>
                    <input className='rounded px-5 py-3 text-black border-solid border-2 border-sky-500' placeholder='Search for users' type="text" onChange={handleSearch} />
                    <button className='bg-blue-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2' onClick={handleSearchClick}>Search</button>
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