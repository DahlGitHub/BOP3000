import { Button, Progress } from "@nextui-org/react"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useImmer } from "use-immer"



export default ({index, pollData, id})=>{
    const {user} = useContext(UserContext)
    const [voted, setVoted] = useState(false)
    const [poll, setPoll] = useState(pollData.message)
    const [votes, setVotes] = useImmer(() => {
        console.log(poll.votes)
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
        console.log(poll.votes)
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
        console.log(poll.votes)
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