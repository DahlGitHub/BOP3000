import React from 'react'
import Contacts from '../../components/Contacts';
import DashboardLayout from '../../components/DashboardLayout';
import Login from '../login';

const contacts = () => {
  return (
    <DashboardLayout>
      <br/>
      <Contacts/>
    </DashboardLayout>
  )
}

export default contacts