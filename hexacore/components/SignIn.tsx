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
import Link from 'next/link'
import {useState, useEffect} from "react";
import {auth, logInWithEmailAndPassword, app, signInWithGoogle, signInWithMicrosoft} from "../firebase";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';


  
export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
        if (loading) {
        // maybe trigger a loading screen
        return;
        }
    if (user) console.log("Logged in user " + auth.currentUser.uid.toString());
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
                        contentLeft={<LoginMail fill="currentColor" size={undefined} height={undefined} width={undefined} />}
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
                        contentLeft={<LoginPassword fill="currentColor" size={undefined} height={undefined} width={undefined} />}
                        css={{ mb: '6px' }}
                    />
                    
                    <Row justify="space-between">
                        <Checkbox>
                            <Text size={14}>Remember me</Text>
                        </Checkbox>
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Link href="/register">Not registered yet? Click here to register a new account.</Link>
                    </Row>
                        
                    <Spacer y={1} />
                        <Link href="/reset">Forgotten password?</Link>
                    <Spacer y={1} />
                    <Button  onClick={signInWithGoogle}>
                        <img width={30} src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'></img>Login with Google
                    </Button>
                    <Spacer y={1} />
                    <Button  onClick={signInWithMicrosoft}>
                        <img width={20} src='https://cdn-icons-png.flaticon.com/512/732/732221.png'></img> Login with Microsoft
                    </Button>
                    <Spacer y={1} />
                    <Button onPress={() => logInWithEmailAndPassword(email, password)}>Login</Button>
                </Card>
            </Container>
        </div>
    );
}
