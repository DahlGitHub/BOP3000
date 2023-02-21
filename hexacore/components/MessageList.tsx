import { Container } from '@nextui-org/react';
import { collection, query, onSnapshot, limit, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase'
import { useEffect, useRef, useState } from 'react';

const q = query(collection(db, '/groups/e5UQ87CZktE0ewgqvWpx/Channel/Hexacore/Messages/'), orderBy('sentAt', 'asc'), limit(5))
const getMessages = getDocs(q).then((docs)=>{
    const arr = new Array();
    docs.forEach((doc) =>{
        arr.push(doc.data())
    })
    return Promise.all(arr);
})

export default () =>{
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        getMessages.then((arr)=> {
            arr.forEach((msg)=>{
                setMessages(messages => [...messages, msg])
            })
        })
    }, [])
    /* realtime data
    const q = query(collection(db, '/groups/e5UQ87CZktE0ewgqvWpx/Channel/Hexacore/Messages/'), orderBy('sentAt', 'desc'), limit(2))
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setMessages([...messages, doc])
        })
    })*/
    
    return(
        <Container className="
            bg-stone-700 
            h-72 
            border-solid 
            border-2
            border-black
            text-white
        ">
            {
                messages.map((message) => {
                    return (
                        <p>{message.message}</p>
                    )
                })
            }
        </Container>
       
    )
}