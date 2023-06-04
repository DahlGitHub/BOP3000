import React from 'react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  blue,
  green,
} from '@nextui-org/react';

import Link from 'next/link'
import {useState, useEffect} from "react";
import { logInWithEmailAndPassword, app } from '../../firebase-config/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { color } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import TermsModal from './TermsModal';



export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [provider, setProvider] = useState("");

    function handleTermsModalOpen () {
        setIsTermsModalOpen(true);
    }

    function handleTermsModalClose () {
        setIsTermsModalOpen(false);
    }

    const setTerms = (provider: string) => {
        setProvider(provider);
        handleTermsModalOpen();
    }

    useEffect(() => {
        if (loading) {
        // maybe trigger a loading screen
        return;
        }
        if (user) router.push("./dashboard");
    }, [user, loading, router]);

    

    return (
        <div>
            <TermsModal
                isOpen={isTermsModalOpen}
                onClose={handleTermsModalClose}
                provider={provider} email={undefined} name={undefined} password={undefined}            />
            <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }}>
                <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
                    <Text
                        size={24}
                        weight="bold"
                        css={{
                        as: 'center',
                        mb: '20px',
                        }}
                    >
                        Login
                    </Text>
                    <Input
                        name='emailInput'
                        id='emailInput'
                        aria-label="Email input"
                        onChange={e => { setEmail(e.currentTarget.value); }}
                        clearable
                        bordered            
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        contentLeft={<FontAwesomeIcon className='pr-2' icon={faEnvelope}/>}
                    />
                    <Spacer y={1} />
                    <Input
                        name='passwordInput'
                        id='passwordInput'
                        aria-label="password input"
                        type={"password"}
                        onChange={e => { setPassword(e.currentTarget.value); }}
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        contentLeft={<FontAwesomeIcon className='pr-2' icon={faKey}/>}
                        css={{ mb: '6px' }}
                    />
                    <div className='flex justify-evenly'>
                        <Link href="/reset" className='m-3'>Forgotten password?</Link>
                    </div>
                    <button 
                        className="inline-flex items-center justify-center px-5 py-3 my-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        onClick={() => logInWithEmailAndPassword(email, password)}>
                            Login
                    </button>
                    
                    <Link href="/register" className='inline-flex my-3 items-center justify-center px-5 py-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>Not registered yet? <br/> Click here to register a new account.</Link>
                    <button
                        className="inline-flex items-center justify-center px-5 py-3 my-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        onClick={() => setTerms("Google")}>
                        <img width={30} src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'/>
                        
                        Login with Google
                    </button>
                    
                    
                </Card>
            </Container>
        </div>
    );
}
