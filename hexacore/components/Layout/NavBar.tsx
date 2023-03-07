import type { NextPage } from 'next'
import { Container, Navbar, Dropdown, Button, Text, Avatar } from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/images/hexacore.png';
import ProfileDropdown  from './NavComponents/ProfileDropdown'
import ResourcesDropdown from './NavComponents/ResourcesDropdown';
import ProductDropdown from './NavComponents/ProductDropdown';



const NavBar: NextPage = () => {
    const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "Log Out",
    ];
return (

    <Navbar 
    disableShadow
    variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Content hideIn="xs" variant="underline">
        <Link href="./">
          <Navbar.Brand>
          <Image src={Logo} alt="Hexacore" width={35} height={35} />
              <Text hideIn="xs">
                  Hexacore
              </Text>
          </Navbar.Brand>
        </Link>
          <ProductDropdown/>
          <ResourcesDropdown/>
          <Link href="#">
              Customers
          </Link>
          <Link href="/about">
            Pricing
          </Link> 
      </Navbar.Content>
      <ProfileDropdown/>
      {/* hva gjør denne navbar collapsen??? */}
      <Navbar.Collapse disableAnimation>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="warning"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>

)
}

export default NavBar