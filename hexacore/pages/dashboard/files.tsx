import React from 'react'
import Contacts from '../../components/Contact/AddContacts';
import Files from '../../components/Files';
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import Login from '../login';

const inbox = () => {
  return (
    <DashboardLayout>
        <Files/>
    </DashboardLayout>
  )
}

export default inbox