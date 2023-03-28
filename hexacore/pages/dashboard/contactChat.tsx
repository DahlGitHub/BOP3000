import React from 'react'
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import ContactList from '../../components/Contact/ContactList';
import ChatTest from '../../components/Chat/Chat';
import ProfileDropdown from '../../components/Layout/NavComponents/ProfileDropdown';

const contactChat = () => {

  

  return (
    <DashboardLayout>
        <ContactList/>
    </DashboardLayout>
  )
}

export default contactChat