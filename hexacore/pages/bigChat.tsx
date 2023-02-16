import { Input, Container  } from '@nextui-org/react';
import Layout from '../app/Layout';
import Message from '../components/MessageInput'
import Messages from '../components/MessageList'
    
export default function BigChat() {
  return <Layout>
    <Container justify='center' className='flex flex-grow'>
      <Messages/>
      <Message/>
    </Container>
  </Layout>
}