import type { NextPage } from 'next'
import { Container, Navbar, Dropdown, Button, Text, Avatar } from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/images/hexacore.png';
import { auth, logout } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button auto
                    light
                    css={{
                    px: 0,
                    dflex: "center",
                    
                }} ripple={false}>
                        Product
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu aria-label="ACME features" css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}>
                    <Dropdown.Item key="autoscaling" showFullDescription
                        description="ACME scales apps to meet user demand, automagically, based on load.">
                        Why Hexacore
                    </Dropdown.Item>
                    <Dropdown.Item key="usage_metrics" showFullDescription
                        description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.">
                        Usage Metrics
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button auto
                    light
                    css={{
                    px: 0,
                    dflex: "center",
                    
                }} ripple={false}>
                        Resources
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu aria-label="ACME features" css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                   
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}>
                    <Dropdown.Item key="autoscaling" showFullDescription
                    icon={<FontAwesomeIcon icon='book'/>}
                        description="ACME scales apps to meet user demand, automagically, based on load.">
                        Blog
                    </Dropdown.Item>
                    <Dropdown.Item key="usage_metrics" showFullDescription
                    icon={<FontAwesomeIcon icon='user-group' className='fa-xl text-red-600'/>}
                        description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.">
                        About Us
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Link href="#">
                Customers
            </Link>
            <Link href="/about">
              Pricing
            </Link>
            
        </Navbar.Content>
        <Navbar.Content>
            <Dropdown>
            <Dropdown.Trigger>
            <Navbar.Item>
            <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
            </Navbar.Item>
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  <p>
                    {auth.currentUser? auth.currentUser?.email.toString() : "None"}
                  </p>
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error">
                  {!auth.currentUser?  
                    <Link href="/login">Login</Link>
                  
                  :
                  
                    <Link href="/login" onClick={logout}>Logout</Link>
                  }
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
    <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

        </Navbar.Content>
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