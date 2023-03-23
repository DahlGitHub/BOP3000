import { Container } from '@nextui-org/react';
import { useState } from 'react';
import { Timestamp, doc, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
export default ({id}) =>{
    const [message, setMessage] = useState('');
    const [row, setRow] = useState(1)
    const [isShiftEnter, setIsShiftEnter] = useState(false)
    const [user, loading] = useAuthState(auth)
    
    const sendMessage = (e) => {
      console.log(e)
      if(e.key === 'Enter' && !e.shiftKey){
        addDoc(collection(db, id+'/Messages/'), {
          uid: user.uid,
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
            <textarea id="chat" onKeyDown={sendMessage} onChange={type} value={message} rows={row} className="resize-none pl-4 h-10 focus:h-full break-words p-2 w-full text-sm text-gray-900 bg-white rounded-lg border bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type message..."></textarea>
              {
              // "Button doesn't work yet" 
              }
              <button className="inline-flex justify-center m-2 p-1 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                <span className="sr-only">Send message</span>
              </button>
        </div>
      </form>
    </div>
  )
}