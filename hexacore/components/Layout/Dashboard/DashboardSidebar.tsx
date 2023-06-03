import React, { useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faLayerGroup, faMessage, faInbox, faListCheck, faHouse, faFile, faFileLines, faBriefcase, faHamburger, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const SidebarItems = [
  { id: 1, iconItem: <FontAwesomeIcon icon={faHouse}/>, text: "Home",link: "/dashboard" },
  { id: 2, iconItem: <FontAwesomeIcon icon={faMessage}/>, text: "Contacts",link: "/dashboard/contactChat" },
  { id: 3, iconItem: <FontAwesomeIcon icon={faLayerGroup}/>, text: "Teams",link: "/dashboard/teams" },
  { id: 4, iconItem: <FontAwesomeIcon icon={faBriefcase}/>, text: "Tools",link: "/dashboard/myTools" },
];

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return ( 
  <>
      <div className="sm:hidden absolute top-0 left-10 m-4 px-5 z-50">
        <button
          className="bg-gray-800 text-white fa-lg p-2 rounded-md"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBarsStaggered} />
        </button>
    </div>

    <div className={`absolute inset-0 left-0 w-1/3 top-[70px] bg-white border-r border-gray-200 z-40 sm:hidden transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } dark:bg-gray-800 dark:border-gray-700`}>
        <div className="flex flex-col items-center space-y-10 py-2.5 p-2.5 h-full">
        <div className="rounded-md bg-white dark:bg-gray-800">
  <ul>
    {SidebarItems.map(({ id, iconItem, text, link }) => (
      <li key={id} className="flex text-center">
        <Link href={link} className="flex-inline w-full p-2.5 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
          <div className="flex items-center justify-left space-x-2">
            {iconItem}
            <span className="text-[10px]">{text}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
  <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
  <ul className="w-full">
    <li className="flex text-center">
      <Link href="/dashboard/settings" className="flex-inline w-full p-2.5 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
        <div className="flex items-center justify-left space-x-2">
          <FontAwesomeIcon icon={faGears} />
          <span className="text-[10px]">Settings</span>
        </div>
      </Link>
    </li>
    <li className="flex text-center">
      <Link href="/dashboard/service" className="flex-inline w-full p-2.5 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
        <div className="flex items-center justify-left space-x-2">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span className="text-[10px]">Help</span>
        </div>
      </Link>
    </li>
  </ul>
</div>
        </div>
      </div>

<div className="flex h-[calc(100vh-70px)] hidden sm:block transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
  <div className="flex flex-col items-center space-y-10 py-2.5 p-2.5">
    <div className="rounded-md bg-white dark:bg-gray-800 ">
      <ul>
        {SidebarItems.map(({ ...item}) => {
          return (
         <li key={item.id} className="flex text-center">
            <Link href={item.link} className="flex-inline w-full p-2.5 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
                {item.iconItem}
                <span className="block text-[10px] ">{item.text}</span>
            </Link>
         </li>
          )})}

      </ul>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
      <ul className='w-full'>
         <li className="flex text-center">
            <Link href="/dashboard/settings" className="flex-inline w-full p-2.5  text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
              <FontAwesomeIcon icon={faGears} />
              <span className="block text-[10px] ">Settings</span>
            </Link>
            
         </li>
         <li className="flex text-center">
          <Link href="/dashboard/service" className="flex-inline w-full p-2.5  text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="block text-[10px] ">Help</span>
              </Link>
         </li>
         
      </ul>

    </div>
  </div>
</div>

  </>
)}

export default DashboardSidebar