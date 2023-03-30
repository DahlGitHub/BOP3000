import { Container  } from '@nextui-org/react';
import Message from './MessageInput'
import Messages from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import ProfileDropdown from '../Layout/NavComponents/ProfileDropdown';
   

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
    <div className="flex h-[calc(100vh-70px)] antialiased text-gray-800 w-screen">
      <div className="flex flex-row h-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-2">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-800 h-full p-4">
              
              {
              //trenger å vite hvor den skal hente data fra
              }
              <Messages id={chat}/>
              {
              //trenger å vite hvor den skal skrive til
              }
              <Message id={chat}/>
            </div>
          </div>
        </div>
    </div>
  )
}