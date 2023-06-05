import React from 'react';
import {
  Card,
  Spacer,
  Text,
  Input,
  Row,
  Container,
} from '@nextui-org/react';
import Link from 'next/link';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TermsModal from './TermsModal';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [provider, setProvider] = useState("");
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function handleTermsModalOpen () {
        setIsTermsModalOpen(true);
    }

    function handleTermsModalClose () {
        setIsTermsModalOpen(false);
    }

    const setTerms = (provider: string) => {
        if(provider === 'Local'){
            if(!email.match(mailformat)){
                return alert("You have entered an invalid email address!");
            } else if(name === ""){
                return alert("Please enter your name");
            }
            if(password === passwordConfirm){
                setProvider(provider);
                handleTermsModalOpen();
            } else{
                alert("Passwords don't match");
            }
        } else{
            setProvider(provider);
            handleTermsModalOpen();
        }
        
    }

    return (
        <div>
            <TermsModal isOpen={isTermsModalOpen} onClose={handleTermsModalClose} email={email} name={name} password={password} provider={provider}/>
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
                        Register new account
                    </Text>
                    <Input
                        name='nameInput'
                        id='nameInput'
                        aria-label="First name input"
                        type={"text"}
                        onChange={e => { setName(e.currentTarget.value); }}
                        clearable
                        bordered            
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Name"
                        contentLeft={<FontAwesomeIcon icon="user" />}
                    />
                    <Spacer y={1} />
                    <Input
                        name='emailRegisterInput'
                        id='emailRegisterInput'
                        type={"email"}
                        aria-label="Email input"
                        onChange={e => { setEmail(e.currentTarget.value); }}
                        clearable
                        bordered            
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        contentLeft={<FontAwesomeIcon className='pr-2' icon="envelope" />}
                    />
                    <Spacer y={1} />
                    <Input
                        name='passwordRegisterInput'
                        id='passwordRegisterInput'
                        type={"password"}
                        aria-label="Password input"
                        onChange={e => { setPassword(e.currentTarget.value); }}
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        contentLeft={<FontAwesomeIcon className='pr-2' icon="key" />}
                        css={{ mb: '6px' }}
                    />
                    <Spacer y={1} />
                    <Input
                        name='passwordConfirmInput'
                        id='passwordConfirmInput'
                        type={"password"}
                        aria-label="Password confirm input"
                        onChange={e => { setPasswordConfirm(e.currentTarget.value); }}
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Confirm Password"
                        contentLeft={<FontAwesomeIcon className='pr-2' icon="key" />}
                        css={{ mb: '6px' }}
                    />
                    <Row justify="space-between">
                        <Link href="/login">Already have an account?</Link>
                    </Row>
                    <Spacer y={1} />
                        <button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900" 
                            onClick={() => setTerms("Local")}>
                                Sign up
                        </button>
                    <Spacer y={1} />
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