import React, { ReactNode } from 'react'
import NavBar from './NavBar'
import HeadPage from './HeadPage'


type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Hexacore' }: Props) => (
  <div className='min-h-screen'>
    <HeadPage/>
    <header>
      <NavBar/>
    </header>
    {children}
  </div>
)

export default Layout