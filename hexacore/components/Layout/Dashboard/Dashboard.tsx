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
import DashboardNavbar from "./DashboardHead";
import DashboardHead from "./DashboardHead";


const Dashboard = () => {
  

  const router = useRouter();

  const settings = () => {
    router.push("/personalDetails")
  }

  return ( 
  <>
    <DashboardHead/>
   
  </>
)}

export default Dashboard