import React, { useState, useMemo } from "react";
import Logo from "/public/images/hexacore.png";
import { useRouter } from "next/router";
import ProfileDropdown from "../NavComponents/ProfileDropdown";


const DashboardHead = () => {

  const router = useRouter();
  
  return ( 
  <>
    <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start dark:hidden">
              <img src={"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/hexacore.png?alt=media&token=0dc0577b-2ff1-4ff5-84b3-2e1896af25e0"} alt="Hexacore Logo" onClick={() => router.push("./")} className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"/>
            </div>
            <div className="flex items-center justify-start dark:block">
              <img src={"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/darkmode%20logo.png?alt=media&token=8aacc126-c622-42c9-8c29-b964897dfc90"} alt="Hexacore Logo" onClick={() => router.push("./")} className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"/>
            </div>
            <ProfileDropdown/>
          </div>
          
      </div>
    </nav>
  </>
)}

export default DashboardHead