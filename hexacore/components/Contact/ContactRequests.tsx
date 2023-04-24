import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import RequestModal from './RequestModal'
import AvatarPicture from '../AvatarPicture';


const ContactRequests = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [contact, setContact] = React.useState([]);
  
  const router = useRouter()
  const docImport = doc;

  

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  
  function handleModalClose() {
    setIsModalOpen(false);
  }
  
  function contacts() {
    router.push("/dashboard/contacts")
  }

  const handleClick = (props) => {

    // For testing, console log skal fjernes
    setPicture(props.picture);
    console.log("Picture: " + props.picture);
    setName(props.name);
    console.log("Name: " + props.name);
    setEmail(props.email);
    console.log("Email: " + props.email)
    setAddedUid(props.uid)
    console.log("uid: " + props.uid)
    

    handleModalOpen()

  };

    
    
  useEffect(() => {
    async function fetchRequests() {
      const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "contact-requests"));
          const elements = [];
        
          const promises = querySnapshot.docs.map(async (doc) => {
            const userId = doc.data().uid;
            const userDoc = await getDoc(docImport(db, "users", userId));
            const userData = userDoc.data();
            const element = (

              
              <tr key={doc.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <AvatarPicture picture={userData.picture} name={userData.name} containerWidth={10} containerHeight={10}/>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {userData.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {userData.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    2
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button  onClick={() => handleClick(userData)} className="bg-blue-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
                    Respond
                  </button>
                </td>
              </tr>
            );
        elements.push(element);
      });

      await Promise.all(promises);
      setContact(elements); // set the elements array instead of results
    }

    fetchRequests();
  }, []); // Run this effect only once on component mount
        

  return (
    
    <div className=' h-[calc(100vh-70px)] bg-white dark:text-white  dark:bg-gray-800'>
        
      <div className=" p-8 rounded min-w-fit min-h-fit z-1">
        <RequestModal isOpen={isModalOpen} onClose={handleModalClose}  picture={picture} name={name} uid={addedUid} email={email}/>
        
          <div className="flex items-center pb-6">
            <div>
              <h2 className=" font-semibold">Contact Requests</h2>
              <span className="text-xs">Pending contact requests</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <button onClick={contacts} className="bg-blue-600 ml-80 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add Contacts</button>
                </div>
              </div>
            </div>
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                          Mutual groups
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Respond
                        </th>
                      </tr>
                    </thead>
                      
                    <tbody>
                      {contact.length ? contact.map((element) => element) : <p>No requests</p>}
                    </tbody>  
                  </table>
                  
                </div>
              </div>
            </div>
        </div>
      
      </div>
    
  )
}

export default ContactRequests
