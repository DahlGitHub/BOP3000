import { db, auth } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chat from '../Chat/Chat';
import { onAuthStateChanged } from 'firebase/auth';
import Drawer from '../Drawer';

const ContactList = () => {
    const router = useRouter()
    const [contacts, setContacts] = React.useState([]);
    const docImport = doc;

    const [chat, setChat] = useState('')
        onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

    

    useEffect(() => {
        async function fetchRequests() {
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "contacts"));
          
            const promises = querySnapshot.docs.map(async (doc) => {
              const userId = doc.data().uid;
              const userDoc = await getDoc(docImport(db, "users", userId));
              const userData = userDoc.data();
              const chatID = [auth.currentUser.uid.toLowerCase(), userId.toLowerCase()].sort().join('')
            
              const element = (
                <button key={doc.id} onClick={()=>setChat(chatID)} className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                  <img className="object-cover w-8 h-8 rounded-full" src={userData.picture} alt=""/>
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
      
        fetchRequests();
      }, []); // Run this effect only once on component mount

      const MainContent = () => {
        return (
          <>
            {contacts.length ? (
              <>
                {contacts.map((contact) => (
                  <div key={contact.key}>{contact}</div>
                ))}
              </>
            ) : (
              <p className="text-center py-4 px-4 text-sm font-medium text-gray-700 capitalize dark:text-white">No contacts found.</p>
            )}
            
            
            <button onClick={() => router.push("./contacts")} className="flex items-center w-full p-2 text-center font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                Add more contacts
            </button>
          </>
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
      
  

    return (
        <section className="bg-white dark:bg-gray-900 flex min-h-screen">
        <div>
            <Drawer mainContent={<MainContent/>} title="Contacts" isOpen={isListOpen} open={handleListOpen} close={handleListClose} />
        </div>
        
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            {chat.length > 0
            ? <Chat chatID={chat}/>
            : <p>hei</p>
            }
            
          </div>
        </section>
    )
}

export default ContactList