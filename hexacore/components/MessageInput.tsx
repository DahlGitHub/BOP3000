import { Card, Container } from '@nextui-org/react';
import { useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";



export default () =>{
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const [row, setRow] = useState(1)
    const db = getDatabase()

    const test = (event: React.KeyboardEvent<HTMLInputElement>)=> {
        if(event.key === 'Enter' && !event.shiftKey){
            messages.push(message)
            //setMessages([...messages, message])
            setMessage('')
        }

    }

    const sendMessage = (e) => {
      if(e.key === 'Enter' && !e.shiftKey){
        setMessage("");
        setRow(1)
      }
    }

    const type = (e) => {
      setMessage(e.target.value)
      console.log(e.nativeEvent.inputType)
      console.log(e.nativeEvent)
      if(e.nativeEvent.inputType === 'insertLineBreak'){
        setRow(row+1)
      } else if(e.nativeEvent.inputType === 'deleteContentBackward'){
        setRow((message.match(/\n/g)||[]).length+1)
      } else setRow((message.match(/\n/g)||[]).length+1);
      
      
      
    }

  return ( 
    <Container className='relative place-content-center'>
      <textarea  onChange={type} value={message} rows={row} placeholder='Write here!!!' 
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