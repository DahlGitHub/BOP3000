import React from "react";
import { Navbar, Dropdown, Text, Avatar, Button } from "@nextui-org/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from "../../../firebase-config/firebase";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <Link href='../login' className="rounded-md font-semibold bg-indigo-600 text-white px-3.5 py-2">
                    <FontAwesomeIcon icon={faSignIn}/>
                    <span className="text-sm mx-2">Sign in</span>
                </Link>
  
            </Navbar.Content>
        )
    }
    
}

