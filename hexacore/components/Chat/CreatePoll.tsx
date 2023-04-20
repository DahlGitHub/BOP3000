import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Input } from "@nextui-org/react"
import { useContext, useState } from "react"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { UserContext } from "../../context/UserContext"


export default ({id}) => {
    const [optionsCount, setOptionsCount] = useState(2)
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(Array(optionsCount).fill(''))
    const {user} = useContext(UserContext)

    const removeOption = (index) => {
        setOptionsCount(optionsCount-1)
        setOptions(options.filter((_, i) => i !== index))
    }

    const updateOption = (index, value) => {
        setOptions(options.slice(0, index).concat(value).concat(options.slice(index + 1)))
    }

    const createPoll = () => {
        addDoc(collection(db, id+'/Messages/'), {
                uid: user.uid,
                type: 'poll',
                question: question,
                options: options,
                sentAt: Timestamp.now()
        })
    }
    return(
        <div className="mx-4">
            <div>
                <span>Question:</span>
                <Input aria-label="question" value={question} onChange={(e)=>setQuestion(e.target.value)} clearable></Input>
            </div>
            {[...Array(optionsCount)].map((e, i) => {
                return(
                    <div className="group">
                        <span className="hidden group-hover:inline">
                            <FontAwesomeIcon  icon={faXmark} onClick={()=>removeOption(i)}/>
                        </span>
                        <span>Option {i+1}:</span>
                        <Input aria-label="inputOption" value={options[i]} onChange={(e)=>updateOption(i, e.target.value)} clearable></Input>
                    </div>
                )
            })}
            <Button onPress={()=>{
                setOptionsCount(optionsCount+1)
                setOptions(options.concat(''))
            }} icon={<FontAwesomeIcon icon={faSquarePlus}/>}/>
            <Button onPress={createPoll} className="bg-sky-500">Create</Button>
        </div>
    )
}