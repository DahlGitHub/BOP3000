import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faLayerGroup, faMessage, faInbox, faListCheck, faHouse } from "@fortawesome/free-solid-svg-icons";

const SidebarItems = [
  { id: 1, iconItem: <FontAwesomeIcon icon={faHouse}/>, text: "Home",link: "/dashboard" },
  { id: 2, iconItem: <FontAwesomeIcon icon={faListCheck} />, text: "Kanban",link: "/dashboard/kanban" },
  { id: 3,  iconItem: <FontAwesomeIcon icon={faInbox}/>, text: "Inbox",link: "/dashboard/inbox" },
  { id: 4, iconItem: <FontAwesomeIcon icon={faMessage}/>, text: "Contacts",link: "/dashboard/contactChat" },
  { id: 5, iconItem: <FontAwesomeIcon icon={faLayerGroup}/>, text: "Teams",link: "/dashboard/teams" },
];

const DashboardSidebar = () => {
  
  return ( 
  <>

<div className="flex h-[calc(100vh-70px)]  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
  <div className="flex flex-col items-center space-y-10 py-2.5 p-2.5">
    <div className=" rounded-md bg-white dark:bg-gray-800 ">
      <ul>
        {SidebarItems.map(({ ...item}) => {
          return (
         <li key={item.id} className="flex text-center">
            <Link href={item.link} className="flex-inline w-full p-2.5 rounded-md text-gray-700 hover:bg-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
                {item.iconItem}
                <span className="block text-[10px] ">{item.text}</span>
            </Link>
         </li>
          )})}

      </ul>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
      <ul className='w-full'>
         <li className="flex text-center">
            <Link href="/dashboard/settings" className="flex-inline w-full p-2.5 rounded-md  text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
              <FontAwesomeIcon icon={faGears} />
              <span className="block text-[10px] ">Settings</span>
            </Link>
         </li>
         
      </ul>

    </div>
  </div>
</div>
{
/*<aside id="logo-sidebar" className="fixed top-0 pt-20 left-0 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2">
        {SidebarItems.map(({ ...item}) => {
          return (
         <li>
            <Link href={item.link} className="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                {item.icon}
                <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
            </Link>
         </li>
          )})}
          </ul>
         <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
         <ul className='w-full'>
         <li>
            <Link href="/dashboard/settings" className="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faGears} />
               <div className="flex-1 ml-3">Settings</div>
            </Link>
         </li>
         
      </ul>
   </div>
</aside>*/
}

  </>
)}

export default DashboardSidebar