import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, QuerySnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import Message from './Message';
import Poll from './Poll';

export default ({id}) =>{
    const qMessages = query(collection(db, id+'/Messages/'), orderBy('sentAt', 'asc'), limit(50))
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
                    message: message.doc.data(),
                    messageId: message.doc.id
                }
                if(message.type === 'added'){
                    setMessages(messages => [...messages, connect])
                }
                if(message.type === 'modified'){
                    setMessages(messages => {
                        const index = messages.findIndex((message) => message.messageId === connect.messageId)
                        messages[index] = connect
                        return messages
                    })
                }
                if(message.type === 'removed'){
                    setMessages(messages => {
                        const index = messages.findIndex((message) => message.messageId === connect.messageId)
                        messages.splice(index, 1)
                        return messages
                    })
                }
            })
        })

    }, [])
    return(
        <div className="flex flex-col h-full overflow-x-auto">
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((message, index) => {
                        if(message.user.uid != auth.currentUser?.uid && message.message.type === 'message') {
                            return (
                                <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                                    <div>
                                    <span className='text-gray-800 dark:text-white p-3'>{message.user.name}</span>
                                    <small className='text-gray-500 p-3'>21/03 17:15</small>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <img src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 rounded-xl">
                                            <div>{message.message.message}</div>
                                        </div>
                                    </div>
                                </div> 
                            ) 
                        } else if(message.message.type === 'message') {
                            return (
                                <Message key={index} index={index} message={message} id={id}/>
                            )
                        }  else if(message.message.type === 'poll') {
                            return (
                                <Poll key={index} index={index} pollData={message} id={id}/>
                            )
                        }
                    })}
                </div>
            </div>
        </div> 
    )
}