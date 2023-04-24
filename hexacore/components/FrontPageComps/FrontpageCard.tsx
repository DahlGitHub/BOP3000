import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";

const FrontpageCard = () => {

    return(
        <Container lg>
            <div className="max-w-screen md:w-3/4 mx-auto p-10">
                <div className="flex flex-row space-y-2 items-center justify-center h-full py-4 dark:bg-gray-800 bg-gray-200 rounded-xl space-x-10">
                    <div className="w-2/3">
                    <p className="w-full text-2xl font-semibold dark:text-white m-5">Organize your teams</p>
                    <p className="w-full pb-8 text-sm tracking-wide leading-tight dark:text-white m-5">With our clear and easy to understand layout, you can easily make a team with the team-members you want. Its easy to share documents and communicate with other members</p>
                    </div>
                        <div className="w-auto h- p-5">
                            <img className="flex-1 h-full rounded-lg " src="https://via.placeholder.com/400x400" />
                        </div>
                </div>
            </div>

            <div className="max-w-screen md:w-3/4 mx-auto p-10">
                <div className="flex flex-row space-y-2 items-center justify-center h-full py-4 dark:bg-gray-800 bg-gray-200 rounded-xl space-x-10">
                    <div className="w-auto h- p-5">
                            <img className="flex-1 h-full rounded-lg" src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2Fkanban.png?alt=media&token=f651983e-8857-4de0-aae2-8f991713d2a2" />
                        </div>
                    <div className="w-2/3 p-5">
                    <p className="w-full text-2xl font-semibold dark:text-white ">Keep track with the Kanban board</p>
                    <p className="w-full pb-8 text-sm tracking-wide leading-tight dark:text-white ">The card layouts can vary to support the types of content they contain.</p>
                    </div>
                        
                </div>
            </div>

            <div className="max-w-screen md:w-3/4 mx-auto p-10">
                <div className="flex flex-row space-y-2 items-center justify-center h-full py-4 dark:bg-gray-800 bg-gray-200 rounded-xl space-x-10">
                    <div className="w-2/3">
                    <p className="w-full text-2xl font-semibold dark:text-white m-5">Chat with co-workers and friends</p>
                    <p className="w-full pb-8 text-sm tracking-wide leading-tight dark:text-white m-5">The card layouts can vary to support the types of content they contain.</p>
                    </div>
                        <div className="w-auto h- p-5">
                            <img className="flex-1 h-full rounded-lg" src="https://via.placeholder.com/400x400" alt=""/>
                        </div>
                </div>
            </div>
        </Container>
    );
}
export default FrontpageCard