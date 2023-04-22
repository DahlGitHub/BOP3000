import MessageInput from './MessageInput'
import MessageList from './MessageList'
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useState } from 'react';
import CreatePoll from './CreatePoll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faDashboard, faPoll, faPollH, faSms, faSquarePollVertical, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
   

export default ({chatID}) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [chatId, setChatId] = useState(`${chatID}`)
  const [selectedButton, setSelectedButton] = useState('Message')
  const chat = chatID
//const referenceCollection = collection(db, 'chat/'+chatID)

function getButtonClassName(buttonName, selectedButton) {
  let classNames = 'inline-block p-1 rounded-t-lg border-t border-l border-r';

  if (selectedButton === buttonName) {
    classNames += ' rounded-t-lg border-gray-400 bg-gray-100 px-2 border-b-none';
  } else {
    classNames += ' border-transparent hover:text-blue-600 dark:hover:text-gray-300 text-gray-500';
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
      <div className="flex flex-col h-[calc(100vh-70px)] antialiased w-full">
        <div className="flex flex-row h-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-2">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl divide-y-2 bg-gray-100 dark:bg-gray-800 h-full p-4">
              <MessageList id={chatId}/>
              <div className="flex-none pt-1">
                <div className="text-black space-x-1 divider-x bg-white rounded-lg">
                <button
                  className={getButtonClassName('Message', selectedButton)}
                  onClick={() => setSelectedButton('Message')}
                >
                  <FontAwesomeIcon className='w-5 fa-xs' icon={faMessage}/> Message
                </button>
                <button
                  className={getButtonClassName('Poll', selectedButton)}
                  onClick={() => setSelectedButton('Poll')}
                >
                  <FontAwesomeIcon className='w-5 fa-sm' icon={faPoll}/>Poll
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