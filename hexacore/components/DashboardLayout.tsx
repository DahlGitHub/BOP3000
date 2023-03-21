import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../context/UserContext";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <UserContext.Provider value={{user, loading, error}}>
      <div>
      <Dashboard />
      {loading
      ? <p>loading</p>
      :<div className="sm:ml-64 w-full">
        {children}
       </div>
      }
      
    </div>
    </UserContext.Provider>
    
  );
};

export default DashboardLayout;