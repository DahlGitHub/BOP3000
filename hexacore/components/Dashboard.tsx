import React, { useState, useMemo } from "react";
import { Dropdown, Navbar, Text, Avatar, Image, Collapse } from "@nextui-org/react";
import { auth, logout } from '../firebase';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./Layout/NavComponents/ProfileDropdown";

const SidebarItems = [
  { id: 1, name: "Dashboard", icon: <FontAwesomeIcon icon={faUser}/>,link: "/dashboard" },
  { id: 2, name: "Kanban", icon: <FontAwesomeIcon icon={faUser} /> ,link: "/dashboard/kanban" },
  { id: 3, name: "Inbox",  icon: <FontAwesomeIcon icon={faUser} />,link: "/dashboard/inbox" },
  { id: 4, name: "Contacts", icon: <FontAwesomeIcon icon={faUserFriends} />,link: "/dashboard/contactChat" },
  { id: 5, name: "Teams", icon: <FontAwesomeIcon icon={faUserFriends} />,link: "/dashboard/teams" },
  { id: 6, name: "VideoChat", icon: <FontAwesomeIcon icon={faUserFriends} />,link: "/dashboard/videoChat" }
  
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
        <img src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/hexacore.png?alt=media&token=0dc0577b-2ff1-4ff5-84b3-2e1896af25e0" alt="Hexacore" width={35} height={35} />
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
</aside>

  </>
)}

export default Dashboard