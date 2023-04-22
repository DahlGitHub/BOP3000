import { collection, query, onSnapshot, limit, orderBy, startAfter, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import Message from './Message';
import Poll from './Poll';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from '@nextui-org/react';

export default ({id}) =>{
    const [chatID, setChatID] = useState(id);
    const [messages, setMessages] = useImmer([]);
    const chatters = useRef(new Map());
    const [hasMore, setHasMore] = useState(true);

    const getNextMessages = async () => {
        const lastMessage = messages[messages.length - 1];
        const nextMessages = query(
            collection(db, chatID + "/Messages/"),
            orderBy("sentAt", "desc"),
            limit(25),
            startAfter(lastMessage.message.sentAt)
        );

        const querySnapshot = await getDocs(nextMessages);

        if (querySnapshot.docs.length === 0) {
            setHasMore(false);
        }
        
        querySnapshot.forEach((message) => {
            const connect = {
            user: chatters.current.get(message.data().uid),
            message: message.data(),
            messageId: message.id,
            };
            setMessages((messages) => [...messages, connect]);
        });
    };

    useEffect(() => {
    if (chatID !== id) {
        setChatID(id);
        setHasMore(true);
        setMessages([]);
    }

    onSnapshot(collection(db, chatID + "/Members/"), async (querySnapshot) => {
        await querySnapshot.docChanges().forEach(async (member) => {
        if (member.type === "added") {
            chatters.current.set(member.doc.data().uid, member.doc.data());
        }
        if (member.type === "modified") {
            // logic to update modified members
        }
        if (member.type === "removed") {
            // logic to remove member
        }
        });
    });

    const unsubscribe = onSnapshot(
        query(collection(db, chatID + "/Messages/"), orderBy("sentAt", "desc"), limit(25)),
        async (querySnapshot) => {
        const newMessages = [];
        await querySnapshot.docChanges().forEach(async (message) => {
            const connect = {
            user: chatters.current.get(message.doc.data().uid),
            message: message.doc.data(),
            messageId: message.doc.id,
            };
            if (message.type === "added") {
            newMessages.push(connect);
            }
            if (message.type === "modified") {
            setMessages((messages) => {
                const index = messages.findIndex(
                (message) => message.messageId === connect.messageId
                );
                messages[index] = connect;
                return messages;
            });
            }
            if (message.type === "removed") {
            setMessages((messages) => {
                const index = messages.findIndex(
                (message) => message.messageId === connect.messageId
                );
                if (index !== -1) {
                messages.splice(index, 1);
                }
                return messages;
            });
            }
        });
        setMessages((messages) => [...newMessages, ...messages]);
        if (querySnapshot.docs.length < 25) {
            setHasMore(false);
        }
        }
    );

    return () => {
        unsubscribe();
    };
    }, [chatID, id]);
    
    return (
        <div id="scrollableDiv" className="flex flex-col-reverse h-full overflow-x-auto">
            <InfiniteScroll 
                dataLength={messages.length+1}
                next={getNextMessages}
                hasMore={hasMore}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                loader={<Loading size='lg' className='m-4'/>}
                scrollableTarget="scrollableDiv"
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
                >
                <div className="flex-inline">
                    {messages.slice(0).reverse().map((connect) => {
                        const key = connect.message.type === 'message' ? connect.messageId : connect.messageId
                        if (connect.user.uid !== auth.currentUser?.uid && connect.message.type === 'message') {
                            return (
                                <div key={key} className="p-3 rounded-lg">
                                    <div>
                                        <span className="text-gray-800 dark:text-white p-3">{connect.user.name}</span>
                                        <small className="text-gray-500 p-3">21/03 17:15</small>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <img
                                            src={connect.user.photo}
                                            className="object-cover w-10 h-10 rounded-full mx-2"
                                            alt=""
                                        />
                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 rounded-xl">
                                            <div>{connect.message.message}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (connect.message.type === 'message') {
                            return <Message key={key} index={connect.messageId} message={connect} id={id} />;
                        } else if (connect.message.type === 'poll') {
                            return <Poll key={key} index={connect.messageId} pollData={connect} id={id} />;
                        }
                        return null;
                    })}
                </div>
                </InfiniteScroll>
        </div>
    );
};

/* !!!!!!!!!!!!!! IKKE FJERN SKAL SAMMELIGNE SENERE !!!!!!!!!!!!!!!!
export default ({id}) =>{
    const qMessages = query(collection(db, id+'/Messages/'), orderBy('sentAt', 'asc'), limit(50))
    const qChatters = query(collection(db, id+'/Members/'))
    const [messages, setMessages] = useImmer([])
    let chatters = useRef(new Map())
      
    useEffect(()=>{ 
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
                        if (index !== -1) {
                            messages.splice(index, 1)
                        }
                        return messages
                    })
                }
            })
        })

    }, [])
    return (
        <div className="flex flex-col h-full overflow-x-auto">
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((connect, index) => {
                        if (connect.user.uid !== auth.currentUser?.uid && connect.message.type === 'message') {
                            return (
                                <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                                    <div>
                                        <span className="text-gray-800 dark:text-white p-3">{connect.user.name}</span>
                                        <small className="text-gray-500 p-3">21/03 17:15</small>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <img
                                            src={connect.user.photo}
                                            className="object-cover w-10 h-10 rounded-full mx-2"
                                            alt=""
                                        />
                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 rounded-xl">
                                            <div>{connect.message.message}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (connect.message.type === 'message') {
                            return <Message key={index} index={index} message={connect} id={id} />;
                        } else if (connect.message.type === 'poll') {
                            return <Poll key={index} index={index} pollData={connect} id={id} />;
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};
*/