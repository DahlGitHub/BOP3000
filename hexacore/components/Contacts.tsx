import Link from 'next/link'
import Layout from '../app/Layout'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import ContactRow from './ContactRow';
import { connectHits } from 'react-instantsearch-dom';


const searchClient = algoliasearch(
  "FH6G88713S",
  "6821b8b5ec64e3c780fe083eb55e5a7d"
);

const Contacts = () => {

  const Hits = ({ hits }) => (
  <>
    {hits.map(hit => (
    <tr>
      
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                <img className="w-full h-full rounded-full" src={hit.picture}alt="" />
                </div>
                <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {hit.name}
                    </p>
                </div>
            </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">Kroa i Bø</p>
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
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">Active</span>
        </span>
        </td>
      </tr>
      ))}
    </>
  )

  const CustomHits = connectHits(Hits);

  return (
    <Layout title="Hexacore">
      <InstantSearch searchClient={searchClient} indexName="users">
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Contacts</h2>
            <span className="text-xs">Add more contacts?</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              
              <SearchBox translations={{placeholder: 'Search for users'}}/>
                </div>
              <div className="lg:ml-40 ml-10 space-x-8">
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add contacts</button>
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Manage contacts</button>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Workplace
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <CustomHits/>
                  </tbody>  
                </table>
                <div
                  className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900">
                                  Showing 1 to 4 of 50 Entries
                              </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                      Prev
                                  </button>
                    &nbsp; &nbsp;
                    <button
                                      className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                      Next
                                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </InstantSearch>
    </Layout>
  )
}

export default Contacts
