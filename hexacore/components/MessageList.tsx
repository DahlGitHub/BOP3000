import { Container } from '@nextui-org/react';
import { collection, query, onSnapshot, limit, orderBy, getDocs, getDoc, doc, where } from 'firebase/firestore';
import { db } from '../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

const qMessages = query(collection(db, '/groups/e5UQ87CZktE0ewgqvWpx/Channel/Hexacore/Messages/'), orderBy('sentAt', 'asc'), limit(10))
const qChatters = query(collection(db, '/groups/e5UQ87CZktE0ewgqvWpx/Members/'))
export default () =>{
    const [messages, setMessages] = useImmer([])
    const chattersID = useRef(new Map())
    const chatters = useRef(new Map())
    //const [chatters, setChatters] = useImmer([])


    useEffect(()=>{
        
        const getID = async ()=>{
        const querySnapshot = await getDocs(qChatters);
        querySnapshot.forEach(async(id) => {
            if(!chattersID.current.has(id.data())){
               chattersID.current.set(id.data(), id.data())
            }
        });
        getPerson()
        }
        getID()
        const queryUser = query(collection(db, 'users'), where('uid', '==', chattersID.current.forEach))

        const getPerson = () =>{  
            chattersID.current.forEach(async(id)=>{
            const person = await getDoc(doc(db, 'users', id.uid))
            //
            chatters.current.set(person.data().uid, person.data())
        })
        } 
        

        
        
        

        onSnapshot(qMessages, (querySnapshot) =>{
            querySnapshot.docChanges().forEach(async (change)=>{
                //løsning 1
                //hente alle nrukere i chatten og plassere de på sin melding
                //løsning 2
                //hent bruker data fra bruker id
                //har brukeren blitt hentet aleredet bruk den dataen
                //if(!chatters.includes(change.doc.data())){
                    
                    //trenger å catche om brukeren ikke eksisterer lengre
                //}
                console.log(chatters.current.get(change.doc.data().uid))
                const connect = {
                    user: chatters.current.get(change.doc.data().uid),
                    message: change.doc.data()
                }

                if(change.type === 'added'){
                    setMessages(messages => [...messages, connect])
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