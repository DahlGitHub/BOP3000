import Link from 'next/link'
import Layout from '../app/Layout'
import FrontPage from '../components/FrontPage'
import { auth } from '../firebase'

const IndexPage = () => (

  <Layout title="Home | Next.js + TypeScript Example">
    {console.log(auth.currentUser != null)}
    <FrontPage />
  </Layout>
)

export default IndexPage
