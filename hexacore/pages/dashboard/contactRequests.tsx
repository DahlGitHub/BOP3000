import React from 'react';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import ContactRequests from '../../components/Contact/ContactRequests';


const contactRequests = () => {


    return (
        <DashboardLayout>
          <br/>
          <ContactRequests/>
        </DashboardLayout>
      )
}

export default contactRequests