import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'
import Hero from "./FrontPageComps/Hero";
import FrontpageCard from "./FrontPageComps/FrontpageCard";




const FrontPage = () => {
  const isMd = useMediaQuery(960);


  return (
    <div>
        <Hero/>
        <FrontpageCard/>
    </div>
  );
}

export default FrontPage
