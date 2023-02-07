import type { NextPage } from 'next'
import { Container, Navbar, Text, Button} from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/images/hexacore.png';

const NavBar: NextPage = () => {
    return (
        <Container>
            <Navbar isCompact variant={"static"}>
                <Navbar.Brand>
                    <Image src={Logo} alt="Hexacore" width={35} height={35}/>
                    <Text b color="inherit">
                        Hexacore
                    </Text>

                </Navbar.Brand >
                <Navbar.Content>
                    <Navbar.Item><Link href="/">Home</Link></Navbar.Item>
                    <Navbar.Item><Link href="/about">About</Link></Navbar.Item>
                    <Navbar.Item><Link href="/login">Login</Link></Navbar.Item>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Item>
                        <Button auto flat href="#">
                            Hi
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </Container>
    )
}
  
  export default NavBar
