import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import ClubManagementMain from "../container/ClubManagement/ClubManagementMain";
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

import PeopleManagement from './ClubManagement/PeopleManagement.js';
import ScheduleManagement from './ClubManagement/ScheduleManagement.js';

const ClubManagement = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <React.Fragment>
            <SEO title="Exomac || Management" />
            <Header />
            <ClubManagementMain/>
            <Footer />
            <ScrollToTop />
          </React.Fragment>
        </Route>
        <Route path={`${path}/people`}>
          <PeopleManagement/>
        </Route>
        <Route path={`${path}/schedule`}>
          <ScheduleManagement/>
        </Route>
      </Switch>
    </>
  )
}

export default ClubManagement;



