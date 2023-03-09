import { Navbar, Dropdown } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => {
    return (
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
    )
}