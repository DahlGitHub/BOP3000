import { Container  } from '@nextui-org/react';
import Layout from '../components/Layout/Layout'
import Message from '../components/MessageInput'
import Messages from '../components/MessageList'
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
   

export default () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if(user){
    //redirect('/')
  }
  
  return (
    <Container justify='center' className='flex flex-grow'>
     <Messages/>
      <Message/>
    </Container>
  )
}