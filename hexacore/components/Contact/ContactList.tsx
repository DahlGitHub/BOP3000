import { db, auth } from '../../firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Chat from '../Chat/Chat';
import Drawer from '../Drawer';
import AvatarPicture from '../AvatarPicture';
import { set } from 'firebase/database';
import ContactRequests from './ContactRequests';
import AddContacts from './AddContacts';

const ContactList = () => {
  const router = useRouter()
  const [contacts, setContacts] = React.useState([]);
  const docImport = doc;
  const [selectedChat, setSelectedChat] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [chatID, setChatID] = useState('')
  const [requests, setRequests] = useState(0)

  async function fetchContacts() {
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "contacts"));
  
    const promises = querySnapshot.docs.map(async (doc, index) => {
      const userId = doc.data().uid;
      const userDoc = await getDoc(docImport(db, "users", userId));
      const userData = userDoc.data();
      const chatID = "Chat/"+ [auth.currentUser.uid.toLowerCase(), userId.toLowerCase()].sort().join('')
      const element = (
        <button key={doc.id} onClick={()=> { setChatID(chatID); setSelectedChat(index); setShowChat(!showChat)}} className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
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

  

  useEffect(() => {
    
    fetchContacts();

  }, []); // Run this effect only once on component mount

  const MainContent = () => {
    return (
      <div>
        {contacts.length ? (
          <>
            {contacts.map((contact) => (
              <div key={contact.key}>{contact}</div>
            ))}
          </>
        ) : (
          <p className="text-center py-4 px-4 text-sm font-medium text-gray-700 capitalize dark:text-white">No contacts found.</p>
        )}
        
          <div className='absolute inset-x-0 bottom-10 mb-20'>
            <button onClick={() => handleAddContact()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded my-10 mx-8">
                Add more contacts
            </button>
            <br/>
            <button onClick={() => handleRequestOpen()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mx-8">
                Contact requests: {requests}
            </button>
          </div>
      </div>
    );
  };
      
      // Render MainContent inside the Drawer component

  const [isListOpen, setIsListOpen] = React.useState(true);

  function handleListOpen() {
    setIsListOpen(true);
  }
  
  function handleListClose() {
    setIsListOpen(false);
  }


  // Contact requests
  const [isRequestOpen, setIsRequestOpen] = React.useState(false);

  function handleRequestOpen() {
    setIsRequestOpen(true);
  }

  function handleRequestClose() {
    setIsRequestOpen(false);
  }

  const handleAddContact = () => {
    setChatID('')
    setShowChat(false)
  }
      

  return (
    <section className="bg-white dark:bg-gray-900 flex">
      <ContactRequests isOpen={isRequestOpen} onClose={handleRequestClose} setInviteCount={setRequests}/>
        <div>
            <Drawer mainContent={<MainContent/>} title="Contacts" isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>
        <div
          className={`${
          chatID ? 'block' : 'hidden'
        }`}
        >
          {chatID.length > 0
            ? <Chat chatID={chatID}/>
            : null
          }
        </div>
        <div
          className={`${
          chatID ? 'hidden' : 'block'
        }`}
        >
          <AddContacts/>
        </div>
  </section>
  )
/* gammel kode med at den lager en chat for hver av kontaktene
    return (
        <section className="bg-white dark:bg-gray-900 flex">
        <div>
            <Drawer mainContent={<MainContent/>} title="Contacts" isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>
        <div>
          {contacts.map((contact, index) => {
            const chatID = "Chat/"+ [auth.currentUser.uid.toLowerCase(), contact.key.toLowerCase()].sort().join('')
            if (showChat && selectedChat === index) {
              return (
                <Chat chatID={chatID}/>
              )
            }
          })}
        </div>
      </section>
    )*/
}

export default ContactList