import { Container } from '@nextui-org/react';
import { useState } from 'react';
import { Timestamp, doc, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
export default ({id}) =>{
    const [message, setMessage] = useState('');
    const [row, setRow] = useState(1)
    const [isShiftEnter, setIsShiftEnter] = useState(false)
    const [user, loading] = useAuthState(auth)
    
    const sendMessage = (e) => {
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
    <Container className='relative place-content-center p-0'>
      <textarea onKeyDown={sendMessage} onChange={type} value={message} rows={row} placeholder='Write here!!!' 
      className="
        resize-none 
        px-5 
        break-words
        w-full 
        bg-stone-700 
        text-white
      "/>
    </Container>
  )
}