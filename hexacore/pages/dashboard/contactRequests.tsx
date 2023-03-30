import React from 'react';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/Layout/Dashboard/DashboardLayout';
import ContactRequests from '../../components/Contact/ContactRequests';


const contactRequests = () => {


    return (
        <DashboardLayout>
          <ContactRequests/>
        </DashboardLayout>
      )
}

export default contactRequests
