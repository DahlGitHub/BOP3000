import React from 'react'
import Contacts from '../../components/Contacts';
import DashboardLayout from '../../components/DashboardLayout';
import Login from '../login';

const inbox = () => {
  return (
    <DashboardLayout>
        <Contacts/>
    </DashboardLayout>
  )
}

export default inbox