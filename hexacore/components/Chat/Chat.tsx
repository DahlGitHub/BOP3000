import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useState } from 'react';
import CreatePoll from './CreatePoll';
   

export default ({chatID}) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [chatId, setChatId] = useState(`${chatID}`)
  const [selectedButton, setSelectedButton] = useState('Message')
  const chat = chatID
//const referenceCollection = collection(db, 'chat/'+chatID)
useEffect(()=>{
  if(!user){
    router.push('/login')
    } else{
      setDoc(doc(db, chat, 'Members/', user.uid), {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL
      })
      //console.log(chatID)
      setChatId(chatID)
    }
    }, [chatID])
  return (
    <div className=" flex 1 h-[calc(100vh-70px)] antialiased w-full">
      <div className="flex flex-row h-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-2">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl divide-y-2 bg-gray-100 dark:bg-gray-800 h-full p-4">
              <MessageList id={chatId}/>
              <div className="flex-none pt-1 ">
                <div className='text-black space-x-1 divider-x mx-2'>
                  <button onClick={()=>setSelectedButton('Message')}>Message</button>
                  <button onClick={()=>setSelectedButton('Poll')}>Poll</button>
                </div>
                {selectedButton === 'Message' ? <MessageInput id={chatId}/> : <CreatePoll id={chatId}/>}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}