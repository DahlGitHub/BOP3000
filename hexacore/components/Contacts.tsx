import React from 'react';
import Layout from '../app/Layout'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";

import ContactModal from './ContactModal'


const searchClient = algoliasearch (
  "FH6G88713S",
  "6821b8b5ec64e3c780fe083eb55e5a7d"
);

const Contacts = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [addedUid, setAddedUid] = React.useState(null);
  const [org, setOrg] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }
  

  const Hits = ({ hits }) => {

    const handleClick = (props) => {

      // For testing, console log skal fjernes
      setPicture(props.picture);
      console.log("Picture: " + props.picture);
      setName(props.name);
      console.log("Name: " + props.name);
      setEmail(props.email);
      console.log("Email: " + props.email)
      setAddedUid(props.objectID)
      console.log("uid: " + props.objectID)
      setOrg(props.org)

      handleModalOpen()

    };
    

    return (
      <>
        {hits.map(hit => (
          <tr>           
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img className="w-full h-full rounded-full" src={hit.picture} alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {hit.name}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{hit.organisation}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {hit.email}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                2
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button onClick={() => handleClick(hit)}  className="bg-blue-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2">
                Add contact
              </button>
            </td>
          </tr>
        ))}
      </>
    )  
  }

  const CustomHits = connectHits(Hits);

  return (
    <>
      <div className='max-h-fit'>
        <br/>
        <InstantSearch searchClient={searchClient} indexName="users">
          
          
        <div className="bg-white p-8 rounded-md max-w-fit min-h-fit z-1">
          <ContactModal isOpen={isModalOpen} onClose={handleModalClose} org={org} picture={picture} name={name} uid={addedUid} email={email}/>
          
            <div className=" flex items-center justify-between pb-6">
              
              
              <div>
                <h2 className="text-gray-600 font-semibold">Contacts</h2>
                <span className="text-xs">Search through our userbase</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <SearchBox translations={{placeholder: 'Search for users'}}/>
                </div>
                  <div className="lg:ml-40 ml-10 space-x-8">
                    <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Manage contacts</button>
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
                            Organisation
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
    </>
  )
}

export default Contacts
