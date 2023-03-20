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
        
        <section className="bg-white dark:bg-gray-900 flex min-h-screen">
        {//<ContactList isOpen={isListOpen} onClose={handleListClose} onOpen={handleListOpen}/>
        }
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <ChatTest/>
              
          </div>
        </section>
    </DashboardLayout>
  )
}

export default contactChat