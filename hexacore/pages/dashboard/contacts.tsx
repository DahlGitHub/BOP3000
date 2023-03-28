import React from 'react'
import Contacts from '../../components/Contact/AddContacts';
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import Login from '../login';

const contacts = () => {
  return (
    <DashboardLayout>
      <Contacts/>
    </DashboardLayout>
  )
}

export default contacts