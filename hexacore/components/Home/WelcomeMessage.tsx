import { useAuthState } from "react-firebase-hooks/auth";
import { faUser } from "@fortawesome/free-regular-svg-icons";


const WelcomeMessage = ({name}) => {
    return (
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Hi {name},</h2>
            <h2 className="mb-4 text-4xl tracking-tight text-gray-900 dark:text-white">Welcome back!</h2>
            <p className="mb-4">This is the homepage and its designed to give some basic information about the application. Let's make something great together!</p>
        </div>
    )
}

export default WelcomeMessage