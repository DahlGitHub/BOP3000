import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../../../context/UserContext";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Progress } from "@nextui-org/react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";


const DashboardLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <UserContext.Provider value={{user, loading, error}}>
      <div className="min-h-screen">
      <DashboardHead />
      <div className="flex">
        <DashboardSidebar />
      {loading
      ? <Progress
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