import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {faLightbulb,faMedal,faPoll,faBolt,faBusinessTime,faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const FrontpageCard = () => {

    return(
        <Container lg>
            <section className="pb-20 relative block">
                <div className="flex flex-wrap mt-12 justify-center">
                    <div className="w-full lg:w-3/12 px-4 text-center">
                        <div className="text-red p-3 w-12 h-12 shadow-lg rounded-full bg-gray-800 inline-flex items-center justify-center">
                            <FontAwesomeIcon icon={faMedal} color='white'></FontAwesomeIcon>
                        </div>
            <h6 className="text-xl mt-5 font-semibold text-gray-800 dark:text-white">
                Excelent Solution
            </h6>
                <p className="mt-2 mb-4 text-gray-400">
                Our excelent product uses state of the art technologies and clever solutions to give the best possible experience to the user
                </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="p-3 w-12 h-12 shadow-lg rounded-full bg-gray-800 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={faBriefcase} color='white'></FontAwesomeIcon>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-gray-800 dark:text-white">
                Effective work flow
                </h5>
                <p className="mt-2 mb-4 text-gray-400">
                With Hexacore your team wil definitivly become more efficient and work better as a team all together
                </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="p-3 w-12 h-12 shadow-lg rounded-full bg-gray-800 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={faBolt} color='white'></FontAwesomeIcon>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-gray-800 dark:text-white">Time is money</h5>
                <p className="mt-2 mb-4 text-gray-400">
                Planning and organizing is a time intense task for all teams and organizations. But with Hexacore you will most likely save time and money
                </p>
            </div>
          </div>
          </section>
        </Container>
    );
}
export default FrontpageCard