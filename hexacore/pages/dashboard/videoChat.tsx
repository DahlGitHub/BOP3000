import React from 'react'
import Dashboard from '../../components/Dashboard';
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import CreateVideoChat from '../../components/VideoChat/CreateVideoChat';

import VideoChat from '../../components/VideoChat/VideoChat';

const videoChat = () => {
  
  
  return (
    <DashboardLayout>
      <CreateVideoChat/>
    </DashboardLayout>
  )
}

export default videoChat