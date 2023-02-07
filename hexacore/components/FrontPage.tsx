import {Container, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'

const FrontPage = () => {
  const isMd = useMediaQuery(960);


  return (
    <Container lg>
      <Row>
        <Col>
        <Text h1 className="underline">Do more</Text>
        <Text h1>Less work</Text>
        </Col>
      </Row>
    </Container>
  );
}

export default FrontPage
