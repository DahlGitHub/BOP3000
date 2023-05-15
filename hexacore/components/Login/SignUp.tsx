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
} from '@nextui-org/react';
import Link from 'next/link';
import {useState, useEffect} from "react";
import {auth, registerWithEmailAndPassword, app} from "../../firebase";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    
    

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
      };
      useEffect(() => {
        if (loading) return;
        if (user) router.push('./dashboard');
      }, [user, loading, router]);

    return (
        <div>
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
                    <Row justify="space-between">
                        <Link href="/login">Already have an account?</Link>
                    </Row>
                    <Spacer y={1} />
                    <button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900" onClick={register}>Sign up</button>
                </Card>
            </Container>
        </div>
    );
}