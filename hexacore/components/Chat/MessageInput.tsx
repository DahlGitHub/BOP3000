import { useEffect, useState } from 'react';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

export default ({id}) =>{
    const [message, setMessage] = useState('');
    const [row, setRow] = useState(1)
    const [chatID, setChatID] = useState(id)
    const [isShiftEnter, setIsShiftEnter] = useState(false)
    const [user, loading] = useAuthState(auth)
  
    //cahnge
    useEffect(()=>{
      setChatID(id)
    }, [id])

    const sendMessage = (e) => {
      if(e.key === 'Enter' && !e.shiftKey){
        if(message === '') return;
        addDoc(collection(db, chatID+'/Messages/'), {
          uid: user.uid,
          type: 'message',
          reactions: [],
          message: message,
          sentAt: Timestamp.now()
        })
        setMessage("");
        setRow(1)
        setIsShiftEnter(false)
      } else{
        setIsShiftEnter(true)
      }
    }

    const type = (e) => {
      if(isShiftEnter){
        setMessage(e.target.value)
        if(e.nativeEvent.inputType === 'insertLineBreak'){
          setRow(row+1)
        } else if(e.nativeEvent.inputType === 'deleteContentBackward'){
          setRow((e.target.value.match(/\n/g)||[]).length+1)
          //setRow(e.target.value.split('\n').length)
        } else setRow((e.target.value.match(/\n/g)||[]).length+1);
      }
    }
  // trenger å sette inn ny row på wordbreak. trenger å sette max row på hvor mange linjer som kommer.
  // sette inn forskjellige knapper som emotes fildeling osv
  
  return ( 
    <div className='bottom-0 flex'>
      <form className='w-full'>
      <label htmlFor="chat" className="sr-only">Your message</label>
        <div className="flex items-center rounded-lg">
            <textarea id="chat" onKeyDown={sendMessage} onChange={type} value={message} rows={row} className="resize-none pl-4 h-10 focus:h-full break-words p-2 w-full text-sm text-gray-900 bg-white rounded-lg border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type message..."></textarea>
              {
              // "Button doesn't work yet" 
              }
              
        </div>
      </form>
    </div>
  )
}