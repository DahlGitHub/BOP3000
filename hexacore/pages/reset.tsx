import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset, app } from "../firebase";
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { LoginMail } from '../components/LoginMail';
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


function Reset() {

    const auth = getAuth(app);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="reset">
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
                                Reset password
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
                            <Row>
                                <Link href="/login">Return to login page.</Link>
                            </Row>    
                            <Spacer y={1} />
                            <Button onPress={() => sendPasswordReset(email) && router.push("/login")}>Send password reset to my email</Button>
                        </Card>
                    </Container>
        </div>
    );
}
export default Reset;