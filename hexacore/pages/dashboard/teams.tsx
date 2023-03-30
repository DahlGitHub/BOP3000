import React from 'react'

import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import TeamMenu from '../../components/Team/TeamMenu';


const teams = () => {
  return (
    <DashboardLayout>
        <TeamMenu/>
    </DashboardLayout>
  )
}

export default teams