import { Container } from '@nextui-org/react';
import { useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";



export default () =>{
    const [message, setMessage] = useState('');
    const [row, setRow] = useState(1)
    const [isShiftEnter, setIsShiftEnter] = useState(false)
    const db = getDatabase()

    const test = (event: React.KeyboardEvent<HTMLInputElement>)=> {}

    const sendMessage = (e) => {
      if(e.key === 'Enter' && !e.shiftKey){
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
      //console.log(e.nativeEvent.inputType)
      //console.log(e.nativeEvent)
      if(e.nativeEvent.inputType === 'insertLineBreak'){
        setRow(row+1)
      } else if(e.nativeEvent.inputType === 'deleteContentBackward'){
        setRow((e.target.value.match(/\n/g)||[]).length+1)
        //setRow(e.target.value.split('\n').length)
      } else setRow((e.target.value.match(/\n/g)||[]).length+1);
      
      }
    }

  return ( 
    <Container className='relative place-content-center'>
      <textarea onKeyDown={sendMessage} onChange={type} value={message} rows={row} placeholder='Write here!!!' 
      className="
        resize-none 
        px-5 
        rounded 
        w-full 
        bg-stone-700 
        text-white
      "/>
    </Container>
  )
}