import {Container, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'

const FrontPage = () => {
  const isMd = useMediaQuery(960);

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$20", $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Container lg>
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} md={6}>
        <MockItem text={isMd ? "1 of 1" : "1 of 2"} />
      </Grid>
      <Grid xs={6} md={6}>
        <MockItem text={isMd ? "1 of 2" : "2 of 2"} />
      </Grid>
      <Grid xs={6} md={3}>
        <MockItem text={isMd ? "2 of 2" : "1 of 3"} />
      </Grid>
      <Grid xs={6} md={3}>
        <MockItem text={isMd ? "1 of 2" : "2 of 3"} />
      </Grid>
      <Grid xs={6} md={3}>
        <MockItem text={isMd ? "2 of 2" : "3 of 3"} />
      </Grid>
    </Grid.Container>
    </Container>
  );
}

export default FrontPage
