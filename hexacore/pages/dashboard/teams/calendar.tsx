import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import TeamCalendar from '../../../components/TeamCalendar'
import TeamMenuLayout from '../../../components/TeamMenuLayout'


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