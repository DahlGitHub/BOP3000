import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"


const Profile = ({name}) => {

    const router = useRouter();

    return (
        <div className="m-10 border-solid border-2 border-sky-500 rounded dark:text-white">
            <div className="m-5">
                <div>
                    <div className='text-center m-2'>
                        <FontAwesomeIcon icon={faUser}/> 
                    </div>
                    
                    <h2 className=" font-semibold text-center">Congratulations {name}</h2>
                    <p className="mt-2">Your profile is looking great, click the button to view the current progress!</p>
                </div>
                <div className="justify-center">
                    <button type="submit" onClick={() => router.push("/dashboard/settings")} className="mx-40 my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Visit profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile