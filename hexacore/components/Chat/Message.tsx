import { Dropdown } from "@nextui-org/react"
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"


export default ({index, message, id}) =>{   
    const [canEditMessage, setCanEditMessage] = useState(!false)
    const [editMessageValue, setEditMessageValue] = useState(message.message.message)
    const [row, setRow] = useState(1)
    
    const deleteMessage = async () => {
        console.log(message.messageId)
        await deleteDoc(doc(db, id+'/Messages/', message.messageId))
    }

    useEffect(()=>{
        setRow((editMessageValue.match(/\n/g)||[]).length+1)
    },[])

    const onTextAreaKeyPress = async (e) => {
        if(e.keyCode === 13) //Enter
        {
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
        <div key={index + 'div'} className="col-start-6 col-end-13 p-3 rounded-lg group">
            <div className='text-end'>
                <small className='text-gray-500 small p-3'>21/03 17:15</small>
                <span  className='text-gray-800 dark:text-white p-3'>{message.user.name}</span>
            </div>
            <div className="flex items-center justify-start flex-row-reverse">
                <img key={index + ' image'} src={message.user.photo} className="object-cover w-10 h-10 rounded-full mx-2" alt=""/>
                <div key={index + 'chat'} className="relative mr-3 text-sm group-hover:bg-indigo-200 bg-indigo-100 py-2 px-4 rounded-xl">
                    <textarea className="bg-transparent resize-none" rows={row} onKeyDown={onTextAreaKeyPress} disabled={canEditMessage} key={index++ + 'message'} defaultValue={editMessageValue}/>
                </div>
                <Dropdown>
                    <Dropdown.Trigger><span key={index++ + 'edit'}  className='hidden group-hover:block dark:text-white text-[12px] mr-3 rounded-xl'>Edit</span></Dropdown.Trigger>
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