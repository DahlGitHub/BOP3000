import React from 'react'
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import Kanban from '../../components/Kanban/Kanban';

const kanban = () => {
  return (
    <DashboardLayout>
    <div className='max-w-fit'>
      <Kanban id="/groups/a82bcf3fff364e71b2a8bb39903be3dd/kanbanid" membersId="/users" />
      </div>
    </DashboardLayout>
  )
}

export default kanban