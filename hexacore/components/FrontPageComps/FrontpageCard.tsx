import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";

const FrontpageCard = () => {

    return(
        <Container lg>
            <div className="max-w-screen md:w-3/4 mx-auto p-10">
                <div className="flex flex-row space-y-2 items-center justify-center h-full py-4 dark:bg-gray-800 bg-gray-200 rounded-xl space-x-10">
                    <div className="w-2/3">
                    <p className="w-full text-2xl font-semibold dark:text-white">We love pixels</p>
                    <p className="w-full pb-8 text-sm tracking-wide leading-tight dark:text-white">The card layouts can vary to support the types of content they contain.</p>
                    </div>
                        <div className="w-auto h-">
                            <img className="flex-1 h-full rounded-lg" src="https://via.placeholder.com/96x136" />
                        </div>
                </div>
            </div>
        </Container>
    );
}
export default FrontpageCard