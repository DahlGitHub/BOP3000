import { useContext, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";



export const UserContext = () => {
    const [user, loading] = useAuthState(auth);
    const userContext = createContext(user);
}