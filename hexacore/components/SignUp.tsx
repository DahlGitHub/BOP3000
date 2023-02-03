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
import { LoginMail } from '../components/LoginMail';
import { LoginPassword } from '../components/LoginPassword';
import Link from 'next/link';
import {useState, useEffect} from "react";
import {auth, registerWithEmailAndPassword, signInWithGoogle, app} from "../firebase";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    
    

    const register = () => {
        if (!firstName) alert("Please enter name");
        registerWithEmailAndPassword(firstName, lastName, email, password);
      };
      useEffect(() => {
        if (loading) return;
        //if (user) router.push('/login');
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
                        name='firstNameInput'
                        id='firstNameInput'
                        aria-label="First name input"
                        type={"text"}
                        onChange={e => { setFirstName(e.currentTarget.value); }}
                        clearable
                        bordered            
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="First name"
                        contentLeft={<LoginMail fill="currentColor" size={undefined} height={undefined} width={undefined} />}
                    />
                    <Spacer y={1} />
                    <Input
                        name='lastNameInput'
                        id='lastNameInput'
                        aria-label="Last name input"
                        type={"text"}
                        onChange={e => { setLastName(e.currentTarget.value); }}
                        clearable
                        bordered            
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Last name"
                        contentLeft={<LoginMail fill="currentColor" size={undefined} height={undefined} width={undefined} />}
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
                        contentLeft={<LoginMail fill="currentColor" size={undefined} height={undefined} width={undefined} />}
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
                        contentLeft={<LoginPassword fill="currentColor" size={undefined} height={undefined} width={undefined} />}
                        css={{ mb: '6px' }}
                    />
                    <Row justify="space-between">
                    <Link href="/login">Already have an account?</Link> |{' '}
                    </Row>
                    <Spacer y={1} />
                    <Button onPress={register}>Sign up</Button>
                </Card>
            </Container>
        </div>
    );
}