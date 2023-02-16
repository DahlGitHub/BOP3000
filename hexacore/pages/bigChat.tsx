import { Input, Container  } from '@nextui-org/react';
import Layout from '../app/Layout';
import Message from '../components/TypeMessage'
    
export default function BigChat() {
  return <Layout>
    <Container justify='center'>
      
      <Message/>
    </Container>
  </Layout>
}