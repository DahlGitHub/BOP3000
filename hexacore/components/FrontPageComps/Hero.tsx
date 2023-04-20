import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './../useMediaQuery.js'
import Link from "next/link.js";


const Hero = () => {
  const isMd = useMediaQuery(960);


  return (

    <div className="relative isolate px-6 lg:px-8">
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-6xl">Teamwork makes the dream work</h1>
        <p className="mt-6 text-lg leading-8 text-gray-400">Hexacore's wonderfull solution to teamwork and organization</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/dashboard" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started!</Link>
          <Link href="/service" className="text-sm font-semibold leading-6 text-gray-400">Learn more<span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Hero
