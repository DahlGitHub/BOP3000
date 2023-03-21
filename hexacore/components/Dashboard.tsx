import React, { useState, useMemo } from "react";
import { Dropdown, Navbar, Text, Avatar, Image } from "@nextui-org/react";
import { auth, logout } from '../firebase';
import type { NextPage } from 'next'
import Link from 'next/link';
import Logo from "/public/images/hexacore.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./Layout/NavComponents/ProfileDropdown";

const SidebarItems = [
  { id: 1, name: "Dashboard", icon: <FontAwesomeIcon icon={faUser}/>,link: "/dashboard" },
  { id: 2, name: "Kanban", icon: <FontAwesomeIcon icon={faUser} /> ,link: "/dashboard/kanban" },
  { id: 3, name: "Inbox",  icon: <FontAwesomeIcon icon={faUser} />,link: "/dashboard/inbox" },
  { id: 4, name: "Contacts", icon: <FontAwesomeIcon icon={faUserFriends} />,link: "/dashboard/contactChat" },
  { id: 4, name: "VideoChat", icon: <FontAwesomeIcon icon={faUserFriends} />,link: "/videoChat" }
  
];

const Dashboard = () => { 
  

  const router = useRouter();

  const settings = () => {
    router.push("/personalDetails")
  }

  return ( 
  <>
<nav className="absolute top-0 z-50 w-full  bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="/" className="flex ml-2 md:mr-24">
        <img src={Logo.src} alt="Hexacore" width={35} height={35} />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Logo</span>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ml-3">
            <div>
              <ProfileDropdown/>
            </div>
       
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="absolute top-0 pt-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2">
        {SidebarItems.map(({ ...item}) => {
          return (
         <li>
            <Link href={item.link} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                {item.icon}
                <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
            </Link>
         </li>
          )})}
          </ul>
         <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
         <ul className='bottom-0 absolute w-full pr-6'>
         <li>
            <a href="#" className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
               <div onClick={settings} className="flex-1 ml-3">Settings</div>
            </a>
         </li>
         
      </ul>
   </div>
</aside>

  </>
)}

export default Dashboard