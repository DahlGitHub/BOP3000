import { Button, Progress } from "@nextui-org/react"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useImmer } from "use-immer"




export default ({index, pollData, id})=>{
    const {user} = useContext(UserContext)
    const [voted, setVoted] = useImmer(false)
    const [numberOfVotes, setNumberOfVotes] = useImmer(0)

    const [poll, setPoll] = useState(pollData.message)
    useEffect(()=>{
        let votes = 0
        poll.options.forEach((option)=>{
            votes += option.votes.length
        })
        setNumberOfVotes(votes)
        if(poll.options.find(option => option.votes.includes(user.uid))){
            setVoted(true)
        }
    }, [poll])

    const deletePoll = async () => {
        await deleteDoc(doc(db, id+'/Messages/', pollData.messageId))
    }
    const vote = (option) => {
        const newOptions = poll.options.map((opt)=>{
            if(opt.option === option.option){
                return {option: opt.option, votes: opt.votes.concat(user.uid)}
            }
            return opt
        })
        updateDoc(doc(db, id+'/Messages/', pollData.messageId), {
            options: newOptions
        })
        setPoll({...poll, options: newOptions})
        setVoted(true)
    }
    return(
        <div key={index} className="col-start-6 col-end-8 rounded border-2 border-black border-solid">
            <span>{poll.question}</span>
            <button onClick={deletePoll}>Delete</button>
            {poll.options.map((option, i)=>{
                if(voted){
                    return(
                        <div key={"poll"+ i} className="flex">
                            <Progress className="" value={(option.votes.length/numberOfVotes)*100}></Progress>
                            <button>{option.votes.length}</button>
                        </div>
                    )
                }else{
                    return(
                        <div key={"vote"+i} className="flex">
                            <button onClick={()=>vote(option)}>{option.option}</button>
                        </div>
                    )
                }
            })
            }
        </div>
    )

}