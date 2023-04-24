import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useState } from 'react';
import CreatePoll from './CreatePoll';
import { faMessage, faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

   

export default ({chatID}) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [chatId, setChatId] = useState(`${chatID}`)
  const [selectedButton, setSelectedButton] = useState('Message')
  const chat = chatID
//const referenceCollection = collection(db, 'chat/'+chatID)

function getButtonClassName(buttonName, selectedButton) {
  let classNames = 'inline-block p-1 rounded-lg';

  if (selectedButton === buttonName) {
    classNames += ' rounded-t-lg border-gray-400 bg-white dark:bg-gray-700 text-blue-600';
  } else {
    classNames += ' border-transparent hover:text-blue-600 dark:hover:text-blue-600 text-gray-500';
  }

  return classNames;
}

useEffect(()=>{
  if(!user){
    router.push('/login')
    } else{
      setDoc(doc(db, chat, 'Members/', user.uid), {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL
      })
      setChatId(chatID)
    }
    }, [chatID])
    return (
      <div className="flex h-[calc(100vh-70px)] antialiased w-full">
        <div className="flex flex-row h-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-2 w-[calc(100vh)]">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl divide-y-2 bg-gray-100 dark:bg-gray-800 h-full p-4">
              <MessageList id={chatId}/>
              <div className="flex-none pt-1">
                <div className="text-black space-x-5 divider-x bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  className={getButtonClassName('Message', selectedButton)}
                  onClick={() => setSelectedButton('Message')}
                >
                <span className='text-[12px] pr-2'><FontAwesomeIcon className='w-5 fa-xs mx-1' icon={faMessage}/>Message</span>
                </button>
                <button
                  className={getButtonClassName('Poll', selectedButton)}
                  onClick={() => setSelectedButton('Poll')}
                >
                  <span className='text-[12px] pr-2'><FontAwesomeIcon className='w-5 fa-sm mx-1' icon={faPoll}/>Poll</span>
                </button>
                </div>
                {selectedButton === 'Message' ? <MessageInput id={chatId}/> : <CreatePoll id={chatId}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}