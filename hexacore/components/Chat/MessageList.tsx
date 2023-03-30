import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where, QuerySnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { Text } from '@nextui-org/react';


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

                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message) => {
                                        if(message.user.uid != auth.currentUser?.uid) {
                                           return (
                                           <div key={index + 'div'} className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div>
                                                <span className='text-gray-800 dark:text-white p-3'>{message.user.name}</span>
                                                <small className='text-gray-500 p-3'>21/03 17:15</small>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <img key={index + ' image'} src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
                                                    <div key={index + 'chat'} className="relative ml-3 text-sm bg-white py-2 px-4 rounded-xl">
                                                        <div key={index++ + 'message'}>{message.message.message}</div>
                                                    </div>
                                                </div>
                                            </div> 
                                        ) 

                                        } else {
                                            
                                            return (
                                            <div key={index + 'div'} className="col-start-6 col-end-13 p-3 rounded-lg group">
                                                <div className='text-end'>
                                                <small className='text-gray-500 small p-3'>21/03 17:15</small>
                                                <span  className='text-gray-800 dark:text-white p-3'>{message.user.name}</span>
                                        
                                                </div>
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <img key={index + ' image'} src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
                                                    <div key={index + 'chat'} className="relative mr-3 text-sm group-hover:bg-indigo-200 bg-indigo-100 py-2 px-4 rounded-xl">
                                                        <div key={index++ + 'message'}>{message.message.message}</div>
                                                
                                                    </div>
                                                    <button key={index++ + 'edit'} className='hidden group-hover:block dark:text-white text-[12px] mr-3 rounded-xl'>Edit</button>
                                                </div>
                                            </div>
                                            )
                                        }
                                        
                                    })}
                                    

                                    

                                </div>
                            </div>
                        </div> 
                             

        
                    

    )
}