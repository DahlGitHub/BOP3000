import Link from 'next/link'
import Layout from '../app/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

library.add(fas, faCalendar)

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1 className="text-3xl font-bold underline">About</h1>
    <p>This is the about page</p>
    <FontAwesomeIcon icon={faCalendar} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)

export default AboutPage
