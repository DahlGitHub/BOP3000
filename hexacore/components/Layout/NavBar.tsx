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
          <div className="dark:block">
              <img src={"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/hexacore.png?alt=media&token=0dc0577b-2ff1-4ff5-84b3-2e1896af25e0"} alt="Hexacore Logo"  className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"/>
            </div>
            <div className="dark:hidden">
              <img src={"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/darkmode%20logo.png?alt=media&token=8aacc126-c622-42c9-8c29-b964897dfc90"} alt="Hexacore Logo"  className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"/>
            </div>
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