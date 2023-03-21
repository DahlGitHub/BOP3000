import React from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import ContactList from '../../components/Contact/ContactList';
import ChatTest from '../../components/Chat/Chat';

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