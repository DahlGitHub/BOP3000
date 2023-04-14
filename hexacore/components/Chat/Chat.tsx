import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useState } from 'react';
   

export default ({chatID}) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [chatId, setChatId] = useState(`Chat/${chatID}`)
  const chat = `Chat/${chatID}`
//const referenceCollection = collection(db, 'chat/'+chatID)
useEffect(()=>{
  console.log(chatID)
  setChatId(`Chat/${chatID}`)
  if(!user){
    router.push('/login')
    } else{
      setDoc(doc(db, chat, 'Members/', user.uid), {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL
      })
    }
    }, [chatID])
  return (
    <div className="flex h-[calc(100vh-70px)] antialiased text-gray-800 w-screen">
      <div className="flex flex-row h-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-2">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-800 h-full p-4">
              <MessageList id={chatId}/>
              <MessageInput id={chatId}/>
            </div>
          </div>
        </div>
    </div>
  )
}