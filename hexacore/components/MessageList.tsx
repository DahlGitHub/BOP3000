import { Container } from '@nextui-org/react';
import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where } from 'firebase/firestore';
import { db } from '../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';


export default ({id}) =>{
    const qMessages = query(collection(db, id+'/Messages/'), orderBy('sentAt', 'asc'), limit(10))
    const qChatters = query(collection(db, id+'/Members/'))
    const [messages, setMessages] = useImmer([])
    let chatters = useRef(new Map())

    const getPeople = async () => {
        const queryChatters = await getDocs(qChatters);
        const chattersMap = new Map();
        
        for (const docSnap of queryChatters.docs) {
          const id = docSnap.data().uid;
          const docRef = doc(db, 'users', id);
          const snapshot = await getDoc(docRef);
          const data = snapshot.data();
          chattersMap.set(id, data);
        }
      
        return chattersMap;
      }
    useEffect(()=>{
        //lage en sjekk som kan sjekke medlemmer kun når medlemmer endrer seg
        const chattersmap = getPeople().then((data)=>{
            onSnapshot(qMessages, async (querySnapshot) =>{
                await querySnapshot.docChanges().forEach(async (message)=>{  
                    const connect = {
                        user: data.get(message.doc.data().uid),
                        message: message.doc.data()
                    }
                    if(message.type === 'added'){
                        setMessages(messages => [...messages, connect])
                    }
                    if(message.type === 'modified'){
                        // logikk for å endre meldingen som har blitt endret
                        setMessages(messages)
                    }
                    if(message.type === 'removed'){
                        //logikk som fjerner meldingen
                    }
                })
            })
        })
    }, [])
    let index = 0;
    return(
        <div className="
            bg-stone-700 
            min-h-fit
            min-w-80
            border-solid 
            border-2
            border-black
            text-white
            overflow-auto
            w-full
            px-5
        ">
            {
                messages.map((message) => {
                   //console.log(message)
                    return (
                        <div key={index + 'div'} className='relative my-5'>
                            <img key={index + ' image'} className="object-cover w-8 h-8 rounded-full" src={message.user.picture} alt=""/>
                            <div key={index + 'chat'} className='flex-wrap min-w-fit pl-4'>
                                <p  className='text-red-400'>{message.user.name}</p>
                                <p key={index + 'message'}>{message.message.message}</p>
                            </div>
                            <button key={index++ + 'edit'} className='absolute right-0 top-0 bg-purple-900'>edit</button>
                        </div>
                    )
                })
            }
        </div>
       
    )
}