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
import {auth} from "../firebase";
import Link from 'next/link'
import {useState} from "react"

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('emailInput'),
            password: data.get('passwordInput'),
        });

        try {
            await auth.createUserWithEmailAndPassword(
                email.toString(),
                password.toString()
            );
            console.log("Email " + email)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }}>
                <Card css={{ mw: '420px', p: '20px' }} variant="bordered" children="undefined">
                <Text
                    size={24}
                    weight="bold"
                    css={{
                    as: 'center',
                    mb: '20px',
                    }}
                >
                    NextUI Login
                </Text>
                <Input
                    name='firstNameInput'
                    id='firstNameInput'
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
                    id='emailInput'
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
                    name='emailInput'
                    id='emailInput'
                    type={"email"}
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
                <Link href="/login">Already have an account?</Link> |{' '}
                </Row>
                <Spacer y={1} />
                <Button onPress={handleSubmit}>Sign up</Button>
                </Card>
            </Container>
        </div>
    );
}