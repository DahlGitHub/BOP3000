import React from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import Kanban from '../../components/Kanban/Kanban';

const kanban = () => {
  return (
    <DashboardLayout>
    <div className='max-w-fit'>
      <Kanban/>
      </div>
    </DashboardLayout>
  )
}

export default kanban