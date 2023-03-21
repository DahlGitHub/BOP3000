import { Container  } from '@nextui-org/react';
import Message from './MessageInput'
import Messages from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
   

export default ({chatID}) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

const chat = `Chat/${chatID}`

//const referenceCollection = collection(db, 'chat/'+chatID)
if(user){
  setDoc(doc(db, chat, 'Members/', user.uid), {
    uid: user.uid,
    name: user.displayName,
    photo: user.photoURL
  })
}
  
  return (
    <Container justify='center' className='flex flex-grow w-full'>
      {
      //trenger å vite hvor den skal hente data fra
      }
     <Messages id={chat}/>
      {
      //trenger å vite hvor den skal skrive til
      }
      <Message id={chat}/>
    </Container>
  )
}