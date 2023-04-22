import { Dropdown } from "@nextui-org/react"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faEllipsisV, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"


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
        
        <div key={index} className="p-3 rounded-lg group relative">
        <div className="flex items-center justify-start flex-row group-hover:bg-gray-200 rounded-lg">
          <img src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
          <div className="flex-1 overflow-hidden">
            <div>
              <span className="text-gray-800 cursor-pointer">{message.user.name}</span>
              <span className="text-gray-400 text-xs mx-3">{date.getDate() + "/" + (date.getMonth()+1) + " " +date.getHours()+ ":" + date.getMinutes()}</span>
            </div>
            <input 
              ref={textAreaRef} 
              className="bg-transparent resize-none break-all" 
              style={{ maxHeight: '200px' }} 
              onChange={(e) => setEditMessageValue(e.target.value)} 
              onKeyDown={onTextAreaKeyPress} 
              disabled={canEditMessage} 
              value={editMessageValue}
            />
          </div>
          <div className="absolute right-2.5 top-0">
            
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="tooltip" data-tip="More">
                    <button type="button" className='hidden group-hover:block dark:text-white text-[12px] mr-3 rounded bg-gray-300 p-1 border border-gray-400 shadow-lg'><FontAwesomeIcon className="fa-lg" icon={faEllipsisH}/>
                    </button>
           
                    </div>
                </Dropdown.Trigger>
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
    </div>
      
    )
}