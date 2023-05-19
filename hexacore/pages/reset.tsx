import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset, app } from "../firebase";
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
                                contentLeft={<FontAwesomeIcon className='pr-2' icon="envelope" />}
                            />
                            <Spacer y={1} />
                            <Row>
                                <Link href="/login">Return to login page.</Link>
                            </Row>    
                            <Spacer y={1} />
                            <button 
                                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900" 
                                onClick={() => sendPasswordReset(email) && router.push("/login")}>
                                    Send password reset to my email
                            </button>
                        </Card>
                    </Container>
        </div>
    );
}
export default Reset;