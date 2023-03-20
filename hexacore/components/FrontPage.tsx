import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'
import Hero from "./FrontPageComps/Hero";
import FrontpageCard from "./FrontPageComps/FrontpageCard";
import FrontpagePoints from "./FrontPageComps/FrontpagePoints";




const FrontPage = () => {
  const isMd = useMediaQuery(960);


  return (
    <div className="bg-white dark:bg-gray-900">
        <Hero/>
        <FrontpagePoints/>
        <FrontpageCard/>
        <FrontpageCard/>
        <FrontpageCard/>
    </div>
  );
}

export default FrontPage
