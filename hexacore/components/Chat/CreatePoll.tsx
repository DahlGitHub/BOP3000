import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/react"
import { useContext, useState } from "react"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase-config/firebase"
import { UserContext } from "../../context/UserContext"


export default ({id, setSelectedButton}) => {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(Array(2).fill(""))
    const {user} = useContext(UserContext)
    const [output, setOutput] = useState('')

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
        let filledOptions = options.filter((option) => option !== '')
        let outputStack = "";
        if(question.length === 0) {
            outputStack = "Please enter a question"
        }
        if(filledOptions.length > 1 && question !== '') {
        addDoc(collection(db, id+'/Messages/'), {
                uid: user.uid,
                type: 'poll',
                question: question,
                options: filledOptions,
                votes: [],
                sentAt: Timestamp.now()
        })
        setOptions(Array(2).fill(""))
        setQuestion('')
        } else {
            setOutput(outputStack.length > 0 ? outputStack +  " and 2 options." : "Please enter at least 2 options.")
        }
        setSelectedButton('Message')
    }
    return(
        <div className="mx-4">
            <div className="flex-inline mb-3">
                <label htmlFor="question" className="text-xs text-navy-700 dark:text-white font-bold">Question:</label>
                <input aria-label="question" placeholder="Your question" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={question} onChange={(e)=>setQuestion(e.target.value)}></input>
                
            </div>
            <label htmlFor="option" className="text-xs text-navy-700 dark:text-white font-bold">Options:</label>
            {options.map((option, i)=>{
                return(
                    <div className="flex space-x-2">
                        <input aria-label="option" placeholder={"Option "+(i+1)} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                        value={option} onChange={(e)=>updateOption(i, e.target.value)}></input>
                        <button className="mt-2 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" onClick={()=>removeOption(i)}><FontAwesomeIcon icon={faXmark}/></button>
                    </div>
                )
            })
            }
            <button className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" onClick={()=>{
                setOptions([...options, ""])
            }}><FontAwesomeIcon icon={faSquarePlus}/><span className="text-xs mx-2 text-navy-700 dark:text-white">Add option</span></button>
            <div>
                <Button onPress={createPoll} className="bg-sky-500 inline">Create</Button> 
                <span className="text-xs mx-2 text-navy-700 dark:text-white inline">{output}</span>
            </div>
            
        </div>
    )
}