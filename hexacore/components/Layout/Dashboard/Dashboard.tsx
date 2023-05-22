import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
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