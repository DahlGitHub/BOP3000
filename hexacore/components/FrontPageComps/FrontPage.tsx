import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from '../useMediaQuery.js'
import Hero from "./Hero";
import FrontpageCard from "./FrontpageCard";
import FrontpagePoints from "./FrontpagePoints";
import Footer from "../Layout/Footer";




const FrontPage = () => {
  const isMd = useMediaQuery(960);


  return (
    <div className="bg-white dark:bg-gray-900">
        <Hero/>
        <FrontpagePoints/>
        <FrontpageCard/>
        <Footer/>
    </div>
  );
}

export default FrontPage
