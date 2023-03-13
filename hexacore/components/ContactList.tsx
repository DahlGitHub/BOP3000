import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const ContactList = ({ isOpen, onClose }) => {

    const [contacts, setContacts] = React.useState([]);

    useEffect(() => {
        async function fetchRequests() {
          const querySnapshot = await getDocs(collection(db, "users", "6y2HiDmxeueYcT3Hp87MyzE25lk2", "contacts"));
          const elements = [];
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const element = (
              
                <button key={doc.id} className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                    <img className="object-cover w-8 h-8 rounded-full" src={data.picture} alt=""/>
                
                    <div className="text-left rtl:text-right">
                        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{data.name}</h1>
        
                        <p className="text-xs text-gray-500 dark:text-gray-400">{data.email}</p>
                    </div>
                </button>
            );
            elements.push(element);
          });
    
          setContacts(elements);
        }
    
        fetchRequests();
      }, []); // Run this effect only once on component mount
  

    return (
        <div
        className={`${
            isOpen ? 'block' : 'hidden'
        } `}
        >
        <div className="h-relative w-auto py-8 overflow-y-auto bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
            
            <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Contacts</h2>
            
            <div className="mt-8 space-y-4">
                

                {contacts.length ? contacts : (
                        <div>
                            <p  className="text-center py-4 px-4 text-sm font-medium text-gray-700 capitalize dark:text-white">
                            No contacts found.
                            </p>
                        </div>
                )}
                <Link href={"/dashboard/contacts"} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Add more contacts
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ContactList