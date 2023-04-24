import { Button, Progress } from "@nextui-org/react"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useImmer } from "use-immer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faQuestion, faSquarePollVertical, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle, faCircle, faDotCircle } from "@fortawesome/free-regular-svg-icons"


export default ({index, pollData, id})=>{
    const {user} = useContext(UserContext)
    const [voted, setVoted] = useState(false)
    const [poll, setPoll] = useState(pollData.message)
    const [hoveredIndex, setHoveredIndex] = useState(null);
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

    const [userVoteIndex, setUserVoteIndex] = useState(null)

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
            setUserVoteIndex(poll.options.indexOf(option))
        })
    }

    return (
        <div key={index} className="rounded border-1 border-black border-solid bg-white dark:bg-gray-700 p-2 m-1 my-5">
          <div className="flex justify-between items-center mb-2 pb-1 rounded-t border-b  dark:border-gray-600">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-100">
            <FontAwesomeIcon className="w-5 mx-1" icon={faSquarePollVertical} />{poll.question}
            </span>
            <button onClick={deletePoll} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-xs p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-toggle="defaultModal">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {poll.options.map((option, i) => {
            if (voted) {
                const userVote = poll.votes.find(vote => vote.user === user.uid && vote.option === option);
                const userVotedOption = userVote ? userVote.option : null;
              
                return (
                    <div key={"poll" + i} className="flex my-2">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800 dark:text-gray-100 text-sm">
                            {userVotedOption === option ? (
                              <FontAwesomeIcon className="w-5 mx-1" icon={faCheckCircle} />
                            ) : (
                              <FontAwesomeIcon className="w-5 mx-1 text-xs" icon={faCircle} />
                            )}
                            {option}
                          </span>
                          <div>
                            <span className="px-2 py-1 bg-blue-100 rounded-lg text-xs text-blue-600 font-medium min-w-[46px] text-center">
                              {(votes[i] / poll.votes.length) * 100}%
                            </span>
                            <span className="px-2 py-1 rounded-lg text-xs text-gray-600 font-medium min-w-[46px] text-center">
                              {votes[i]} / {poll.votes.length}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-300 h-1 mt-2">
                          <div className="bg-blue-400 h-1 rounded" style={{ width: `${(votes[i] / poll.votes.length) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={"vote" + i} className="flex mt-2">
                        <button 
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="flex justify-center items-center space-x-2 text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-lg hover:text-blue-700" onClick={() => { vote(option); setUserVoteIndex(i) }}
                        >
                            <FontAwesomeIcon icon={hoveredIndex === i ? faDotCircle : faCircle}/>
                            <span className="text-xs">{option}</span>                      
                        </button>
                    </div>

                  );
            }
          })}
        </div>
      );
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