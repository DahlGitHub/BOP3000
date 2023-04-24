import { Dropdown } from "@nextui-org/react"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import { db } from "../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookDead, faEllipsisH, faEllipsisV, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../context/UserContext"
import { faAngry, faHeart, faNewspaper, faSadCry, faSmile, faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import EmojiPicker from "emoji-picker-react"


export default ({index, message, id}) =>{   
    const [canEditMessage, setCanEditMessage] = useState(!false)
    const [editMessageValue, setEditMessageValue] = useState(message.message.message)
    const [rows, setRows] = useState(1)
    const textAreaRef = useRef(null);
    const date = message.message.sentAt.toDate()
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useContext(UserContext)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
        if (e.key === 'Escape') {
          setCanEditMessage(true);
          setEditMessageValue(message.message.message);
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (editMessageValue.length === 0) {
            setCanEditMessage(true);
          } else {
            await updateDoc(doc(db, id+'/Messages/', message.messageId), {
              message: editMessageValue
            });
            setCanEditMessage(true);
          }
        }
      };

    const textAreaClass = canEditMessage ? "bg-transparent" : "bg-gray-50 rounded-lg px-1 mr-2 pr-2 dark:bg-gray-600";
    const messageClass = canEditMessage ? "group-hover:bg-gray-200 dark:group-hover:bg-gray-700" : " bg-gray-200 dark:bg-gray-700";
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return(
        
<div key={index} className="px-2 py-0.5 rounded-lg group relative">
  <div className={`flex items-center justify-start flex-row rounded-lg ${messageClass}`}>
    <div className="top-0">
    <img src={message.user.photo} className="object-cover w-12 h-12 rounded-full mx-2" alt=""/>
    </div>
    <div className="flex-1 overflow-hidden">
      <div className="mt-4 flex items-center">
        <span className="text-gray-800 dark:text-gray-100">{message.user.name}</span>
        <span className="text-gray-400 text-xs mx-3">{day + "/" + month + " " +hour+ ":" + minutes}</span>
      </div>
      <div className="mr-2">
        <textarea 
          ref={textAreaRef}
          rows={rows}
          className={`resize-none w-full dark:text-gray-200 ${textAreaClass}`}
          onChange={(e) => setEditMessageValue(e.target.value)} 
          onKeyDown={onTextAreaKeyPress} 
          disabled={canEditMessage} 
          value={editMessageValue}
        />
        {!canEditMessage && (
          <div className="flex space-x-1">
            <span className="text-xs dark:text-gray-100">enter to 
              <a className="px-1 hover:underline" onClick={async () => {
                await updateDoc(doc(db, id+'/Messages/', message.messageId), {
                  message: editMessageValue,
                });
                setCanEditMessage(!false);
              }}><span className="text-blue-600">save</span></a></span>
            <span className="text-xs dark:text-gray-100">• escape to 
              <a className="px-1 hover:underline" onClick={() => {
                setEditMessageValue(message.message.message);
                setCanEditMessage(!false);
              }}><span className="text-blue-600">cancel</span></a></span>
          </div>
        )}
      </div>
    </div>
    <div className="absolute flex space-x-2 right-2.5 mr-3 hidden group-hover:flex -top-2.5 rounded bg-gray-300 dark:bg-gray-800 p-1 border border-gray-400 shadow-lg">

    {user.uid === message.user.uid && canEditMessage ?
      <Dropdown>
        <Dropdown.Trigger>
          <div className="tooltip" data-tip="More">
            <button type="button" className='dark:text-white text-[12px]'><FontAwesomeIcon className="fa-lg" icon={faEllipsisH}/></button>
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
      :null}

    
          <Dropdown>
    <Dropdown.Trigger>
      <div className="tooltip" data-tip="More">
        <button type="button" className='dark:text-white text-[12px]'><FontAwesomeIcon className="fa-lg" icon={faSmile}/></button>
      </div>
    </Dropdown.Trigger>
    <Dropdown.Menu
    aria-label="Static Actions"
    css={{ display: "flex", flexDirection: "row" }}>
    <Dropdown.Item key="new"><FontAwesomeIcon icon={faSmile}/></Dropdown.Item>
    <Dropdown.Item key="copy"><FontAwesomeIcon icon={faHeart}/></Dropdown.Item>
    <Dropdown.Item key="edit"><FontAwesomeIcon icon={faThumbsUp}/></Dropdown.Item>
    <Dropdown.Item key="delete"><FontAwesomeIcon icon={faThumbsDown}/></Dropdown.Item>
    <Dropdown.Item key="cool"><FontAwesomeIcon icon={faAngry}/></Dropdown.Item>
    <Dropdown.Item key="test"><FontAwesomeIcon icon={faSadCry}/></Dropdown.Item>
  </Dropdown.Menu>
  </Dropdown>
       
    </div>
  </div>
</div>


      
    )
}

{
  /*
  Eventuelt en måte, med 6 ved siden av hverandre
  <Dropdown>
    <Dropdown.Trigger>
      <div className="tooltip" data-tip="More">
        <button type="button" className='dark:text-white text-[12px]'><FontAwesomeIcon className="fa-lg" icon={faSmile}/></button>
      </div>
    </Dropdown.Trigger>
    <Dropdown.Menu
    aria-label="Static Actions"
    css={{ display: "flex", flexDirection: "row" }}>
    <Dropdown.Item key="new"><FontAwesomeIcon icon={faSmile}/></Dropdown.Item>
    <Dropdown.Item key="copy"><FontAwesomeIcon icon={faHeart}/></Dropdown.Item>
    <Dropdown.Item key="edit"><FontAwesomeIcon icon={faThumbsUp}/></Dropdown.Item>
    <Dropdown.Item key="delete"><FontAwesomeIcon icon={faThumbsDown}/></Dropdown.Item>
    <Dropdown.Item key="cool"><FontAwesomeIcon icon={faNewspaper}/></Dropdown.Item>
    <Dropdown.Item key="test"><FontAwesomeIcon icon={faBookDead}/></Dropdown.Item>
  </Dropdown.Menu>
  </Dropdown>
  */
  }