import React from 'react'
import DashboardLayout from '../../../components/Layout/Dashboard/DashboardLayout'
import TeamCalendar from '../../../components/Team/TeamCalendar'
import TeamMenuLayout from '../../../components/Team/TeamMenuLayout'


const calendar = () => {
  return (
    <DashboardLayout>
        <TeamMenuLayout>
            <TeamCalendar/>
        </TeamMenuLayout>
    </DashboardLayout>
  )
}

export default calendar