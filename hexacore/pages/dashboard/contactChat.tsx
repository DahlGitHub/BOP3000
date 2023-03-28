import React from 'react'
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import ContactList from '../../components/Contact/ContactList';
import ChatTest from '../../components/Chat/Chat';
import ProfileDropdown from '../../components/Layout/NavComponents/ProfileDropdown';

const contactChat = () => {

  const [isListOpen, setIsListOpen] = React.useState(true);

  function handleListOpen() {
      setIsListOpen(true);
  }
  
  function handleListClose() {
    setIsListOpen(false);
  }

  return (
    <DashboardLayout>
        <ContactList isOpen={isListOpen} onClose={handleListClose} onOpen={handleListOpen}/>
    </DashboardLayout>
  )
}

export default contactChat