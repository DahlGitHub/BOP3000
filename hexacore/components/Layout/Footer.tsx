import type { NextPage } from 'next'
import {Container, Text } from "@nextui-org/react";


const Footer: NextPage = () => {
return (

<Container className='sticky top-[100vh]'>

    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0">
                <img src="https://cdn.discordapp.com/attachments/1062428707639275650/1072126654366887986/Component_5.png"
                    className="h-8 mr-3" alt="Flowbite Logo" />
                <Text className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hexacore</Text>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Hexacore. All Rights
            Reserved.
        </span>
    </footer>

</Container>

)
}

export default Footer