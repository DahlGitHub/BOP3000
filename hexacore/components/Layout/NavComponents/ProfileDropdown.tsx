import React, { Fragment } from "react";
import { Navbar, Dropdown, Text, Avatar, Button } from "@nextui-org/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, db, storage } from '../../../firebase';
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarPicture from "../../AvatarPicture";

export default () => {
    
    const router = useRouter()
    const [user, loading] = useAuthState(auth);
    const [fileUrl, setFileUrl] = React.useState(null);
    const userID = user?.uid.toString();
    
    const setLogMessage = () => {
        if(user){
            return 'Log out'
        } else{
            return 'Login'
        }
    }
    if(user){
        return (
            <Navbar.Content>
                <Dropdown>
                    <Dropdown.Trigger>
                        <Navbar.Item>
                            <Avatar
                                bordered
                                as="button"
                                size="md"
                                src={user.photoURL}
                                />
                        </Navbar.Item>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                    aria-label="User menu actions"
                    color="secondary"
                    onAction={ (action) => {
                        switch(action){
                            case 'profile': {
                                router.push('../dashboard/settings')
                            }
                        }
                    }}
                    >
                        
                        <Dropdown.Item key="profile" css={{ height: "$18" }}>
                            <Text b color="inherit" css={{ d: "flex" }}>
                            Profile
                            </Text>
                            <Text b color="inherit" css={{ d: "flex" }}>
                            <p>
                                {auth.currentUser? auth.currentUser?.email.toString() : "None"}
                            </p>
                            </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key="Dashbord" withDivider>
                            <Link href='/login'className='w-full h-full block' >Dashboard</Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" withDivider color="error">
                            <Link href='../' onClick={logout} className='w-full h-full block' >{setLogMessage()}</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        )
    } else{
        return(
            <Navbar.Content>
                <Link href='../login' className="bg-blue-600 text-white p-2">
                    <span>Sign in</span>
                    {/*<FontAwesomeIcon icon={faSignIn}/>*/}
                </Link>
                <Link href='../register' className="bg-blue-600 text-white p-2">
                    <span>Sign up</span>
                </Link>
            </Navbar.Content>
        )
    }
    
}

