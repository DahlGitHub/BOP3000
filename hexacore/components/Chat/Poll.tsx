import { Button, Progress } from "@nextui-org/react"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useImmer } from "use-immer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCircle } from "@fortawesome/free-regular-svg-icons"



export default ({index, pollData, id})=>{
    const {user} = useContext(UserContext)
    const [voted, setVoted] = useState(false)
    const [poll, setPoll] = useState(pollData.message)
    const [votes, setVotes] = useImmer(() => {
        let votes = []
        poll.options.forEach((option, i)=>{
            votes[i] = 0
        })
        poll.votes.forEach((vote)=>{
            votes[poll.options.indexOf(vote.option)]++
        })
        return votes
    })

    useEffect(() => {
        if(poll.votes.find(votes => votes.user.includes(user.uid))){
            setVoted(true)
        }
    }, [votes])

    useEffect(() => {
        setPoll(pollData.message)
        setVotes(draft => {
            draft.forEach((vote, i) => {
                draft[i] = pollData.message.votes.filter(vote => vote.option === pollData.message.options[i]).length;
            })
        })
    }, [pollData])

    const deletePoll = async () => {
        await deleteDoc(doc(db, id+'/Messages/', pollData.messageId))
    }
    const vote = (option) => {
        const vote = {
            user: user.uid,
            option: option
        }
        updateDoc(doc(db, id+'/Messages/', pollData.messageId), {
            votes: arrayUnion(vote)
        }).then(() => {
            setVoted(true)
        })
        updateDoc(doc(db, id+'/Messages/', pollData.messageId), {
            votes: arrayUnion(vote)
        }).then(() => {
            setVoted(true)
        })
    }

    return(
        <div key={index} className="rounded border-1 border-black border-solid bg-white p-2 m-1">
            <div className="flex justify-between items-center mb-2 pb-1 rounded-t border-b  dark:border-gray-300">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-800">
                    {poll.question}
                </span>
                <button onClick={deletePoll} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-xs p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
            {poll.options.map((option, i)=>{
                if(voted){
                    return(
                        <div key={"poll"+ i} className="flex my-2">
                
                            <Progress status="primary" className="text-xs text-gray-800 p-0.5 leading-none h-5" value={(votes[i]/poll.votes.length)*100}>
                                <div className="w-fullpx-1 flex justify-beteween">
                                    <div className="mx-2 w-full text-start font-semibold">
                                        {option}
                                    </div>
                                    <div className="w-16 text-end font-bold ">
                                        {(votes[i]/poll.votes.length)*100}%
                                    </div>
                                               
                                </div>
                            </Progress>
            
                        </div>
                    )
                }else{
                    return(
                        <div>
                        
                        <div key={"vote"+i} className="flex hover:text-blue-600 mt-2">
                            <button className="flex justify-center items-center space-x-2 text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-lg" onClick={()=>vote(option)}><FontAwesomeIcon className="w-5" icon={faCheck}/><span className="text-xs">{option}</span></button>
                        </div>
                        </div>
                    )
                }
            })
            }
        </div>
    )
}

/*
export default ({index, pollData, id})=>{
    const {user} = useContext(UserContext)
    const [voted, setVoted] = useState(false)
    const [poll, setPoll] = useImmer(pollData.message)
    const [votes, setVotes] = useImmer(poll.votes)

    useEffect(()=>{
        let votes = []
        poll.options.forEach((option, i)=>{
            votes[i] = 0
        })
        poll.votes.forEach((vote)=>{
            votes[poll.options.indexOf(vote.option)]++
        })
        setVotes(votes)
        if(poll.votes.find(votes => votes.user.includes(user.uid))){
            setVoted(true)
        }
    }, [])

    const deletePoll = async () => {
        await deleteDoc(doc(db, id+'/Messages/', pollData.messageId))
    }
    const vote = (option) => {
        const vote = {
            user: user.uid,
            option: option
        }
        updateDoc(doc(db, id+'/Messages/', pollData.messageId), {
            votes: arrayUnion(vote)
        })
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
                            <Progress className="" value={(votes[i]/poll.votes.length)*100}/>
                            <button>{votes[i]}</button>
                        </div>
                    )
                }else{
                    return(
                        <div key={"vote"+i} className="flex">
                            <button onClick={()=>vote(option)}>{option}</button>
                        </div>
                    )
                }
            })
            }
        </div>
    )
}*/