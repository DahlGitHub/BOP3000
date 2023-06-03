import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../../../context/UserContext";
import { auth } from "../../../firebase-config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Progress } from "@nextui-org/react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import { useRouter } from "next/router";


const DashboardLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)

  const router = useRouter();

  const userLoggedIn = () => {
    if(!auth.currentUser) {
      router.push("/login")
    }
  }

  useEffect(() => {
    userLoggedIn()
  }, [])

  return (
    <UserContext.Provider value={{user, loading, error}}>
      <div className="min-h-screen dark:bg-gray-900">
      <DashboardHead />
      <div className="flex">
        <DashboardSidebar />
      {loading
      ? <Progress key={1}
      indeterminated
      value={50}
      color="secondary"
      status="secondary"/>

      :
      
      <div className="w-full w-[calc(100vw-100px)]">
        { children }
      </div>
      
      }
      </div>
    </div>
    </UserContext.Provider>
    
  );
};

export default DashboardLayout;