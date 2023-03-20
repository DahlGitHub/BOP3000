import React from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import Kanban from '../../components/Kanban/Kanban';
import VideoChat from '../../components/VideoChat/VideoChat';

const kanban = () => {
  return (
    <DashboardLayout>
        <VideoChat/>
    </DashboardLayout>
  )
}

export default kanban