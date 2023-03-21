import { db, auth } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';


const ContactList = ({ isOpen, onClose, onOpen }) => {

    const [contacts, setContacts] = React.useState([]);
    
    const docImport = doc;

    
    
    

    useEffect(() => {
        async function fetchRequests() {
            console.log(auth.currentUser?.uid)
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "contacts"));
          
            const promises = querySnapshot.docs.map(async (doc) => {
              const userId = doc.data().uid;
              const userDoc = await getDoc(docImport(db, "users", userId));
              const userData = userDoc.data();
          
              const element = (
                <button key={doc.id} className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
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
  

    return (
        <div>
            <div
            className={`${
                isOpen ? 'block' : 'hidden'
            } `}
            >
                <div className="h-relative w-auto py-8 overflow-y-auto bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                    
                    <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Contacts</h2>
                    
                    <div className="mt-8 space-y-4">

                        {contacts.length ? contacts.map((contact) => (
                            <div key={contact.key}>
                                {contact}
                            </div>
                        )) : <p className="text-center py-4 px-4 text-sm font-medium text-gray-700 capitalize dark:text-white">No contacts found.</p>}
                        
                        <Link href={"/dashboard/contacts"} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Add more contacts
                        </Link>
                        
                        <button onClick={onClose} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Hide contacts
                        </button>
                    
                    </div>
                </div>
            </div>
            <div
            className={`${
                isOpen ? 'hidden' : 'block'
            } `}
            >
                <div className="max-h-fit w-auto py-8 overflow-y-auto bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="mt-8">
                        <button onClick={onOpen} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Show contacts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactList