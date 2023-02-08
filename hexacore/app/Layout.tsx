import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
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
    <Footer/>
  </div>
)

export default Layout
