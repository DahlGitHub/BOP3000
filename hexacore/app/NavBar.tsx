import type { NextPage } from 'next'
import { Container, Navbar, Dropdown, Button, Text, Avatar } from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/images/hexacore.png';

const NavBar: NextPage = () => {
    const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "Log Out",
    ];
return (
<Container>
    <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand>
            <Image src={Logo} alt="Hexacore" width={35} height={35} />
            <Text b color="inherit" hideIn="xs">
                Hexacore
            </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline">
            
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button auto
                    
                    css={{
                    px: 0,
                    dflex: "center",
                    
                }} ripple={false}>
                        Features
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu aria-label="ACME features" css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
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
                        Autoscaling
                    </Dropdown.Item>
                    <Dropdown.Item key="usage_metrics" showFullDescription
                        description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.">
                        Usage Metrics
                    </Dropdown.Item>
                    <Dropdown.Item key="production_ready" showFullDescription
                        description="ACME runs on ACME, join us and others serving requests at web scale.">
                        Production Ready
                    </Dropdown.Item>
                    <Dropdown.Item key="99_uptime" showFullDescription
                        description="Applications stay on the grid with high availability and high uptime guarantees.">
                        +99% Uptime
                    </Dropdown.Item>
                    <Dropdown.Item key="supreme_support" showFullDescription
                        description="Overcome any challenge with a supporting team ready to respond.">
                        +Supreme Support
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Link href="#">
                Customers
            </Link>
            <Link href="/about">About</Link>
            <Link href="#">Company</Link>
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
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
</Container>
)
}

export default NavBar