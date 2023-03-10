import React, { Fragment } from "react";
import { Navbar, Dropdown, Text, Avatar } from "@nextui-org/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, db, storage } from '../../../firebase';
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/.free-solid-svg-icons-mY0uWkAd";

export default () => {
    const iconFont = <FontAwesomeIcon icon={faRightToBracket} />
    const router = useRouter()
    const [user, loading] = useAuthState(auth);
    const [fileUrl, setFileUrl] = React.useState(null);
    const userID = user?.uid.toString();
    const profilePictureUrl = `https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2F${userID}?alt=media&token=6eb830e3-d840-4e44-80d6-347ecda90fd7 `;
    const setLogMessage = () => {
        if(user){
            return 'Log out'
        } else{
            return 'Login'
        }
    }
    const getPicture = async (e) => {
        const docRef = doc(db, "users", auth.currentUser?.uid.toString(), "picture");
        const docSnap = await getDoc(docRef);

    
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
                                color="secondary"
                                size="md"
                                src={profilePictureUrl}
                                />
                        </Navbar.Item>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                    aria-label="User menu actions"
                    color="secondary"
                    onAction={ (action) => {
                        switch(action){
                            case 'profile': {
                                router.push('/settings')
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
                            <Link href='/dashboard'className='w-full h-full block' >Dashboard</Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" withDivider color="error">
                            <Link href='./' onClick={logout} className='w-full h-full block' >{setLogMessage()}</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* dark mode som ikke funker */}
        <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </button>
            </Navbar.Content>
        )
    } else{
        return(
            <Navbar.Content>
                <Dropdown>
                    <Dropdown.Trigger>     
                        <Navbar.Item onClick={()=>{
                            router.push('/login')
                        }}>
                            <Avatar
                                bordered
                                as="button"
                                color="secondary"
                                size="md"
                                
                                />
                        </Navbar.Item>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                    aria-label="User menu actions"
                    color="secondary"
                    onAction={(action) => {
                        switch(action){
                            case 'login': {
                                router.push('/login')
                            }
                        }
                    }}
                    >
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        )
    }
    
}

