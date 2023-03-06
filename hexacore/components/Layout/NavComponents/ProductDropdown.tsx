import { Navbar, Dropdown } from "@nextui-org/react";

export default () => {

    return(
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
    )
}