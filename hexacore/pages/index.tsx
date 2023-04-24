import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import FrontPage from '../components/FrontPageComps/FrontPage'
import { auth } from '../firebase'

const IndexPage = () => (

  <Layout title="Home | Next.js + TypeScript Example">
    <FrontPage />
  </Layout>
)

export default IndexPage
