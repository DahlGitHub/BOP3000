import React, { useState, useEffect } from 'react';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import DashboardLayout from '../../components/DashboardLayout';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import RequestModal from './RequestModal'


const ContactRequests = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [requests, setRequests] = React.useState([]);
  
  const router = useRouter()

  

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

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const element = (

            
            <tr key={doc.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img className="w-full h-full rounded-full" src={data.picture} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {data.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {data.email}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  2
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button  onClick={() => handleClick(data)} className="bg-blue-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
                  Respond
                </button>
              </td>
            </tr>
          );
          elements.push(element);
        });
  
        setRequests(elements);
      }
  
      fetchRequests();
    }, []); // Run this effect only once on component mount
        

  return (
    <>
      <div className='max-w-fit'>
        <br/>
          
        <div className="bg-white p-8 rounded-md min-w-fit min-h-fit z-1">
          <RequestModal isOpen={isModalOpen} onClose={handleModalClose}  picture={picture} name={name} uid={addedUid} email={email}/>
          
            <div className=" flex items-center justify-between pb-6">
              
              
              <div>
                <h2 className="text-gray-600 font-semibold">Contact Requests</h2>
                <span className="text-xs">Pending contact requests</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  
                </div>
                  <div className="lg:ml-40 ml-10 space-x-8">
                    <button onClick={contacts} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add Contacts</button>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
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
                      {requests.length ? requests : (
                      <tr>
                        <td  className="text-center py-4">
                          No contact requests found.
                        </td>
                      </tr>
                    )}
                      </tbody>  
                    </table>
                    
                  </div>
                </div>
              </div>
          </div>
        
        </div>
    </>
  )
}

export default ContactRequests