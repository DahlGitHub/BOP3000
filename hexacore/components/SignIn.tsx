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

  
export default function SignIn() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('emailInput'),
            password: data.get('passwordInput'),
        });
        
        try {
            await auth.signInWithEmailAndPassword(
                data.get('emailInput').toString(),
                data.get('passwordInput').toString()
            );
        } catch (error) {
            console.error(error);
        }
    };
        
    const signOut = async () => {
    await auth.signOut();

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
                    name='emailInput'
                    id='emailInput'
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
                    <Text size={14}>Forgot password?</Text>
                </Row>
                <Spacer y={1} />
                <Row>
                    <Link href="/register">Not registered yet? Click here to register a new account.</Link> |{' '}
                </Row>
                <Spacer y={1} />
                <Button onClick={SignIn}>Sign in</Button>
                </Card>
            </Container>
        </div>
    );
}
