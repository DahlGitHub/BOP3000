import { Card, Textarea  } from '@nextui-org/react';
import { useState } from 'react';
   

export default () =>{
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])

    const test = (event: React.KeyboardEvent<HTMLInputElement>)=> {
        if(event.key === 'Enter' && !event.shiftKey){
            messages.push(message)
            //setMessages([...messages, message])
            setMessage('')
            for(var i = 0; i < messages.length; i++){
                console.log(messages[i])
            }
        }

    }

    const type = (e) =>{
        //console.log(e)
       setMessage(e.target.value)
    }
  return ( 
    <Card >
    <Textarea onKeyUp={test} onChange={type} placeholder='Chat here' value={message} id='message' name='message' minRows={1} maxRows={3} width='100%'/>
    </Card>
  )
}