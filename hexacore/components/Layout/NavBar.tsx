import type { NextPage } from 'next'
import { Text } from "@nextui-org/react";
import Link from 'next/link';
import ProfileDropdown  from './NavComponents/ProfileDropdown'


const NavBar: NextPage = () => {

  return (
    <nav className="dark:bg-gray-800 flex justify-between items-center p-2.5">
      <div className="flex items-center">
        <Link href="./" className='flex'>
          <div className="dark:hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/hexacore.png?alt=media&token=0dc0577b-2ff1-4ff5-84b3-2e1896af25e0"
              alt="Hexacore Logo"
              className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"
            />
          </div>
          <div className="hidden dark:block">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/darkmode%20logo.png?alt=media&token=8aacc126-c622-42c9-8c29-b964897dfc90"
              alt="Hexacore Logo"
              className="ml-2 cursor-pointer w-10 h-10 transform transition duration-500 hover:scale-110"
            />
          </div>
          <Text hideIn="xs" className="ml-2 font-semibold uppercase tracking-wide">
            <span className='dark:text-white'>Hexacore</span>
          </Text>
        </Link>
      </div>
      <ProfileDropdown />
    </nav>
  );
}

export default NavBar