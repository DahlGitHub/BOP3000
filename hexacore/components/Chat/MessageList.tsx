import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';


export default ({id}) =>{
    const qMessages = query(collection(db, id+'/Messages/'), orderBy('sentAt', 'asc'), limit(10))
    const qChatters = query(collection(db, id+'/Members/'))
    const [messages, setMessages] = useImmer([])
    let chatters = useRef(new Map())
      
    useEffect(()=>{
        //lage en sjekk som kan sjekke medlemmer kun når medlemmer endrer seg
        onSnapshot(qChatters, async (querySnapshot) =>{
            await querySnapshot.docChanges().forEach(async (member)=>{ 
                if(member.type === 'added'){
                    chatters.current.set(member.doc.data().uid, member.doc.data())
                }
                if(member.type === 'modified'){
                    // logikk for å endre medlemmer som har blitt endret
                }
                if(member.type === 'removed'){
                    //logikk som fjerner medlem
                }
            })
        })

        onSnapshot(qMessages, async (querySnapshot) =>{
            await querySnapshot.docChanges().forEach(async (message)=>{ 
                const connect = {
                    user: chatters.current.get(message.doc.data().uid),
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
                            <img key={index + ' image'} className="object-cover w-8 h-8 rounded-full" src={message.user.photo} alt=""/>
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