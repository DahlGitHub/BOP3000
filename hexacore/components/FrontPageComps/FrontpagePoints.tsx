import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {faLightbulb,faMedal,faPoll} from "@fortawesome/free-solid-svg-icons";
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="p-3 w-12 h-12 shadow-lg rounded-full bg-gray-800 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={faPoll} color='white'></FontAwesomeIcon>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-gray-800 dark:text-white">
                Effective work flow
                </h5>
                <p className="mt-2 mb-4 text-gray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="p-3 w-12 h-12 shadow-lg rounded-full bg-gray-800 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={faLightbulb} color='white'></FontAwesomeIcon>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-gray-800 dark:text-white">Time is money</h5>
                <p className="mt-2 mb-4 text-gray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                </p>
            </div>
          </div>
          </section>
        </Container>
    );
}
export default FrontpageCard