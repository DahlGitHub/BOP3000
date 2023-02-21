import { Input, Container  } from '@nextui-org/react';
import Layout from '../app/Layout';
import Message from '../components/MessageInput'
import Messages from '../components/MessageList'
import { useState } from 'react';
   
/*
const [messages, setMessages] = useState([])
  for(var i = 0; i < 10; i++){
    setMessages(messages => [...messages, 'hei'+i])
  }*/
export default function BigChat() {
  
  return <Layout>
    <Container justify='center' className='flex flex-grow'>
      <Messages/>
      <Message/>
    </Container>
  </Layout>
}