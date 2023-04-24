import React from "react";
import TeamMenu from "./TeamMenu";


const TeamMenuLayout = ({ children }) => {
  return (
    <div>
      <TeamMenu />
      <div className="sm:ml-64 w-full pt-3">
        {children}
      </div>
    </div>
  );
};

export default TeamMenuLayout;