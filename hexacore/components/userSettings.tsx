import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const UserSettings = () => {
  const isMd = useMediaQuery(960);


  return (
    <Container lg>
      <br/>
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">User Settings</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">Welcome to your settings. Here you can update and change your information.</p>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <br/>
                        <Link className="mb-2 text-xl font-bold dark:text-white" href="/personalDetails">Profile</Link>                   
                    </div>
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Account</h3>                   
                    </div>
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Password</h3>                   
                    </div>
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Notifications</h3>                   
                    </div>
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Billing</h3>                   
                    </div>
                    <div>
                        <FontAwesomeIcon className="fa-5x text-white" icon={['far','user']} />
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Integrations</h3>                   
                    </div>
                </div>
            </div>
        </section>
    </Container>
  );
}

export default UserSettings
