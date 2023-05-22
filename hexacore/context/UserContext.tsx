import { useContext, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config/firebase";

export const UserContext = createContext(null)