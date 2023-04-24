import React, { useEffect, useState } from 'react';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import { useRouter } from 'next/navigation';
import ContactModal from './ContactModal'
import Link from 'next/link';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AvatarPicture from '../AvatarPicture';


const searchClient = algoliasearch (
  "FH6G88713S",
  "6821b8b5ec64e3c780fe083eb55e5a7d"
);

const Contacts = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter()

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function contactRequests() {
    router.push("/dashboard/contactRequests")
  }
  

  const Hits = ({ hits }) => {
    const isContact = async (uid) => {
      const q = query(
        collection(db, "users", auth.currentUser?.uid, "contacts"),
        where("uid", "==", uid)
      );
      const snapshot = await getDocs(q);
      return snapshot.size > 0;
    };
  
    const handleClick = (props) => {
      setPicture(props.picture);
      setName(props.name);
      setEmail(props.email);
      setAddedUid(props.objectID);
      handleModalOpen();
    };
  
    const [filteredResults, setFilteredResults] = useState([]);
  
    useEffect(() => {
      const getResults = async () => {
        const results = await Promise.all(
          hits.map(async (hit) => {
            if (hit.uid !== auth.currentUser.uid && !(await isContact(hit.uid))) {
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
                      2
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
    
      getResults();
    }, [hits, isContact]);
    
  
    return <>{filteredResults}</>;
  };
  
  const CustomHits = connectHits(Hits);
  
  

  return (
  
    <div className=' h-[calc(100vh-70px)] dark:text-white  dark:bg-gray-800'>
      
      <InstantSearch searchClient={searchClient} indexName="users">
        
      
        <div className="bg-white dark:bg-gray-800 p-8 rounded-md min-w-fit min-h-fit z-1">
          <ContactModal isOpen={isModalOpen} onClose={handleModalClose}  picture={picture} name={name} uid={addedUid} email={email}/>
          
            <div className="flex items-center pb-6">
              
              
              <div>
                <h2 className="text-gray-600 dark:text-white font-semibold">Users</h2>
                <span className="text-xs">Search through our userbase</span>
              </div>
              <div className="flex items-center ml-10 justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <SearchBox translations={{placeholder: 'Search for users'}}/>
                </div>
                  <div className="lg:ml-40 ml-10 space-x-8">
                    <button onClick={contactRequests} className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Contact requests</button>
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
                          Mutual groups
                        </th>
                        <th
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Add contact
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <CustomHits/>
                    </tbody>  
                  </table>
                  
                </div>
              </div>
            </div>
        </div>
      </InstantSearch>
    </div>
    

  )
}

export default Contacts