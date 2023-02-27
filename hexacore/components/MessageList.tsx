import { Container } from '@nextui-org/react';
import { collection, query, onSnapshot, limit, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

const q = query(collection(db, '/groups/e5UQ87CZktE0ewgqvWpx/Channel/Hexacore/Messages/'), orderBy('sentAt', 'asc'), limit(10))
export default () =>{
    const [messages, setMessages] = useImmer([])

    useEffect(()=>{
        onSnapshot(q, (querySnapshot) =>{
            querySnapshot.docChanges().forEach((change)=>{
                if(change.type === 'added'){
                    setMessages(messages => [...messages, change.doc.data()])
                }
                if(change.type === 'modified'){
                    // logikk for å endre meldingen som har blitt endret
                    setMessages(messages)
                }
                if(change.type === 'removed'){
                    //logikk som fjerner meldingen
                }
            })
        })
    }, [])
    let index = 0;
    return(
        <div className="
            bg-stone-700 
            h-72
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
                    return (
                        <div key={index + 'div'} className='relative my-5'>
                            <button key={index + 'icon'} className="flex-none rounded-full bg-purple-900">pro</button>
                            <div key={index + 'chat'} className='flex-wrap w-64 pl-4'>
                                <p  className='text-red-400'>Henrik Lindam {message.sentAt.timestampValue}</p>
                                <p>{message.message}</p>
                            </div>
                            <button key={index++ + 'edit'} className='absolute right-0 top-0 bg-purple-900'>edit</button>
                        </div>
                    )
                })
            }
        </div>
       
    )
}