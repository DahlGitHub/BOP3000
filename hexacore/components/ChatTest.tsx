import { Container  } from '@nextui-org/react';
import Message from '../components/MessageInput'
import Messages from '../components/MessageList'
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, setDoc } from 'firebase/firestore';
import { db } from '../firebase'
   

export default () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  
const chatID = 'Chat/User1IDandUser2ID'

//const referenceCollection = collection(db, 'chat/'+chatID)
if(user){
  setDoc(doc(db, chatID, 'Members/', user.uid), {
    uid: user.uid
  })
}
  
  return (
    <Container justify='center' className='flex flex-grow w-full'>
      {
      //trenger å vite hvor den skal hente data fra
      }
     <Messages id={chatID}/>
      {
      //trenger å vite hvor den skal skrive til
      }
      <Message id={chatID}/>
    </Container>
  )
}