import type { NextPage } from 'next'
import {Container, Col, Grid, Spacer, Text } from "@nextui-org/react";


const Footer: NextPage = () => {
    return (
        <>
            <Container>
                <Grid.Container>
                    <Grid>
                        <Text>Hi</Text>
                        <Text>Hi</Text>
                    </Grid>
                </Grid.Container>
            </Container>
            <Spacer x={2} />
            <Container>
                <hr/>
                <Grid.Container justify="center">
                    <Grid>
                        
                        <Text>Copyright @ 2023 Hexacore</Text>
                    </Grid>
                </Grid.Container>
            </Container>
        </>    
    )
}
  
  export default Footer
