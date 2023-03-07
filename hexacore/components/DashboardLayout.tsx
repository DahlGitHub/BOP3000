import React from "react";
import Dashboard from "./Dashboard";


const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Dashboard />
      <div className="sm:ml-64 w-full">
          {children}
      </div>
    </div>
  );
};

export default DashboardLayout;