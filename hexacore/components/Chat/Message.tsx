import { Dropdown } from "@nextui-org/react"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"


export default ({index, message, id}) =>{   
    const [canEditMessage, setCanEditMessage] = useState(!false)
    const [editMessageValue, setEditMessageValue] = useState(message.message.message)
    const [rows, setRows] = useState(1)
    const textAreaRef = useRef(null);
    const date = message.message.sentAt.toDate()
    
    const deleteMessage = async () => {
        await deleteDoc(doc(db, id+'/Messages/', message.messageId))
    }

    useEffect(()=>{
        if(textAreaRef.current.scrollHeight > textAreaRef.current.clientHeight){
            const rowsNeeded = Math.ceil(textAreaRef.current.scrollHeight / 20)
            setRows(rowsNeeded);
        } else{
            setRows((editMessageValue.match(/\n/g)||[]).length+1)
        }
        
    },[editMessageValue])

    const onTextAreaKeyPress = async (e) => {
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault()
          if(editMessageValue.length === 0) {
            setCanEditMessage(!false)
          }
          else {
            await updateDoc(doc(db, id+'/Messages/', message.messageId), {
                message: editMessageValue
            })
            setCanEditMessage(!false)
          }
        }
      }
    return(
        <div key={index} className="p-3 rounded-lg group">
            <div className='text-end'>
                <small className='text-gray-500 small p-3'>{date.getDate() + "/" + (date.getMonth()+1) + " " +date.getHours()+ ":" + date.getMinutes()}</small>
                <span  className='text-gray-800 dark:text-white p-3'>{message.user.name}</span>
            </div>
            <div className="flex items-center justify-start flex-row-reverse">
                <img src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
                <div className="relative mr-3 text-sm group-hover:bg-indigo-200 bg-indigo-100 py-2 px-4 rounded-xl">
                <textarea 
                    ref={textAreaRef} 
                    className="bg-transparent resize-none break-all" 
                    rows={rows} 
                    style={{ maxHeight: '200px' }} 
                    onChange={(e) => setEditMessageValue(e.target.value)} 
                    onKeyDown={onTextAreaKeyPress} 
                    disabled={canEditMessage} 
                    value={editMessageValue}
                />
                </div>
                <Dropdown>
                    <Dropdown.Trigger><span className='hidden group-hover:block dark:text-white text-[12px] mr-3 rounded-xl'>Edit</span></Dropdown.Trigger>
                    <Dropdown.Menu
                        className="text-center p-1"
                        selectionMode="single"
                        css={{ $$dropdownMenuMinWidth: "100px" }}
                        onAction={(key)=>{
                            if(key == 'edit'){
                                setCanEditMessage(!canEditMessage)
                            }
                            if(key == 'delete'){
                                deleteMessage()
                            }
                        }}>
                        <Dropdown.Item icon={<FontAwesomeIcon icon={faPenToSquare}/>} key="edit">Edit</Dropdown.Item>
                        <Dropdown.Item color='error' icon={<FontAwesomeIcon icon={faTrash}/>} key='delete'>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}