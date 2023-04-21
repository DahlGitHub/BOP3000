import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Input } from "@nextui-org/react"
import { useContext, useState } from "react"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { UserContext } from "../../context/UserContext"


export default ({id}) => {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(Array(2).fill(""))
    const {user} = useContext(UserContext)

    const removeOption = (index) => {
        setOptions(options.filter((option, i) => i !== index))
    }

    const updateOption = (index, value) => {
        setOptions(options.map((option, i) => {
            if(i === index) {
                return value
            }
            return option
        }))
    }

    const createPoll = () => {
        addDoc(collection(db, id+'/Messages/'), {
                uid: user.uid,
                type: 'poll',
                question: question,
                options: options,
                votes: [],
                sentAt: Timestamp.now()
        })
    }
    return(
        <div className="mx-4">
            <div>
                <span>Question:</span>
                <Input aria-label="question" value={question} onChange={(e)=>setQuestion(e.target.value)} clearable></Input>
            </div>
            {options.map((option, i)=>{
                return(
                    <div className="flex">
                        <span>Option {i+1}:</span>
                        <Input aria-label="option" value={option.option} onChange={(e)=>updateOption(i, e.target.value)} clearable></Input>
                        <Button onPress={()=>removeOption(i)} icon={<FontAwesomeIcon icon={faXmark}/>}/>
                    </div>
                )
            })
            }
            <Button onPress={()=>{
                setOptions(options.concat({option: "", votes: 0}))
            }} icon={<FontAwesomeIcon icon={faSquarePlus}/>}/>
            <Button onPress={createPoll} className="bg-sky-500">Create</Button>
        </div>
    )
}