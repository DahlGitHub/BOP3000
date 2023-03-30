import React, { useState, useMemo } from "react";
import { Dropdown, Navbar, Text, Avatar, Image, Collapse } from "@nextui-org/react";
import { auth, logout } from '../../../firebase';
import type { NextPage } from 'next'
import Link from 'next/link';
import Logo from "/public/images/hexacore.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "../NavComponents/ProfileDropdown";
import DashboardSidebar from "./DashboardSidebar";


const DashboardHead = () => {
  
  return ( 
  <>
    <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">

        </div>
            <ProfileDropdown/>
        </div>
        
    </div>
    </nav>
  </>
)}

export default DashboardHead